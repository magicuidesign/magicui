'use client'

// Main Admin Dashboard for GoldenLA Directory Platform
// Provides comprehensive admin interface for managing submissions, listings, and users

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  Users, 
  FileText, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  AlertCircle,
  Settings
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useSecurity } from '@/lib/security'
import type { Database } from '@/types/database'

interface DashboardStats {
  totalSubmissions: number
  pendingSubmissions: number
  approvedSubmissions: number
  rejectedSubmissions: number
  totalListings: number
  publishedListings: number
  totalUsers: number
  recentActivity: Array<{
    id: string
    type: 'submission' | 'listing' | 'user'
    action: string
    details: string
    created_at: string
  }>
}

export default function AdminDashboard() {
  const security = useSecurity()
  const supabase = createClient<Database>()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Check if user is admin
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('Not authenticated')
      }
      
      setCurrentUser(user)
      
      const isAdmin = await security.canModifyListing('test') // Simple admin check
      if (!isAdmin) {
        throw new Error('Access denied')
      }

      // Load dashboard stats
      const [
        submissionsCount,
        pendingCount,
        approvedCount,
        rejectedCount,
        listingsCount,
        publishedCount,
        usersCount
      ] = await Promise.all([
        supabase.from('submission').select('*', { count: 'exact', head: true }),
        supabase.from('submission').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('submission').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
        supabase.from('submission').select('*', { count: 'exact', head: true }).eq('status', 'rejected'),
        supabase.from('listings').select('*', { count: 'exact', head: true }),
        supabase.from('listings').select('*', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('users').select('*', { count: 'exact', head: true })
      ])

      // Load recent activity
      const { data: recentSubmissions } = await supabase
        .from('submission')
        .select('id, name, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5)

      const { data: recentListings } = await supabase
        .from('listings')
        .select('id, name, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5)

      const recentActivity = [
        ...(recentSubmissions || []).map(sub => ({
          id: sub.id,
          type: 'submission' as const,
          action: sub.status,
          details: `Submission "${sub.name}"`,
          created_at: sub.created_at
        })),
        ...(recentListings || []).map(listing => ({
          id: listing.id,
          type: 'listing' as const,
          action: listing.status,
          details: `Listing "${listing.name}"`,
          created_at: listing.created_at
        }))
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 10)

      setStats({
        totalSubmissions: submissionsCount.count || 0,
        pendingSubmissions: pendingCount.count || 0,
        approvedSubmissions: approvedCount.count || 0,
        rejectedSubmissions: rejectedCount.count || 0,
        totalListings: listingsCount.count || 0,
        publishedListings: publishedCount.count || 0,
        totalUsers: usersCount.count || 0,
        recentActivity
      })

    } catch (error) {
      console.error('Failed to load dashboard data:', error)
      // Handle unauthorized access
      if (error.message === 'Access denied') {
        // Redirect or show access denied message
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!stats || !currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                GoldenLA Directory Management
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Admin
              </Badge>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Site
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {stats.pendingSubmissions} pending
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published Listings</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.publishedListings}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                of {stats.totalListings} total
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <BarChart3 className="h-3 w-3" />
                Registered users
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalSubmissions > 0 
                  ? Math.round((stats.approvedSubmissions / stats.totalSubmissions) * 100)
                  : 0}%
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle className="h-3 w-3" />
                {stats.approvedSubmissions} approved
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="submissions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="ai-enrichment">AI Enrichment</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="submissions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Submissions</CardTitle>
                    <CardDescription>
                      Latest user submissions requiring review
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SubmissionsTable refreshData={loadDashboardData} />
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Submission Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pending</span>
                      <Badge variant="secondary">{stats.pendingSubmissions}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Approved</span>
                      <Badge variant="default" className="bg-green-500">{stats.approvedSubmissions}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Rejected</span>
                      <Badge variant="destructive">{stats.rejectedSubmissions}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Latest platform activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stats.recentActivity.slice(0, 5).map((activity, index) => (
                        <div key={activity.id} className="flex items-start gap-3 text-sm">
                          <div className={`w-2 h-2 rounded-full mt-1.5 ${
                            activity.action === 'published' ? 'bg-green-500' :
                            activity.action === 'pending' ? 'bg-yellow-500' :
                            activity.action === 'rejected' ? 'bg-red-500' :
                            'bg-blue-500'
                          }`} />
                          <div className="flex-1">
                            <p className="font-medium">{activity.details}</p>
                            <p className="text-muted-foreground text-xs">
                              {new Date(activity.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Published Listings</CardTitle>
                <CardDescription>
                  Manage published directory listings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ListingsTable refreshData={loadDashboardData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage platform users and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UsersTable refreshData={loadDashboardData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-enrichment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Content Enrichment</CardTitle>
                <CardDescription>
                  Process CSV data and enrich listings with AI-generated content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <CSVUploadProcessor />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Analytics</CardTitle>
                  <CardDescription>
                    Overview of platform performance and usage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AnalyticsOverview stats={stats} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Submission Trends</CardTitle>
                  <CardDescription>
                    Recent submission activity and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SubmissionTrends />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Placeholder components for the tables
function SubmissionsTable({ refreshData }: { refreshData: () => void }) {
  return (
    <div className="text-center py-8 text-muted-foreground">
      Submissions table component - to be implemented
    </div>
  )
}

function ListingsTable({ refreshData }: { refreshData: () => void }) {
  return (
    <div className="text-center py-8 text-muted-foreground">
      Listings table component - to be implemented
    </div>
  )
}

function UsersTable({ refreshData }: { refreshData: () => void }) {
  return (
    <div className="text-center py-8 text-muted-foreground">
      Users table component - to be implemented
    </div>
  )
}

function AnalyticsOverview({ stats }: { stats: DashboardStats }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
          <div className="text-sm text-muted-foreground">Total Submissions</div>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-2xl font-bold">{stats.publishedListings}</div>
          <div className="text-sm text-muted-foreground">Published Listings</div>
        </div>
      </div>
    </div>
  )
}

function SubmissionTrends() {
  return (
    <div className="text-center py-8 text-muted-foreground">
      Submission trends chart - to be implemented
    </div>
  )
}

// Import the CSV upload processor
import CSVUploadProcessor from '@/components/csv-upload-processor'