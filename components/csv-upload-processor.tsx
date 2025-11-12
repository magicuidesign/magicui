'use client'

// CSV Upload and Processing Component for AI Enrichment
// Provides interface for uploading CSV files and processing them through AI

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Upload, 
  FileText, 
  Download, 
  AlertCircle, 
  CheckCircle, 
  Loader2,
  Eye,
  Trash2
} from 'lucide-react'
import { useAIEnrichment } from '@/lib/ai-enrichment'
import { useSecurity } from '@/lib/security'

interface CSVPreview {
  headers: string[]
  rows: Array<Record<string, string>>
}

interface ProcessingState {
  isProcessing: boolean
  progress: number
  current: string
  result?: any
  error?: string
}

export default function CSVUploadProcessor() {
  const aiService = useAIEnrichment()
  const security = useSecurity()

  const [file, setFile] = useState<File | null>(null)
  const [csvPreview, setCsvPreview] = useState<CSVPreview | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [processing, setProcessing] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    current: ''
  })
  const [processedResult, setProcessedResult] = useState<any>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0]
    if (!uploadedFile) return

    setFile(uploadedFile)
    setValidationErrors([])
    setCsvPreview(null)
    setProcessedResult(null)

    try {
      // Validate file
      const validation = await aiService.validateCSVFile(uploadedFile)
      if (!validation.valid) {
        setValidationErrors(validation.errors)
        return
      }

      // Read and preview CSV
      const csvData = await uploadedFile.text()
      const preview = aiService.previewCSVData(csvData, 3)
      
      setCsvPreview({
        headers: csvData.split('\n')[0].split(',').map(h => h.trim().replace(/"/g, '')),
        rows: preview
      })

    } catch (error) {
      setValidationErrors([`Failed to process file: ${error.message}`])
    }
  }, [aiService])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  const handleProcessCSV = async () => {
    if (!file) return

    setProcessing({
      isProcessing: true,
      progress: 0,
      current: 'Starting AI enrichment...'
    })

    try {
      // Log security event
      await security.logSecurityEvent('csv_processing_started', 'file', undefined, {
        fileName: file.name,
        fileSize: file.size
      })

      const result = await aiService.uploadAndProcessCSV(file)
      
      setProcessing({
        isProcessing: false,
        progress: 100,
        current: 'Processing completed!',
        result
      })

      setProcessedResult(result)

      // Log success
      await security.logSecurityEvent('csv_processing_completed', 'file', undefined, {
        processed: result.processed,
        saved: result.saved,
        errors: result.errors
      })

    } catch (error) {
      setProcessing({
        isProcessing: false,
        progress: 0,
        current: '',
        error: error.message
      })

      // Log error
      await security.logSecurityEvent('csv_processing_failed', 'file', undefined, {
        error: error.message
      })
    }
  }

  const handleDownloadTemplate = () => {
    aiService.downloadSampleCSV()
  }

  const handleClearFile = () => {
    setFile(null)
    setCsvPreview(null)
    setValidationErrors([])
    setProcessedResult(null)
    setProcessing({ isProcessing: false, progress: 0, current: '' })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">AI Content Enrichment</h1>
        <p className="text-muted-foreground">
          Upload CSV data to automatically enrich listings with AI-generated metadata
        </p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload CSV</TabsTrigger>
          <TabsTrigger value="template">Template</TabsTrigger>
          <TabsTrigger value="submissions">Pending Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* File Upload Area */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload CSV File
              </CardTitle>
              <CardDescription>
                Upload a CSV file containing business data to enrich with AI-generated content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? 'border-primary bg-primary/5'
                    : 'border-muted-foreground/25 hover:border-primary/50'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                {isDragActive ? (
                  <p className="text-lg font-medium">Drop the CSV file here...</p>
                ) : (
                  <div className="space-y-2">
                    <p className="text-lg font-medium">
                      Drag & drop a CSV file here, or click to select
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Maximum file size: 10MB • CSV files only
                    </p>
                  </div>
                )}
              </div>

              {/* File Info */}
              {file && (
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFile}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1">
                      {validationErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* CSV Preview */}
              {csvPreview && (
                <div className="space-y-3">
                  <h3 className="font-medium flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    CSV Preview
                  </h3>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-muted">
                          <tr>
                            {csvPreview.headers.map((header, index) => (
                              <th key={index} className="px-4 py-2 text-left font-medium">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {csvPreview.rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-t">
                              {csvPreview.headers.map((header, colIndex) => (
                                <td key={colIndex} className="px-4 py-2 max-w-xs truncate">
                                  {row[header] || '-'}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Processing */}
              {processing.isProcessing && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="font-medium">{processing.current}</span>
                  </div>
                  <Progress value={processing.progress} className="w-full" />
                </div>
              )}

              {/* Processing Result */}
              {processedResult && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <p>
                        <strong>Processing Complete!</strong>
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Processed:</span>
                          <Badge variant="secondary" className="ml-2">
                            {processedResult.processed}
                          </Badge>
                        </div>
                        <div>
                          <span className="font-medium">Saved:</span>
                          <Badge variant="default" className="ml-2">
                            {processedResult.saved}
                          </Badge>
                        </div>
                        <div>
                          <span className="font-medium">Errors:</span>
                          <Badge variant={processedResult.errors > 0 ? 'destructive' : 'secondary'} className="ml-2">
                            {processedResult.errors}
                          </Badge>
                        </div>
                      </div>
                      
                      {processedResult.errorDetails && processedResult.errorDetails.length > 0 && (
                        <details className="mt-3">
                          <summary className="cursor-pointer text-sm font-medium">
                            View Error Details
                          </summary>
                          <ul className="mt-2 text-sm space-y-1 list-disc list-inside">
                            {processedResult.errorDetails.map((error: string, index: number) => (
                              <li key={index} className="text-muted-foreground">
                                {error}
                              </li>
                            ))}
                          </ul>
                        </details>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Processing Error */}
              {processing.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Processing failed: {processing.error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleProcessCSV}
                  disabled={!file || validationErrors.length > 0 || processing.isProcessing}
                  className="flex-1"
                >
                  {processing.isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Process with AI'
                  )}
                </Button>
                
                <Button variant="outline" onClick={handleClearFile}>
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="template" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                CSV Template
              </CardTitle>
              <CardDescription>
                Download the CSV template to see the required format for your data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-3">Required Columns:</h3>
                <ul className="space-y-2 text-sm">
                  <li><code className="bg-background px-2 py-1 rounded">name</code> - Business name (required)</li>
                  <li><code className="bg-background px-2 py-1 rounded">about</code> - Description (optional)</li>
                  <li><code className="bg-background px-2 py-1 rounded">address</code> - Full address (optional)</li>
                  <li><code className="bg-background px-2 py-1 rounded">category</code> - Business type (optional)</li>
                  <li><code className="bg-background px-2 py-1 rounded">website</code> - Website URL (optional)</li>
                  <li><code className="bg-background px-2 py-1 rounded">phone</code> - Phone number (optional)</li>
                  <li><code className="bg-background px-2 py-1 rounded">latitude</code> - GPS latitude (optional)</li>
                  <li><code className="bg-background px-2 py-1 rounded">longitude</code> - GPS longitude (optional)</li>
                  <li><code className="bg-background px-2 py-1 rounded">price_range</code> - Price level ($, $$, $$$, $$$$) (optional)</li>
                  <li><code className="bg-background px-2 py-1 rounded">cover_image</code> - Image URL (optional)</li>
                </ul>
              </div>

              <Button onClick={handleDownloadTemplate} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          <PendingSubmissionsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Separate component for pending submissions
function PendingSubmissionsTab() {
  const aiService = useAIEnrichment()
  const security = useSecurity()
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  const loadSubmissions = async () => {
    try {
      const { data, error } = await security.supabase
        .from('submission')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })

      if (error) throw error
      setSubmissions(data || [])
    } catch (error) {
      console.error('Failed to load submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProcessSubmissions = async () => {
    if (submissions.length === 0) return

    setProcessing(true)
    try {
      const submissionIds = submissions.map(sub => sub.id)
      const result = await aiService.enrichApprovedSubmissions(submissionIds)
      
      // Reload submissions after processing
      await loadSubmissions()
      
      console.log('Processed submissions:', result)
    } catch (error) {
      console.error('Failed to process submissions:', error)
    } finally {
      setProcessing(false)
    }
  }

  // Load submissions on mount
  // useEffect(() => {
  //   loadSubmissions()
  // }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Approved Submissions</CardTitle>
        <CardDescription>
          Process approved user submissions through AI enrichment
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : submissions.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">
            No approved submissions pending processing
          </p>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {submissions.length} submission{submissions.length > 1 ? 's' : ''} ready for processing
              </p>
              <Button
                onClick={handleProcessSubmissions}
                disabled={processing}
                size="sm"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Process All'
                )}
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="border-t">
                      <td className="px-4 py-2 font-medium">{submission.name}</td>
                      <td className="px-4 py-2">{submission.category || '-'}</td>
                      <td className="px-4 py-2 text-muted-foreground">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}