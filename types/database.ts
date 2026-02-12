// Database types for GoldenLA Directory Platform
// Generated from Supabase schema

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string | null
          email: string
          role: 'user' | 'admin'
          bookmarks: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name?: string | null
          email: string
          role?: 'user' | 'admin'
          bookmarks?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string
          role?: 'user' | 'admin'
          bookmarks?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      submission: {
        Row: {
          id: string
          name: string
          about: string | null
          cover_image: string | null
          address: string | null
          latitude: number | null
          longitude: number | null
          website: string | null
          phone: string | null
          price_range: '$' | '$$' | '$$$' | '$$$$' | null
          category: string | null
          created_by: string
          status: 'pending' | 'approved' | 'rejected'
          admin_note: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          about?: string | null
          cover_image?: string | null
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          website?: string | null
          phone?: string | null
          price_range?: '$' | '$$' | '$$$' | '$$$$' | null
          category?: string | null
          created_by?: string
          status?: 'pending' | 'approved' | 'rejected'
          admin_note?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          about?: string | null
          cover_image?: string | null
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          website?: string | null
          phone?: string | null
          price_range?: '$' | '$$' | '$$$' | '$$$$' | null
          category?: string | null
          created_by?: string
          status?: 'pending' | 'approved' | 'rejected'
          admin_note?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      listings: {
        Row: {
          id: string
          name: string
          slug: string
          about: string | null
          cover_image: string | null
          address: string | null
          neighborhood: string | null
          latitude: number | null
          longitude: number | null
          website: string | null
          phone: string | null
          price_range: '$' | '$$' | '$$$' | '$$$$' | null
          overall_score: number | null
          sub_scores: {
            shopping_experience: number
            dining_entertainment: number
            ambience_design: number
            value_variety: number
            accessibility_amenities: number
          }
          public_sentiment: string | null
          best_time_to_visit: string | null
          category: string | null
          tags: string[]
          opening_hours: Array<{
            day: string
            open: string
            close: string
            closed?: boolean
          }>
          accessibility_amenities: string | null
          services: string | null
          total_stores: number
          dishes: string | null
          cuisine: string | null
          meals: string | null
          getting_there: string | null
          faq: Array<{
            question: string
            answer: string
          }>
          created_by: string | null
          status: 'draft' | 'published' | 'archived'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          about?: string | null
          cover_image?: string | null
          address?: string | null
          neighborhood?: string | null
          latitude?: number | null
          longitude?: number | null
          website?: string | null
          phone?: string | null
          price_range?: '$' | '$$' | '$$$' | '$$$$' | null
          overall_score?: number | null
          sub_scores?: {
            shopping_experience: number
            dining_entertainment: number
            ambience_design: number
            value_variety: number
            accessibility_amenities: number
          }
          public_sentiment?: string | null
          best_time_to_visit?: string | null
          category?: string | null
          tags?: string[]
          opening_hours?: Array<{
            day: string
            open: string
            close: string
            closed?: boolean
          }>
          accessibility_amenities?: string | null
          services?: string | null
          total_stores?: number
          dishes?: string | null
          cuisine?: string | null
          meals?: string | null
          getting_there?: string | null
          faq?: Array<{
            question: string
            answer: string
          }>
          created_by?: string | null
          status?: 'draft' | 'published' | 'archived'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          about?: string | null
          cover_image?: string | null
          address?: string | null
          neighborhood?: string | null
          latitude?: number | null
          longitude?: number | null
          website?: string | null
          phone?: string | null
          price_range?: '$' | '$$' | '$$$' | '$$$$' | null
          overall_score?: number | null
          sub_scores?: {
            shopping_experience: number
            dining_entertainment: number
            ambience_design: number
            value_variety: number
            accessibility_amenities: number
          }
          public_sentiment?: string | null
          best_time_to_visit?: string | null
          category?: string | null
          tags?: string[]
          opening_hours?: Array<{
            day: string
            open: string
            close: string
            closed?: boolean
          }>
          accessibility_amenities?: string | null
          services?: string | null
          total_stores?: number
          dishes?: string | null
          cuisine?: string | null
          meals?: string | null
          getting_there?: string | null
          faq?: Array<{
            question: string
            answer: string
          }>
          created_by?: string | null
          status?: 'draft' | 'published' | 'archived'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      is_admin: () => boolean
      toggle_bookmark: (listing_id: string) => { success: boolean; bookmarked: boolean; bookmarks: string[] }
      get_user_bookmarks: () => string[]
    }
    Enums: {
      price_range: '$' | '$$' | '$$$' | '$$$$'
      submission_status: 'pending' | 'approved' | 'rejected'
      listing_status: 'draft' | 'published' | 'archived'
      user_role: 'user' | 'admin'
    }
  }
}

// Convenience types
export type User = Database['public']['Tables']['users']['Row']
export type Submission = Database['public']['Tables']['submission']['Row']
export type Listing = Database['public']['Tables']['listings']['Row']

export type SubScores = Database['public']['Tables']['listings']['Row']['sub_scores']
export type OpeningHour = Database['public']['Tables']['listings']['Row']['opening_hours'][0]
export type FAQ = Database['public']['Tables']['listings']['Row']['faq'][0]

// Form types for submissions
export type SubmissionForm = Omit<Submission, 'id' | 'created_by' | 'status' | 'admin_note' | 'created_at' | 'updated_at'>

// Search and filter types
export type ListingFilters = {
  category?: string
  neighborhood?: string
  price_range?: string
  min_score?: number
  max_score?: number
  tags?: string[]
  search?: string
}

export type ListingSort = {
  field: 'name' | 'overall_score' | 'created_at' | 'neighborhood'
  order: 'asc' | 'desc'
}

// API response types
export type BookmarkResponse = {
  success: boolean
  bookmarked: boolean
  bookmarks: string[]
}

export type PaginatedResponse<T> = {
  data: T[]
  count: number
  page: number
  pageSize: number
  totalPages: number
}