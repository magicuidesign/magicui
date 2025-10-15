'use client'

// Submissions Management Component for Admin Dashboard
// Provides interface for reviewing, approving, and rejecting user submissions

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter,
  MoreHorizontal,
  ExternalLink,
  MapPin,
  Phone,
  Globe,
  DollarSign
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useSecurity } from '@/lib/security'
import type { Database } from '@/types/database'
import { toast } from 'sonner'

type Submission = Database['public']['Tables']['submission']['Row'] & {
  user?: {
    name: string
    email: string
  }
}

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected'

interface SubmissionsManagerProps {
  refreshData?: () => void
}

export default function SubmissionsManager({ refreshData }: SubmissionsManagerProps) {
  const security = useSecurity()
  const supabase = createClient<Database>()
  
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('pending')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showActionDialog, setShowActionDialog] = useState(false)
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve')
  const [adminNote, setAdminNote] = useState('')
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    loadSubmissions()
  }, [filterStatus, searchTerm])

  const loadSubmissions = async () => {
    try {
      setLoading(true)
      
      let query = supabase
        .from('submission')
        .select(`
          *,
          user:users(name, email)
        `)
        .order('created_at', { ascending: false })

      // Apply status filter
      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus)
      }

      // Apply search filter
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
      }

      const { data, error } = await query

      if (error) throw error
      setSubmissions(data || [])

    } catch (error) {
      console.error('Failed to load submissions:', error)
      toast.error('Failed to load submissions')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (submissionId: string, note?: string) => {
    try {
      setProcessing(true)
      
      const { error } = await supabase
        .from('submission')
        .update({
          status: 'approved',
          admin_note: note || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', submissionId)

      if (error) throw error

      // Log security event
      await security.logSecurityEvent('submission_approved', 'submission', submissionId)

      toast.success('Submission approved successfully')
      loadSubmissions()
      refreshData?.()
      setShowActionDialog(false)

    } catch (error) {
      console.error('Failed to approve submission:', error)
      toast.error('Failed to approve submission')
    } finally {
      setProcessing(false)
    }
  }

  const handleReject = async (submissionId: string, note?: string) => {
    try {
      setProcessing(true)
      
      const { error } = await supabase
        .from('submission')
        .update({
          status: 'rejected',
          admin_note: note || 'Submission rejected by admin',
          updated_at: new Date().toISOString()
        })
        .eq('id', submissionId)

      if (error) throw error

      // Log security event
      await security.logSecurityEvent('submission_rejected', 'submission', submissionId, {
        reason: note
      })

      toast.success('Submission rejected')
      loadSubmissions()
      refreshData?.()
      setShowActionDialog(false)

    } catch (error) {
      console.error('Failed to reject submission:', error)
      toast.error('Failed to reject submission')
    } finally {
      setProcessing(false)
    }
  }

  const handleAction = () => {
    if (!selectedSubmission) return

    if (actionType === 'approve') {
      handleApprove(selectedSubmission.id, adminNote)
    } else {
      handleReject(selectedSubmission.id, adminNote)
    }
  }

  const openActionDialog = (submission: Submission, action: 'approve' | 'reject') => {
    setSelectedSubmission(submission)
    setActionType(action)
    setAdminNote('')
    setShowActionDialog(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case 'approved':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
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

  const filteredSubmissions = submissions.filter(submission => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        submission.name.toLowerCase().includes(searchLower) ||
        submission.address?.toLowerCase().includes(searchLower) ||
        submission.category?.toLowerCase().includes(searchLower) ||
        submission.user?.email.toLowerCase().includes(searchLower)
      )
    }
    return true
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Select value={filterStatus} onValueChange={(value: FilterStatus) => setFilterStatus(value)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">
                  {submissions.filter(s => s.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {submissions.filter(s => s.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {submissions.filter(s => s.status === 'rejected').length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
          <CardDescription>
            Review and manage user submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No submissions found matching your criteria
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{submission.name}</div>
                          {submission.address && (
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {submission.address}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{submission.category || 'Uncategorized'}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{submission.user?.name || 'Unknown'}</div>
                          <div className="text-sm text-muted-foreground">{submission.user?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatDate(submission.created_at)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(submission.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedSubmission(submission)
                              setShowDetailsDialog(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {submission.status === 'pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openActionDialog(submission, 'approve')}
                                className="text-green-600 hover:text-green-700"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openActionDialog(submission, 'reject')}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
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

      {/* Submission Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              Review submission information before taking action
            </DialogDescription>
          </DialogHeader>
          
          {selectedSubmission && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedSubmission.name}</h3>
                  <p className="text-muted-foreground">{selectedSubmission.about}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedSubmission.address && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedSubmission.address}</span>
                    </div>
                  )}
                  
                  {selectedSubmission.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedSubmission.phone}</span>
                    </div>
                  )}
                  
                  {selectedSubmission.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a 
                        href={selectedSubmission.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {selectedSubmission.website}
                      </a>
                    </div>
                  )}
                  
                  {selectedSubmission.price_range && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedSubmission.price_range}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <Badge variant="outline" className="ml-2">
                    {selectedSubmission.category || 'Uncategorized'}
                  </Badge>
                </div>

                {selectedSubmission.cover_image && (
                  <div>
                    <Label className="text-sm font-medium">Cover Image</Label>
                    <div className="mt-2">
                      <img 
                        src={selectedSubmission.cover_image} 
                        alt={selectedSubmission.name}
                        className="rounded-lg max-w-full h-48 object-cover"
                      />
                    </div>
                  </div>
                )}

                {selectedSubmission.latitude && selectedSubmission.longitude && (
                  <div>
                    <Label className="text-sm font-medium">Coordinates</Label>
                    <div className="text-sm text-muted-foreground">
                      {selectedSubmission.latitude}, {selectedSubmission.longitude}
                    </div>
                  </div>
                )}

                {selectedSubmission.admin_note && (
                  <div>
                    <Label className="text-sm font-medium">Admin Note</Label>
                    <div className="text-sm text-muted-foreground mt-1">
                      {selectedSubmission.admin_note}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="font-medium">Submitted By</Label>
                    <div>{selectedSubmission.user?.name || 'Unknown'}</div>
                    <div className="text-muted-foreground">{selectedSubmission.user?.email}</div>
                  </div>
                  <div>
                    <Label className="font-medium">Submitted Date</Label>
                    <div>{formatDate(selectedSubmission.created_at)}</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setShowDetailsDialog(false)}
                >
                  Close
                </Button>
                
                {selectedSubmission.status === 'pending' && (
                  <>
                    <Button
                      onClick={() => {
                        setShowDetailsDialog(false)
                        openActionDialog(selectedSubmission, 'approve')
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setShowDetailsDialog(false)
                        openActionDialog(selectedSubmission, 'reject')
                      }}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Confirmation Dialog */}
      <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' ? 'Approve Submission' : 'Reject Submission'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'approve' 
                ? 'Are you sure you want to approve this submission? It will be processed for AI enrichment.'
                : 'Are you sure you want to reject this submission?'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedSubmission && (
              <div>
                <p className="font-medium">{selectedSubmission.name}</p>
                <p className="text-sm text-muted-foreground">{selectedSubmission.address}</p>
              </div>
            )}
            
            <div>
              <Label htmlFor="admin-note">Admin Note (optional)</Label>
              <Textarea
                id="admin-note"
                placeholder={actionType === 'approve' 
                  ? 'Add a note about this approval...' 
                  : 'Reason for rejection...'
                }
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowActionDialog(false)}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAction}
              disabled={processing}
              className={actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  {actionType === 'approve' ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </>
                  )}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}