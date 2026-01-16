'use client'

// Listings Management Component for Admin Dashboard
// Provides interface for managing published directory listings

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Eye, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  ExternalLink,
  MapPin,
  Phone,
  Globe,
  Star,
  TrendingUp,
  Calendar,
  Tag
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useSecurity } from '@/lib/security'
import type { Database } from '@/types/database'
import { toast } from 'sonner'

type Listing = Database['public']['Tables']['listings']['Row'] & {
  user?: {
    name: string
    email: string
  }
}

type FilterStatus = 'all' | 'published' | 'draft' | 'archived'
type SortField = 'name' | 'overall_score' | 'created_at' | 'category'
type SortOrder = 'asc' | 'desc'

interface ListingsManagerProps {
  refreshData?: () => void
}

export default function ListingsManager({ refreshData }: ListingsManagerProps) {
  const security = useSecurity()
  const supabase = createClient<Database>()
  
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('published')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('created_at')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [processing, setProcessing] = useState(false)

  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    loadListings()
    loadCategories()
  }, [filterStatus, filterCategory, searchTerm, sortField, sortOrder])

  const loadListings = async () => {
    try {
      setLoading(true)
      
      let query = supabase
        .from('listings')
        .select(`
          *,
          user:users(name, email)
        `)

      // Apply status filter
      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus)
      }

      // Apply category filter
      if (filterCategory !== 'all') {
        query = query.eq('category', filterCategory)
      }

      // Apply search filter
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%,neighborhood.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
      }

      // Apply sorting
      query = query.order(sortField, { ascending: sortOrder === 'asc' })

      const { data, error } = await query

      if (error) throw error
      setListings(data || [])

    } catch (error) {
      console.error('Failed to load listings:', error)
      toast.error('Failed to load listings')
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('category')
        .not('category', 'is', null)

      if (error) throw error

      const uniqueCategories = [...new Set((data || []).map(item => item.category).filter(Boolean))]
      setCategories(uniqueCategories as string[])

    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const handleUpdateStatus = async (listingId: string, newStatus: string) => {
    try {
      setProcessing(true)
      
      const { error } = await supabase
        .from('listings')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', listingId)

      if (error) throw error

      // Log security event
      await security.logSecurityEvent('listing_status_updated', 'listing', listingId, {
        newStatus
      })

      toast.success(`Listing ${newStatus} successfully`)
      loadListings()
      refreshData?.()

    } catch (error) {
      console.error('Failed to update listing status:', error)
      toast.error('Failed to update listing status')
    } finally {
      setProcessing(false)
    }
  }

  const handleDelete = async (listingId: string) => {
    try {
      setProcessing(true)
      
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', listingId)

      if (error) throw error

      // Log security event
      await security.logSecurityEvent('listing_deleted', 'listing', listingId)

      toast.success('Listing deleted successfully')
      loadListings()
      refreshData?.()
      setShowDeleteDialog(false)

    } catch (error) {
      console.error('Failed to delete listing:', error)
      toast.error('Failed to delete listing')
    } finally {
      setProcessing(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500"><TrendingUp className="w-3 h-3 mr-1" />Published</Badge>
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>
      case 'archived':
        return <Badge variant="outline">Archived</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const renderScoreStars = (score: number) => {
    const fullStars = Math.floor(score / 2)
    const hasHalfStar = score % 2 >= 1
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex items-center gap-1">
        <div className="flex">
          {[...Array(fullStars)].map((_, i) => (
            <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
          {hasHalfStar && (
            <Star key="half" className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />
          )}
          {[...Array(emptyStars)].map((_, i) => (
            <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
          ))}
        </div>
        <span className="text-sm text-muted-foreground ml-1">{score.toFixed(1)}</span>
      </div>
    )
  }

  const filteredListings = listings.filter(listing => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        listing.name.toLowerCase().includes(searchLower) ||
        listing.address?.toLowerCase().includes(searchLower) ||
        listing.neighborhood?.toLowerCase().includes(searchLower) ||
        listing.category?.toLowerCase().includes(searchLower) ||
        listing.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }
    return true
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Select value={filterStatus} onValueChange={(value: FilterStatus) => setFilterStatus(value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={`${sortField}-${sortOrder}`} onValueChange={(value) => {
            const [field, order] = value.split('-')
            setSortField(field as SortField)
            setSortOrder(order as SortOrder)
          }}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created_at-desc">Newest First</SelectItem>
              <SelectItem value="created_at-asc">Oldest First</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="overall_score-desc">Highest Score</SelectItem>
              <SelectItem value="overall_score-asc">Lowest Score</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold text-green-600">
                  {listings.filter(l => l.status === 'published').length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Draft</p>
                <p className="text-2xl font-bold">
                  {listings.filter(l => l.status === 'draft').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Archived</p>
                <p className="text-2xl font-bold">
                  {listings.filter(l => l.status === 'archived').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Score</p>
                <p className="text-2xl font-bold">
                  {listings.length > 0 
                    ? (listings.reduce((sum, l) => sum + (l.overall_score || 0), 0) / listings.length).toFixed(1)
                    : '0'
                  }
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Listings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Listings</CardTitle>
          <CardDescription>
            Manage published directory listings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No listings found matching your criteria
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Neighborhood</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredListings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{listing.name}</div>
                          {listing.address && (
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {listing.address}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{listing.category || 'Uncategorized'}</Badge>
                      </TableCell>
                      <TableCell>
                        {listing.overall_score ? renderScoreStars(listing.overall_score) : '-'}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{listing.neighborhood || '-'}</span>
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatDate(listing.updated_at)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(listing.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedListing(listing)
                              setShowDetailsDialog(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedListing(listing)
                              setShowEditDialog(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedListing(listing)
                              setShowDeleteDialog(true)
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Listing Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Listing Details</DialogTitle>
            <DialogDescription>
              Complete listing information and metadata
            </DialogDescription>
          </DialogHeader>
          
          {selectedListing && (
            <div className="space-y-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="scoring">Scoring</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      {selectedListing.cover_image && (
                        <img 
                          src={selectedListing.cover_image} 
                          alt={selectedListing.name}
                          className="rounded-lg w-full h-48 object-cover mb-4"
                        />
                      )}
                      <h3 className="font-semibold text-lg">{selectedListing.name}</h3>
                      <p className="text-muted-foreground">{selectedListing.about}</p>
                    </div>
                    
                    <div className="space-y-4">
                      {selectedListing.overall_score && (
                        <div>
                          <Label className="text-sm font-medium">Overall Score</Label>
                          <div className="mt-1">
                            {renderScoreStars(selectedListing.overall_score)}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Category</Label>
                          <div className="mt-1">
                            <Badge variant="outline">{selectedListing.category || 'Uncategorized'}</Badge>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium">Neighborhood</Label>
                          <div className="mt-1 text-sm">{selectedListing.neighborhood || '-'}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {selectedListing.address && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{selectedListing.address}</span>
                          </div>
                        )}
                        
                        {selectedListing.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{selectedListing.phone}</span>
                          </div>
                        )}
                        
                        {selectedListing.website && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <a 
                              href={selectedListing.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              Website
                            </a>
                          </div>
                        )}
                        
                        {selectedListing.price_range && (
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{selectedListing.price_range}</span>
                          </div>
                        )}
                      </div>

                      {selectedListing.tags && selectedListing.tags.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium">Tags</Label>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {selectedListing.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="scoring" className="space-y-6">
                  {selectedListing.sub_scores && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(selectedListing.sub_scores).map(([key, value]) => (
                        <div key={key} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Label className="font-medium capitalize">
                              {key.replace(/_/g, ' ')}
                            </Label>
                            <span className="text-sm font-bold">{value.toFixed(1)}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full" 
                              style={{ width: `${(value / 10) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div>
                    <Label className="text-sm font-medium">Public Sentiment</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedListing.public_sentiment || 'No sentiment data available'}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Best Time to Visit</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedListing.best_time_to_visit || 'No specific timing information'}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedListing.opening_hours && selectedListing.opening_hours.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium">Opening Hours</Label>
                        <div className="mt-2 space-y-1">
                          {selectedListing.opening_hours.map((hour, index) => (
                            <div key={index} className="text-sm flex justify-between">
                              <span>{hour.day}</span>
                              <span>{hour.closed ? 'Closed' : `${hour.open} - ${hour.close}`}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedListing.accessibility_amenities && (
                      <div>
                        <Label className="text-sm font-medium">Accessibility</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedListing.accessibility_amenities}
                        </p>
                      </div>
                    )}

                    {selectedListing.services && (
                      <div>
                        <Label className="text-sm font-medium">Services</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedListing.services}
                        </p>
                      </div>
                    )}

                    {selectedListing.getting_there && (
                      <div>
                        <Label className="text-sm font-medium">Getting There</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedListing.getting_there}
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="faq" className="space-y-6">
                  {selectedListing.faq && selectedListing.faq.length > 0 ? (
                    <div className="space-y-4">
                      {selectedListing.faq.map((faq, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">{faq.question}</h4>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">No FAQ available</p>
                  )}
                </TabsContent>
              </Tabs>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setShowDetailsDialog(false)}
                >
                  Close
                </Button>
                
                <Button
                  onClick={() => {
                    setShowDetailsDialog(false)
                    setShowEditDialog(true)
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Listing
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Status Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Listing Status</DialogTitle>
            <DialogDescription>
              Change the publication status of this listing
            </DialogDescription>
          </DialogHeader>
          
          {selectedListing && (
            <div className="space-y-4">
              <div>
                <p className="font-medium">{selectedListing.name}</p>
                <p className="text-sm text-muted-foreground">{selectedListing.address}</p>
              </div>
              
              <div>
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={selectedListing.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEditDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedListing) {
                  handleUpdateStatus(selectedListing.id, selectedListing.status)
                }
                setShowEditDialog(false)
              }}
            >
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Listing</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this listing? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedListing && (
            <div className="space-y-4">
              <div>
                <p className="font-medium">{selectedListing.name}</p>
                <p className="text-sm text-muted-foreground">{selectedListing.address}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedListing) {
                  handleDelete(selectedListing.id)
                }
              }}
              disabled={processing}
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Listing
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}