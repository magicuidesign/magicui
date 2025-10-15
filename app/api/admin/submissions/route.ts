// API Route for fetching submissions data
// GET /api/admin/submissions - Fetch all submissions with filtering
// PUT /api/admin/submissions/:id - Update submission status

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { apiSecurityMiddleware, checkAdminRole } from '@/lib/security-middleware'

export async function GET(request: NextRequest) {
  try {
    // Apply security middleware
    const securityResult = await apiSecurityMiddleware({
      requireAuth: true,
      requireAdmin: true
    })(request)

    if (!securityResult.success) {
      return securityResult
    }

    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    let query = supabase
      .from('submission')
      .select(`
        *,
        user:users(name, email)
      `, { count: 'exact' })

    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,address.ilike.%${search}%,category.ilike.%${search}%`)
    }

    // Apply pagination and ordering
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch submissions' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: data || [],
      count: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit)
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Apply security middleware
    const securityResult = await apiSecurityMiddleware({
      requireAuth: true,
      requireAdmin: true,
      requiredFields: ['id', 'status']
    })(request)

    if (!securityResult.success) {
      return securityResult
    }

    const { id, status, admin_note } = await request.json()

    if (!['pending', 'approved', 'rejected', 'processed'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    const { data, error } = await supabase
      .from('submission')
      .update({
        status,
        admin_note: admin_note || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update submission' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}