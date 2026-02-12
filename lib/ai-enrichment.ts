// AI Enrichment Service for GoldenLA Directory Platform
// Handles CSV processing and AI content enrichment from the frontend

import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

export interface EnrichmentRequest {
  csvData?: string
  submissions?: Array<{
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
  }>
}

export interface EnrichmentResult {
  success: boolean
  processed: number
  saved: number
  errors: number
  errorDetails: string[]
  results: {
    saved: number
    errors: string[]
  }
}

export interface ProcessingStatus {
  id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  total: number
  current?: string
  errors?: string[]
  result?: EnrichmentResult
  created_at: string
  updated_at: string
}

export class AIEnrichmentService {
  private supabase
  private edgeFunctionUrl: string

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    
    this.supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
    this.edgeFunctionUrl = `${supabaseUrl}/functions/v1/ai-enrichment`
  }

  /**
   * Process CSV data through AI enrichment
   */
  async enrichCSVData(csvData: string): Promise<EnrichmentResult> {
    try {
      const response = await fetch(this.edgeFunctionUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ csvData }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to process CSV data')
      }

      return await response.json()
    } catch (error) {
      console.error('CSV enrichment error:', error)
      throw new Error(`CSV enrichment failed: ${error.message}`)
    }
  }

  /**
   * Process approved submissions through AI enrichment
   */
  async enrichApprovedSubmissions(submissionIds: string[]): Promise<EnrichmentResult> {
    try {
      // Fetch approved submissions
      const { data: submissions, error } = await this.supabase
        .from('submission')
        .select('*')
        .in('id', submissionIds)
        .eq('status', 'approved')

      if (error) throw error
      if (!submissions || submissions.length === 0) {
        throw new Error('No approved submissions found')
      }

      const response = await fetch(this.edgeFunctionUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ submissions }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to process submissions')
      }

      const result = await response.json()

      // Update submission status to processed
      await this.supabase
        .from('submission')
        .update({ status: 'processed' })
        .in('id', submissionIds)

      return result
    } catch (error) {
      console.error('Submission enrichment error:', error)
      throw new Error(`Submission enrichment failed: ${error.message}`)
    }
  }

  /**
   * Upload and process CSV file
   */
  async uploadAndProcessCSV(file: File): Promise<EnrichmentResult> {
    try {
      // Validate file type
      if (!file.name.endsWith('.csv')) {
        throw new Error('Please upload a CSV file')
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size must be less than 10MB')
      }

      // Read file content
      const csvData = await this.readCSVFile(file)

      // Validate CSV structure
      this.validateCSVStructure(csvData)

      // Process through AI enrichment
      return await this.enrichCSVData(csvData)
    } catch (error) {
      console.error('CSV upload error:', error)
      throw new Error(`CSV upload failed: ${error.message}`)
    }
  }

  /**
   * Read CSV file content
   */
  private async readCSVFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        const content = e.target?.result as string
        if (!content) {
          reject(new Error('Failed to read file content'))
          return
        }
        resolve(content)
      }
      
      reader.onerror = () => {
        reject(new Error('File reading failed'))
      }
      
      reader.readAsText(file)
    })
  }

  /**
   * Validate CSV structure
   */
  private validateCSVStructure(csvData: string): void {
    const lines = csvData.trim().split('\n')
    if (lines.length < 2) {
      throw new Error('CSV must contain at least a header and one data row')
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    const requiredHeaders = ['name']
    
    const missingHeaders = requiredHeaders.filter(header => !headers.includes(header))
    if (missingHeaders.length > 0) {
      throw new Error(`CSV is missing required columns: ${missingHeaders.join(', ')}`)
    }

    // Validate data rows
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''))
      const name = values[headers.indexOf('name')]
      
      if (!name || name.trim() === '') {
        throw new Error(`Row ${i + 1} has missing or empty name`)
      }
    }
  }

  /**
   * Preview CSV data before processing
   */
  previewCSVData(csvData: string, limit: number = 5): Array<Record<string, string>> {
    const lines = csvData.trim().split('\n')
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    
    return lines.slice(1, limit + 1).map(line => {
      const values = line.split(',').map(v => v.trim().replace(/"/g, ''))
      const row: Record<string, string> = {}
      
      headers.forEach((header, index) => {
        row[header] = values[index] || ''
      })
      
      return row
    })
  }

  /**
   * Get processing history (if you implement a processing log table)
   */
  async getProcessingHistory(): Promise<ProcessingStatus[]> {
    try {
      const { data, error } = await this.supabase
        .from('enrichment_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Failed to get processing history:', error)
      return []
    }
  }

  /**
   * Generate sample CSV template
   */
  generateSampleCSV(): string {
    const headers = [
      'name',
      'about',
      'cover_image',
      'address',
      'latitude',
      'longitude',
      'website',
      'phone',
      'price_range',
      'category'
    ]

    const sampleData = [
      [
        'The Grove Los Angeles',
        'A popular open-air shopping complex with retail stores and restaurants',
        'https://example.com/grove.jpg',
        '189 The Grove Dr, Los Angeles, CA 90036',
        '34.0708',
        '-118.3579',
        'https://thegrovela.com',
        '(323) 900-8000',
        '$$$',
        'shopping_center'
      ],
      [
        'Grand Central Market',
        'Historic food hall offering diverse culinary options from local vendors',
        'https://example.com/gcm.jpg',
        '317 S Broadway, Los Angeles, CA 90013',
        '34.0505',
        '-118.2494',
        'https://grandcentralmarket.com',
        '(213) 624-2378',
        '$$',
        'food_market'
      ]
    ]

    return [
      headers.join(','),
      ...sampleData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')
  }

  /**
   * Download sample CSV template
   */
  downloadSampleCSV(): void {
    const csv = this.generateSampleCSV()
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = 'goldenla-template.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }

  /**
   * Validate CSV file before upload
   */
  async validateCSVFile(file: File): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = []

    try {
      // Check file type
      if (!file.name.endsWith('.csv')) {
        errors.push('File must be a CSV file')
      }

      // Check file size
      if (file.size > 10 * 1024 * 1024) {
        errors.push('File size must be less than 10MB')
      }

      // Read and validate content
      const csvData = await this.readCSVFile(file)
      
      try {
        this.validateCSVStructure(csvData)
      } catch (error) {
        errors.push(error.message)
      }

      return {
        valid: errors.length === 0,
        errors
      }
    } catch (error) {
      errors.push('Failed to read file')
      return {
        valid: false,
        errors
      }
    }
  }

  /**
   * Get enrichment statistics
   */
  async getEnrichmentStats(): Promise<{
    totalListings: number
    recentlyEnriched: number
    pendingSubmissions: number
    enrichmentErrors: number
  }> {
    try {
      const [listingsCount, recentCount, submissionsCount] = await Promise.all([
        this.supabase.from('listings').select('*', { count: 'exact', head: true }),
        this.supabase
          .from('listings')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
        this.supabase
          .from('submission')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending')
      ])

      return {
        totalListings: listingsCount.count || 0,
        recentlyEnriched: recentCount.count || 0,
        pendingSubmissions: submissionsCount.count || 0,
        enrichmentErrors: 0 // Track this if you implement error logging
      }
    } catch (error) {
      console.error('Failed to get enrichment stats:', error)
      return {
        totalListings: 0,
        recentlyEnriched: 0,
        pendingSubmissions: 0,
        enrichmentErrors: 0
      }
    }
  }
}

// Create singleton instance
export const aiEnrichmentService = new AIEnrichmentService()

// Export utilities for use in components
export const {
  enrichCSVData,
  enrichApprovedSubmissions,
  uploadAndProcessCSV,
  previewCSVData,
  getProcessingHistory,
  generateSampleCSV,
  downloadSampleCSV,
  validateCSVFile,
  getEnrichmentStats
} = aiEnrichmentService

// React hook for AI enrichment
export function useAIEnrichment() {
  return aiEnrichmentService
}