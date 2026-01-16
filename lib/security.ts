// Security utilities for GoldenLA Directory Platform
// Provides client-side security helpers and validation

import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

export interface SecurityConfig {
  maxRetries: number
  rateLimitRequests: number
  rateLimitWindow: number
  logSecurityEvents: boolean
}

export class SecurityManager {
  private supabase
  private config: SecurityConfig

  constructor(supabaseUrl: string, supabaseAnonKey: string, config: SecurityConfig = {
    maxRetries: 3,
    rateLimitRequests: 100,
    rateLimitWindow: 60,
    logSecurityEvents: true
  }) {
    this.supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
    this.config = config
  }

  /**
   * Sanitize user input to prevent XSS
   */
  sanitizeInput(input: string): string {
    if (!input) return ''
    
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .trim()
  }

  /**
   * Validate email format
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Validate URL format
   */
  validateUrl(url: string): boolean {
    try {
      const urlObj = new URL(url)
      return ['http:', 'https:'].includes(urlObj.protocol)
    } catch {
      return false
    }
  }

  /**
   * Validate phone number format (basic validation)
   */
  validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
  }

  /**
   * Check rate limit before making API calls
   */
  async checkRateLimit(endpoint: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase.rpc('check_rate_limit', {
        endpoint,
        max_requests: this.config.rateLimitRequests,
        window_minutes: this.config.rateLimitWindow
      })

      if (error) {
        console.error('Rate limit check failed:', error)
        return false
      }

      return data || false
    } catch (error) {
      console.error('Rate limit check error:', error)
      return false
    }
  }

  /**
   * Log security events for monitoring
   */
  async logSecurityEvent(
    action: string,
    resourceType: string,
    resourceId?: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    if (!this.config.logSecurityEvents) return

    try {
      await this.supabase.rpc('log_security_event', {
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
   * Check if user can access specific submission
   */
  async canAccessSubmission(submissionId: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase.rpc('can_access_submission', {
        submission_id: submissionId
      })

      if (error) {
        console.error('Access check failed:', error)
        return false
      }

      return data || false
    } catch (error) {
      console.error('Access check error:', error)
      return false
    }
  }

  /**
   * Check if user can modify specific listing
   */
  async canModifyListing(listingId: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase.rpc('can_modify_listing', {
        listing_id: listingId
      })

      if (error) {
        console.error('Modify permission check failed:', error)
        return false
      }

      return data || false
    } catch (error) {
      console.error('Modify permission check error:', error)
      return false
    }
  }

  /**
   * Secure bookmark toggle with logging
   */
  async toggleBookmarkSecure(listingId: string): Promise<{ success: boolean; bookmarked: boolean }> {
    try {
      // Get client IP and user agent for logging
      const clientInfo = this.getClientInfo()

      const { data, error } = await this.supabase.rpc('toggle_bookmark_secure', {
        listing_id: listingId,
        client_ip: clientInfo.ip,
        user_agent: clientInfo.userAgent
      })

      if (error) {
        console.error('Bookmark toggle failed:', error)
        await this.logSecurityEvent('bookmark_failed', 'listing', listingId, { error: error.message })
        return { success: false, bookmarked: false }
      }

      return { 
        success: true, 
        bookmarked: data?.bookmarked || false 
      }
    } catch (error) {
      console.error('Bookmark toggle error:', error)
      await this.logSecurityEvent('bookmark_error', 'listing', listingId, { error: 'Unknown error' })
      return { success: false, bookmarked: false }
    }
  }

  /**
   * Validate submission form data
   */
  validateSubmissionData(data: {
    name: string
    about?: string
    address?: string
    website?: string
    phone?: string
    category?: string
    email?: string
  }): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    // Name validation (required)
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long')
    }

    // Email validation (if provided)
    if (data.email && !this.validateEmail(data.email)) {
      errors.push('Invalid email format')
    }

    // Website validation (if provided)
    if (data.website && !this.validateUrl(data.website)) {
      errors.push('Invalid website URL format')
    }

    // Phone validation (if provided)
    if (data.phone && !this.validatePhone(data.phone)) {
      errors.push('Invalid phone number format')
    }

    // Address validation
    if (data.address && data.address.trim().length < 5) {
      errors.push('Address must be at least 5 characters long')
    }

    // Category validation
    if (data.category && data.category.trim().length < 2) {
      errors.push('Category must be at least 2 characters long')
    }

    // Length validations
    if (data.name && data.name.length > 200) {
      errors.push('Name must be less than 200 characters')
    }

    if (data.about && data.about.length > 2000) {
      errors.push('Description must be less than 2000 characters')
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }

  /**
   * Rate limiting wrapper for API calls
   */
  async withRateLimit<T>(
    endpoint: string,
    apiCall: () => Promise<T>
  ): Promise<T | null> {
    const canProceed = await this.checkRateLimit(endpoint)
    if (!canProceed) {
      throw new Error('Rate limit exceeded. Please try again later.')
    }

    return apiCall()
  }

  /**
   * Get client information for logging
   */
  private getClientInfo(): { ip?: string; userAgent?: string } {
    // In a real implementation, these would come from the request context
    // For now, we'll return empty values
    return {
      ip: undefined,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined
    }
  }

  /**
   * Generate secure slug from name
   */
  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 100) // Limit length
  }

  /**
   * Validate coordinates
   */
  validateCoordinates(lat: number, lng: number): boolean {
    return (
      typeof lat === 'number' &&
      typeof lng === 'number' &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    )
  }

  /**
   * Validate price range
   */
  validatePriceRange(priceRange: string): boolean {
    return ['$', '$$', '$$$', '$$$$'].includes(priceRange)
  }

  /**
   * Sanitize and validate user bio
   */
  sanitizeBio(bio: string, maxLength: number = 500): string {
    if (!bio) return ''
    
    const sanitized = this.sanitizeInput(bio)
    return sanitized.length > maxLength ? sanitized.substring(0, maxLength) : sanitized
  }
}

// Create singleton instance
export const security = new SecurityManager(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

// Export utilities for use throughout the app
export const {
  sanitizeInput,
  validateEmail,
  validateUrl,
  validatePhone,
  validateSubmissionData,
  generateSlug,
  validateCoordinates,
  validatePriceRange,
  sanitizeBio
} = security

// React hook for security
export function useSecurity() {
  return security
}