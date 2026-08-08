"use client"

import { forwardRef, useId, useRef, useState } from "react"
import type { ComponentPropsWithoutRef, DragEvent, KeyboardEvent } from "react"
import {
  CloudUploadIcon,
  FileCheck2Icon,
  LoaderCircleIcon,
  TriangleAlertIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

export type UploadStateStatus = "idle" | "uploading" | "success" | "error"

export interface UploadStateProps extends ComponentPropsWithoutRef<"div"> {
  accept?: string
  multiple?: boolean
  disabled?: boolean
  status?: UploadStateStatus
  progress?: number
  error?: string
  onFiles?: (files: File[]) => void
}

export const UploadState = forwardRef<HTMLDivElement, UploadStateProps>(
  (
    {
      accept,
      multiple = false,
      disabled = false,
      status = "idle",
      progress,
      error,
      onFiles,
      className,
      onClick,
      onDragEnter,
      onDragLeave,
      onDragOver,
      onDrop,
      onKeyDown,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const descriptionId = useId()
    const isInteractive = !disabled && status !== "uploading"
    const hasProgress =
      typeof progress === "number" && Number.isFinite(progress)
    const normalizedProgress = hasProgress
      ? Math.min(100, Math.max(0, progress))
      : undefined

    const selectFiles = (files: FileList | null) => {
      const selectedFiles = Array.from(files ?? [])

      if (selectedFiles.length > 0) {
        onFiles?.(selectedFiles)
      }
    }

    const openFilePicker = () => {
      if (isInteractive) {
        inputRef.current?.click()
      }
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event)

      if (event.defaultPrevented || !isInteractive) return

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        openFilePicker()
      }
    }

    const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
      onDragEnter?.(event)

      event.preventDefault()
      if (!isInteractive) return

      setIsDragging(true)
    }

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
      onDragOver?.(event)

      event.preventDefault()
      if (!isInteractive) return

      event.dataTransfer.dropEffect = "copy"
      setIsDragging(true)
    }

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
      onDragLeave?.(event)

      if (event.currentTarget.contains(event.relatedTarget as Node)) return

      setIsDragging(false)
    }

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
      onDrop?.(event)

      event.preventDefault()
      setIsDragging(false)

      if (!isInteractive) return

      selectFiles(event.dataTransfer.files)
    }

    const message = isDragging
      ? "Drop files to add them"
      : status === "uploading"
        ? normalizedProgress === undefined
          ? "Uploading files"
          : `Uploading files, ${normalizedProgress}% complete`
        : status === "success"
          ? multiple
            ? "Files are ready"
            : "File is ready"
          : status === "error"
            ? (error ?? "Something went wrong. Try another file.")
            : "Drop files here or click to browse"

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={isInteractive ? 0 : -1}
        aria-disabled={!isInteractive}
        aria-busy={status === "uploading"}
        aria-describedby={
          ariaDescribedBy
            ? `${ariaDescribedBy} ${descriptionId}`
            : descriptionId
        }
        className={cn(
          "group border-border bg-background focus-visible:ring-ring relative flex min-h-56 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-6 text-center transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          isDragging && "border-primary bg-primary/5",
          !isInteractive && "cursor-not-allowed opacity-60",
          className
        )}
        onClick={(event) => {
          onClick?.(event)

          if (!event.defaultPrevented) {
            openFilePicker()
          }
        }}
        onKeyDown={handleKeyDown}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        {...props}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={!isInteractive}
          className="sr-only"
          tabIndex={-1}
          aria-label={multiple ? "Choose files" : "Choose a file"}
          onClick={(event) => event.stopPropagation()}
          onChange={(event) => {
            selectFiles(event.target.files)
            event.target.value = ""
          }}
        />

        <div
          className={cn(
            "bg-muted text-muted-foreground mb-4 flex size-12 items-center justify-center rounded-full transition-colors",
            isDragging && "bg-primary text-primary-foreground",
            status === "success" && "bg-emerald-500/10 text-emerald-600",
            status === "error" && "bg-destructive/10 text-destructive"
          )}
          aria-hidden="true"
        >
          {status === "uploading" ? (
            <LoaderCircleIcon className="size-5 animate-spin motion-reduce:animate-none" />
          ) : status === "success" ? (
            <FileCheck2Icon className="size-5" />
          ) : status === "error" ? (
            <TriangleAlertIcon className="size-5" />
          ) : (
            <CloudUploadIcon className="size-5" />
          )}
        </div>

        <p className="text-foreground text-sm font-medium">{message}</p>
        {status === "idle" && !isDragging && (
          <p className="text-muted-foreground mt-1 text-xs">
            {multiple ? "Choose one or more files" : "Choose a file"}
          </p>
        )}
        {status === "uploading" && normalizedProgress !== undefined && (
          <div
            className="bg-muted mt-4 h-1.5 w-full max-w-56 overflow-hidden rounded-full"
            role="progressbar"
            aria-label="Upload progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={normalizedProgress}
          >
            <div
              className="bg-primary h-full rounded-full transition-[width] motion-reduce:transition-none"
              style={{ width: `${normalizedProgress}%` }}
            />
          </div>
        )}
        <span id={descriptionId} className="sr-only" aria-live="polite">
          {message}
        </span>
      </div>
    )
  }
)

UploadState.displayName = "UploadState"
