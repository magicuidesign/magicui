// Security middleware for Next.js API routes and pages
// Provides server-side security validation and rate limiting

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Rate limiting storage (in production, use Redis or a database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Max requests per window
  message?: string // Custom error message
}

// Rate limiting configurations for different endpoints
const rateLimitConfigs: Record<string, RateLimitConfig> = {
  '/api/submissions': { windowMs: 15 * 60 * 1000, maxRequests: 10 }, // 10 submissions per 15 minutes
  '/api/auth/login': { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 login attempts per 15 minutes
  '/api/bookmarks': { windowMs: 60 * 1000, maxRequests: 30 }, // 30 bookmark actions per minute
  '/api/admin': { windowMs: 60 * 1000, maxRequests: 100 }, // 100 admin actions per minute
  default: { windowMs: 15 * 60 * 1000, maxRequests: 100 } // Default: 100 requests per 15 minutes
}

/**
 * Rate limiting middleware
 */
export function rateLimit(request: NextRequest, config?: RateLimitConfig) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const key = `${ip}:${request.nextUrl.pathname}`
  
  // Get configuration for this endpoint or use default
  const rateLimitConfig = config || rateLimitConfigs[request.nextUrl.pathname] || rateLimitConfigs.default
  
  const now = Date.now()
  const record = rateLimitStore.get(key)
  
  // Reset if window has expired
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + rateLimitConfig.windowMs })
    return { success: true, remaining: rateLimitConfig.maxRequests - 1 }
  }
  
  // Check if limit exceeded
  if (record.count >= rateLimitConfig.maxRequests) {
    return {
      success: false,
      error: rateLimitConfig.message || 'Too many requests. Please try again later.',
      resetTime: record.resetTime
    }
  }
  
  // Increment counter
  record.count++
  return { success: true, remaining: rateLimitConfig.maxRequests - record.count }
}

/**
 * Validate required fields in request body
 */
export function validateRequiredFields(body: any, requiredFields: string[]): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  for (const field of requiredFields) {
    if (!body[field] || (typeof body[field] === 'string' && body[field].trim() === '')) {
      errors.push(`${field} is required`)
    }
  }
  
  return { valid: errors.length === 0, errors }
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: any): any {
  if (typeof input === 'string') {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .trim()
  }
  
  if (Array.isArray(input)) {
    return input.map(sanitizeInput)
  }
  
  if (typeof input === 'object' && input !== null) {
    const sanitized: any = {}
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value)
    }
    return sanitized
  }
  
  return input
}

/**
 * Validate authentication with Supabase
 */
export async function authenticateRequest(request: NextRequest) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return { user: null, error: 'Missing or invalid authorization header' }
  }
  
  try {
    const token = authHeader.substring(7)
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return { user: null, error: 'Invalid authentication token' }
    }
    
    return { user, error: null }
  } catch (error) {
    return { user: null, error: 'Authentication failed' }
  }
}

/**
 * Check if user has admin role
 */
export async function checkAdminRole(userId: string) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single()
    
    if (error || !data) {
      return false
    }
    
    return data.role === 'admin'
  } catch {
    return false
  }
}

/**
 * Log security events to database
 */
export async function logSecurityEvent(
  userId: string,
  action: string,
  resourceType: string,
  resourceId?: string,
  metadata?: Record<string, any>
) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  try {
    await supabase.rpc('log_security_event', {
      action,
      resource_type: resourceType,
      resource_id: resourceId,
      metadata: metadata || {}
    })
  } catch (error) {
    console.error('Failed to log security event:', error)
  }
}

/**
 * Comprehensive security middleware for API routes
 */
export function apiSecurityMiddleware(config: {
  requireAuth?: boolean
  requireAdmin?: boolean
  rateLimit?: RateLimitConfig
  requiredFields?: string[]
  sanitizeBody?: boolean
} = {}) {
  return async (request: NextRequest) => {
    const {
      requireAuth = false,
      requireAdmin = false,
      rateLimit: rateLimitConfig,
      requiredFields = [],
      sanitizeBody = true
    } = config
    
    // Rate limiting
    const rateLimitResult = rateLimit(request, rateLimitConfig)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: rateLimitResult.error },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitConfig?.maxRequests?.toString() || '100',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime!).toUTCString()
          }
        }
      )
    }
    
    // Authentication
    let user = null
    if (requireAuth || requireAdmin) {
      const authResult = await authenticateRequest(request)
      if (authResult.error || !authResult.user) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }
      user = authResult.user
      
      // Admin role check
      if (requireAdmin) {
        const isAdmin = await checkAdminRole(user.id)
        if (!isAdmin) {
          await logSecurityEvent(user.id, 'unauthorized_admin_access', 'system')
          return NextResponse.json(
            { error: 'Admin access required' },
            { status: 403 }
          )
        }
      }
    }
    
    // Request body validation and sanitization
    let body = null
    const contentType = request.headers.get('content-type')
    
    if (contentType?.includes('application/json')) {
      try {
        body = await request.json()
        
        // Validate required fields
        if (requiredFields.length > 0) {
          const validation = validateRequiredFields(body, requiredFields)
          if (!validation.valid) {
            return NextResponse.json(
              { error: 'Validation failed', details: validation.errors },
              { status: 400 }
            )
          }
        }
        
        // Sanitize input
        if (sanitizeBody) {
          body = sanitizeInput(body)
        }
        
      } catch (error) {
        return NextResponse.json(
          { error: 'Invalid JSON in request body' },
          { status: 400 }
        )
      }
    }
    
    // Log security event for authenticated users
    if (user) {
      await logSecurityEvent(
        user.id,
        'api_access',
        'endpoint',
        undefined,
        {
          endpoint: request.nextUrl.pathname,
          method: request.method,
          ip: request.ip,
          userAgent: request.headers.get('user-agent')
        }
      )
    }
    
    return {
      success: true,
      user,
      body,
      rateLimitInfo: {
        limit: rateLimitConfig?.maxRequests || rateLimitConfigs.default.maxRequests,
        remaining: rateLimitResult.remaining
      }
    }
  }
}

/**
 * CORS middleware for API routes
 */
export function corsMiddleware(request: Request, response?: Response) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  }
  
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  return response
}