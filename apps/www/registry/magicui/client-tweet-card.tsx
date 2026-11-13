"use client"

import { useTweet, type TweetProps } from "react-tweet"

import {
  MagicTweet,
  TweetNotFound,
  TweetSkeleton,
  type TweetLogo,
} from "@/registry/magicui/tweet-card"

export const ClientTweetCard = ({
  id,
  apiUrl,
  fallback = <TweetSkeleton />,
  components,
  fetchOptions,
  onError,
  ...props
}: TweetProps & { className?: string; logo?: TweetLogo }) => {
  const { data, error, isLoading } = useTweet(id, apiUrl, fetchOptions)

  if (isLoading) return fallback
  if (error || !data) {
    const NotFound = components?.TweetNotFound ?? TweetNotFound
    return <NotFound error={onError ? onError(error) : error} />
  }

  return <MagicTweet tweet={data} {...props} />
}
