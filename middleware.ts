// Admin Authentication Middleware for GoldenLA Directory Platform
// Protects admin routes and ensures only admin users can access

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/client'

export async function adminMiddleware(request: NextRequest) {
  // Skip middleware for API routes, static files, and non-admin routes
  if (
    request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname.startsWith('/static/') ||
    !request.nextUrl.pathname.startsWith('/admin')
  ) {
    return NextResponse.next()
  }

  try {
    const supabase = createClient()
    
    // Get user from session
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      // Redirect to login with return URL
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check if user is admin
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (userError || !userData || userData.role !== 'admin') {
      // Redirect to unauthorized page
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    // User is authenticated and is admin
    return NextResponse.next()

  } catch (error) {
    console.error('Admin middleware error:', error)
    // Redirect to error page
    return NextResponse.redirect(new URL('/error', request.url))
  }
}

// Export the middleware function
export { adminMiddleware as middleware }