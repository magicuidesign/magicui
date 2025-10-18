// AI Content Enrichment Supabase Edge Function
// Processes CSV uploads and enriches listing data using Google Gemini AI

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai@0.1.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CSVRow {
  name: string
  about?: string
  cover_image?: string
  address?: string
  latitude?: number
  longitude?: number
  website?: string
  phone?: string
  price_range?: string
  category?: string
}

interface EnrichedListing {
  name: string
  slug: string
  about: string
  cover_image?: string
  address?: string
  neighborhood?: string
  latitude?: number
  longitude?: number
  website?: string
  phone?: string
  price_range?: string
  overall_score: number
  sub_scores: {
    shopping_experience: number
    dining_entertainment: number
    ambience_design: number
    value_variety: number
    accessibility_amenities: number
  }
  public_sentiment: string
  best_time_to_visit: string
  category: string
  tags: string[]
  opening_hours: Array<{
    day: string
    open: string
    close: string
    closed?: boolean
  }>
  accessibility_amenities: string
  services?: string
  total_stores?: number
  dishes?: string
  cuisine?: string
  meals?: string
  getting_there: string
  faq: Array<{
    question: string
    answer: string
  }>
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Initialize Gemini AI
    const geminiApiKey = Deno.env.get('GOOGLE_AI_API_KEY')
    if (!geminiApiKey) {
      throw new Error('GOOGLE_AI_API_KEY is not configured')
    }
    const genAI = new GoogleGenerativeAI(geminiApiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    // Parse request
    const { method } = req
    if (method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { csvData, submissions } = await req.json()

    if (!csvData && !submissions) {
      return new Response(
        JSON.stringify({ error: 'No CSV data or submissions provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let dataToProcess: CSVRow[] = []

    // Process CSV data if provided
    if (csvData) {
      dataToProcess = parseCSV(csvData)
    }

    // Process approved submissions if provided
    if (submissions && submissions.length > 0) {
      const submissionData: CSVRow[] = submissions.map((sub: any) => ({
        name: sub.name,
        about: sub.about,
        cover_image: sub.cover_image,
        address: sub.address,
        latitude: sub.latitude,
        longitude: sub.longitude,
        website: sub.website,
        phone: sub.phone,
        price_range: sub.price_range,
        category: sub.category
      }))
      dataToProcess = [...dataToProcess, ...submissionData]
    }

    if (dataToProcess.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No valid data to process' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Processing ${dataToProcess.length} items...`)

    const enrichedListings: EnrichedListing[] = []
    const errors: string[] = []

    // Process each row
    for (let i = 0; i < dataToProcess.length; i++) {
      const row = dataToProcess[i]
      
      try {
        console.log(`Processing item ${i + 1}/${dataToProcess.length}: ${row.name}`)
        
        const enrichedListing = await enrichListingData(row, model)
        enrichedListings.push(enrichedListing)
        
        // Add delay to respect API rate limits
        if (i < dataToProcess.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      } catch (error) {
        const errorMsg = `Failed to process "${row.name}": ${error.message}`
        console.error(errorMsg)
        errors.push(errorMsg)
        
        // Add basic enrichment even if AI fails
        enrichedListings.push(createBasicListing(row))
      }
    }

    // Save enriched data to database
    const results = await saveEnrichedListings(supabase, enrichedListings)
    
    return new Response(
      JSON.stringify({
        success: true,
        processed: enrichedListings.length,
        saved: results.saved,
        errors: errors.length,
        errorDetails: errors,
        results: results
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('AI enrichment error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

function parseCSV(csvData: string): CSVRow[] {
  const lines = csvData.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/"/g, ''))
    const row: any = {}
    
    headers.forEach((header, index) => {
      const value = values[index] || ''
      // Convert numeric fields
      if (header === 'latitude' || header === 'longitude') {
        row[header] = value ? parseFloat(value) : undefined
      } else {
        row[header] = value || undefined
      }
    })
    
    return row as CSVRow
  })
}

async function enrichListingData(row: CSVRow, model: any): Promise<EnrichedListing> {
  const prompt = createAIPrompt(row)
  
  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Parse JSON response
    const aiData = JSON.parse(text.replace(/```json\n?|\n?```/g, ''))
    
    // Validate and merge AI data with original data
    return {
      name: row.name,
      slug: generateSlug(row.name),
      about: aiData.about || row.about || `Discover ${row.name}, a premier destination in ${row.category || 'Los Angeles'}.`,
      cover_image: row.cover_image,
      address: row.address,
      neighborhood: aiData.neighborhood || extractNeighborhood(row.address),
      latitude: row.latitude,
      longitude: row.longitude,
      website: row.website,
      phone: row.phone,
      price_range: row.price_range,
      overall_score: validateScore(aiData.overall_score),
      sub_scores: validateSubScores(aiData.sub_scores),
      public_sentiment: aiData.public_sentiment || 'Popular local destination with positive visitor feedback.',
      best_time_to_visit: aiData.best_time_to_visit || 'Weekdays for fewer crowds, weekends for full experience.',
      category: row.category || aiData.category || 'establishment',
      tags: validateTags(aiData.tags),
      opening_hours: validateOpeningHours(aiData.opening_hours),
      accessibility_amenities: aiData.accessibility_amenities || 'Standard accessibility features available.',
      services: aiData.services,
      total_stores: aiData.total_stores,
      dishes: aiData.dishes,
      cuisine: aiData.cuisine,
      meals: aiData.meals,
      getting_there: aiData.getting_there || generateDirections(row.address),
      faq: validateFAQ(aiData.faq)
    }
  } catch (error) {
    console.error('AI processing failed for:', row.name, error)
    return createBasicListing(row)
  }
}

function createAIPrompt(row: CSVRow): string {
  return `Based on the following business information, generate comprehensive metadata for a directory listing:

Business Info:
- Name: ${row.name}
- Category: ${row.category || 'Not specified'}
- Address: ${row.address || 'Not specified'}
- Website: ${row.website || 'Not specified'}
- Phone: ${row.phone || 'Not specified'}
- Price Range: ${row.price_range || 'Not specified'}
- About: ${row.about || 'Not specified'}

Generate a JSON response with the following structure:
{
  "about": "Detailed description (2-3 sentences) highlighting what makes this place special",
  "neighborhood": "The neighborhood or area name",
  "overall_score": 8.5,
  "sub_scores": {
    "shopping_experience": 8.0,
    "dining_entertainment": 8.5,
    "ambience_design": 8.7,
    "value_variety": 8.3,
    "accessibility_amenities": 8.2
  },
  "public_sentiment": "Summary of public opinion and reviews",
  "best_time_to_visit": "Recommendations for best times to visit",
  "category": "Refined category classification",
  "tags": ["array", "of", "relevant", "tags"],
  "opening_hours": [
    {"day": "Monday", "open": "09:00", "close": "21:00"},
    {"day": "Tuesday", "open": "09:00", "close": "21:00"},
    {"day": "Wednesday", "open": "09:00", "close": "21:00"},
    {"day": "Thursday", "open": "09:00", "close": "21:00"},
    {"day": "Friday", "open": "09:00", "close": "22:00"},
    {"day": "Saturday", "open": "10:00", "close": "22:00"},
    {"day": "Sunday", "open": "10:00", "close": "20:00"}
  ],
  "accessibility_amenities": "Description of accessibility features",
  "services": "Available services and amenities",
  "total_stores": 50,
  "dishes": "Featured menu items or specialties",
  "cuisine": "Type of cuisine if applicable",
  "meals": "Meal types served",
  "getting_there": "Directions and transportation options",
  "faq": [
    {"question": "Is parking available?", "answer": "Parking information"},
    {"question": "What are the peak hours?", "answer": "Peak times information"}
  ]
}

Important guidelines:
- Scores should be realistic (0-10 scale)
- Be specific and helpful
- Focus on what visitors would want to know
- If unsure, provide reasonable defaults
- Keep descriptions concise but informative
- Return ONLY the JSON object, no other text`

Return only valid JSON.`
}

function createBasicListing(row: CSVRow): EnrichedListing {
  return {
    name: row.name,
    slug: generateSlug(row.name),
    about: row.about || `Visit ${row.name}, located in ${row.address || 'Los Angeles'}.`,
    cover_image: row.cover_image,
    address: row.address,
    neighborhood: extractNeighborhood(row.address),
    latitude: row.latitude,
    longitude: row.longitude,
    website: row.website,
    phone: row.phone,
    price_range: row.price_range,
    overall_score: 7.5,
    sub_scores: {
      shopping_experience: 7.5,
      dining_entertainment: 7.5,
      ambience_design: 7.5,
      value_variety: 7.5,
      accessibility_amenities: 7.5
    },
    public_sentiment: 'Local establishment serving the community.',
    best_time_to_visit: 'Check their hours for the best time to visit.',
    category: row.category || 'establishment',
    tags: [row.category || 'business', 'los-angeles'],
    opening_hours: generateDefaultHours(),
    accessibility_amenities: 'Basic accessibility features available.',
    getting_there: generateDirections(row.address),
    faq: [
      {
        question: 'What are the business hours?',
        answer: 'Please check their website or call for current hours.'
      }
    ]
  }
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100)
}

function extractNeighborhood(address?: string): string {
  if (!address) return 'Los Angeles'
  
  // Extract neighborhood from address
  const neighborhoods = [
    'Downtown', 'Hollywood', 'Beverly Hills', 'Santa Monica', 'Venice',
    'West Hollywood', 'Pasadena', 'Culver City', 'Burbank', 'Glendale',
    'Long Beach', 'Marina del Rey', 'Mid-Wilshire', 'Mid-City', 'Silver Lake',
    'Echo Park', 'Los Feliz', 'Koreatown', 'Chinatown', 'Little Tokyo'
  ]
  
  const addressLower = address.toLowerCase()
  for (const hood of neighborhoods) {
    if (addressLower.includes(hood.toLowerCase())) {
      return hood
    }
  }
  
  return 'Los Angeles'
}

function generateDirections(address?: string): string {
  if (!address) return 'Check mapping apps for directions.'
  
  return `Located at ${address}. Use GPS or mapping apps for the best route based on current traffic conditions.`
}

function generateDefaultHours() {
  return [
    { day: 'Monday', open: '09:00', close: '21:00' },
    { day: 'Tuesday', open: '09:00', close: '21:00' },
    { day: 'Wednesday', open: '09:00', close: '21:00' },
    { day: 'Thursday', open: '09:00', close: '21:00' },
    { day: 'Friday', open: '09:00', close: '22:00' },
    { day: 'Saturday', open: '10:00', close: '22:00' },
    { day: 'Sunday', open: '10:00', close: '20:00' }
  ]
}

function validateScore(score: any): number {
  const num = parseFloat(score)
  return (isNaN(num) || num < 0 || num > 10) ? 7.5 : num
}

function validateSubScores(scores: any): EnrichedListing['sub_scores'] {
  if (!scores || typeof scores !== 'object') {
    return {
      shopping_experience: 7.5,
      dining_entertainment: 7.5,
      ambience_design: 7.5,
      value_variety: 7.5,
      accessibility_amenities: 7.5
    }
  }
  
  return {
    shopping_experience: validateScore(scores.shopping_experience),
    dining_entertainment: validateScore(scores.dining_entertainment),
    ambience_design: validateScore(scores.ambience_design),
    value_variety: validateScore(scores.value_variety),
    accessibility_amenities: validateScore(scores.accessibility_amenities)
  }
}

function validateTags(tags: any): string[] {
  if (!Array.isArray(tags)) return ['business']
  return tags.filter(tag => typeof tag === 'string').slice(0, 10)
}

function validateOpeningHours(hours: any): EnrichedListing['opening_hours'] {
  if (!Array.isArray(hours)) return generateDefaultHours()
  
  return hours
    .filter(h => h.day && h.open && h.close)
    .slice(0, 7)
    .map(h => ({
      day: h.day,
      open: h.open,
      close: h.close,
      closed: h.closed || false
    }))
}

function validateFAQ(faq: any): EnrichedListing['faq'] {
  if (!Array.isArray(faq)) return []
  
  return faq
    .filter(item => item.question && item.answer)
    .slice(0, 10)
    .map(item => ({
      question: item.question,
      answer: item.answer
    }))
}

async function saveEnrichedListings(supabase: any, listings: EnrichedListing[]) {
  const results = { saved: 0, errors: [] as string[] }
  
  for (const listing of listings) {
    try {
      const { error } = await supabase
        .from('listings')
        .insert({
          ...listing,
          status: 'published',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      
      if (error) {
        console.error('Failed to save listing:', listing.name, error)
        results.errors.push(`Failed to save "${listing.name}": ${error.message}`)
      } else {
        results.saved++
        console.log('Saved listing:', listing.name)
      }
    } catch (error) {
      console.error('Error saving listing:', listing.name, error)
      results.errors.push(`Error saving "${listing.name}": ${error.message}`)
    }
  }
  
  return results
}