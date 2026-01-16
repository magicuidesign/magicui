// Supabase Client Helper for GoldenLA Directory Platform
// Provides a configured Supabase client for client-side usage

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/database'

// Create a single Supabase client for client-side usage
export const createClient = () => {
  return createClientComponentClient<Database>({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })
}

// Export singleton instance
export const supabase = createClient()