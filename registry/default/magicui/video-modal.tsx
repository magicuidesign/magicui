"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const VideoModal = DialogPrimitive.Root;

const VideoModalTrigger = DialogPrimitive.Trigger;

const VideoModalPortal = ({
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal {...props}>
    <div className="min-w-screen fixed inset-0 z-50 flex min-h-screen items-center justify-center p-2">
      {children}
    </div>
  </DialogPrimitive.Portal>
);
VideoModalPortal.displayName = DialogPrimitive.Portal.displayName;

const VideoModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 backdrop-blur-xl", className)}
    {...props}
    asChild
  >
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  </DialogPrimitive.Overlay>
));
VideoModalOverlay.displayName = DialogPrimitive.Overlay.displayName;

const VideoModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <VideoModalPortal>
    <VideoModalOverlay />
    <DialogPrimitive.Content ref={ref} {...props} asChild>
      <motion.div
        className={cn(
          "fixed z-50 flex h-screen w-screen items-center justify-center p-3",
          className,
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative mx-auto flex h-full w-full items-center justify-center rounded-2xl border border-primary/10 bg-background/10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Mobile close button */}
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full border border-gray-950/[.1] bg-gray-950/[.01] p-2 transition duration-300 hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15] lg:hidden">
            <svg
              fill="none"
              height="12"
              viewBox="0 0 12 12"
              width="12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L11 11M11 1L1 11"
                className="stroke-current"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></path>
            </svg>
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          <div className="flex h-[80%] w-full max-w-5xl gap-6">
            <DialogPrimitive.Close className="hidden self-start rounded-full border border-gray-950/[.1] bg-gray-950/[.01] p-2 transition duration-300 hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15] lg:block">
              <svg
                fill="none"
                height="12"
                viewBox="0 0 12 12"
                width="12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L11 11M11 1L1 11"
                  className="stroke-current"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
              </svg>
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
            <div className="flex w-full flex-col max-lg:p-4 max-lg:text-center">
              {children}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </DialogPrimitive.Content>
  </VideoModalPortal>
));
VideoModalContent.displayName = DialogPrimitive.Content.displayName;

const VideoModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "mb-4 text-4xl font-bold text-gray-950 dark:text-gray-50",
      className,
    )}
    {...props}
  />
));
VideoModalTitle.displayName = DialogPrimitive.Title.displayName;

const VideoModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "mb-6 text-xl text-gray-950/80 dark:text-gray-50/70",
      className,
    )}
    {...props}
  />
));
VideoModalDescription.displayName = DialogPrimitive.Description.displayName;

const VideoPreview = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute inset-0 z-10 transition-opacity duration-300 group-[.playing]:pointer-events-none group-[.playing]:opacity-0",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
VideoPreview.displayName = "VideoPreview";

const VideoPlayButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300 group-[.playing]:pointer-events-none group-[.playing]:opacity-0",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
VideoPlayButton.displayName = "VideoPlayButton";

const VideoPlayer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div
      ref={ref}
      className={cn(
        "group relative aspect-video max-w-4xl overflow-hidden rounded-xl border border-gray-950/[.1] object-cover dark:border-gray-50/[.1]",
        isPlaying && "playing",
        className,
      )}
      onClick={() => setIsPlaying(true)}
      {...props}
    >
      {children}
    </div>
  );
});
VideoPlayer.displayName = "VideoPlayer";

const VideoModalVideo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "aspect-video max-w-4xl overflow-hidden rounded-xl border border-gray-950/[.1] object-cover shadow-xl dark:border-gray-50/[.1]",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
VideoModalVideo.displayName = "VideoModalVideo";

export {
  VideoModal,
  VideoModalTrigger,
  VideoModalContent,
  VideoModalTitle,
  VideoModalDescription,
  VideoModalVideo,
  VideoPreview,
  VideoPlayButton,
  VideoPlayer,
};
