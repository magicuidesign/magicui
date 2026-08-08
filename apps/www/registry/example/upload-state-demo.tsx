"use client"

import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  UploadState,
  type UploadStateStatus,
} from "@/registry/magicui/upload-state"

export default function UploadStateDemo() {
  const [status, setStatus] = useState<UploadStateStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [fileName, setFileName] = useState<string>()
  const uploadTimer = useRef<ReturnType<typeof setInterval>>(undefined)

  const clearUploadTimer = () => {
    if (uploadTimer.current) {
      clearInterval(uploadTimer.current)
      uploadTimer.current = undefined
    }
  }

  useEffect(() => {
    return () => {
      if (uploadTimer.current) {
        clearInterval(uploadTimer.current)
      }
    }
  }, [])

  const handleFiles = (files: File[]) => {
    clearUploadTimer()
    setFileName(
      files.length === 1 ? files[0].name : `${files.length} files selected`
    )
    setProgress(0)
    setStatus("uploading")

    let nextProgress = 0
    uploadTimer.current = setInterval(() => {
      nextProgress += 10
      setProgress(nextProgress)

      if (nextProgress >= 100) {
        clearUploadTimer()
        setStatus("success")
      }
    }, 220)
  }

  const reset = () => {
    clearUploadTimer()
    setStatus("idle")
    setProgress(0)
    setFileName(undefined)
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <UploadState
        accept="image/*,application/pdf"
        multiple
        status={status}
        progress={progress}
        error="This is a demo error. Try another file."
        onFiles={handleFiles}
      />
      <div className="flex items-center justify-between gap-3">
        <p className="text-muted-foreground min-w-0 truncate text-sm">
          {fileName ?? "Choose an image or PDF to start"}
        </p>
        <div className="flex shrink-0 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              clearUploadTimer()
              setStatus("error")
            }}
          >
            Show error
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
