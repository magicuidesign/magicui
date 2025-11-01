// Supabase Server Client Helper for GoldenLA Directory Platform
// Provides a configured Supabase client for server-side usage

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

// Create a Supabase client for server-side usage
export const createClient = () => {
  return createServerComponentClient<Database>({
    cookies,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  })
}

// Export singleton instance for use in server components
export const supabase = createClient()