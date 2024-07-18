"use client";

import { TweetProps, useTweet } from "react-tweet";

import {
  MagicTweet,
  TweetNotFound,
  TweetSkeleton,
} from "@/components/magicui/tweet-card";

const ClientTweetCard = ({
  id,
  apiUrl,
  fallback = <TweetSkeleton />,
  components,
  fetchOptions,
  onError,
  ...props
}: TweetProps & { className?: string }) => {
  const { data, error, isLoading } = useTweet(id, apiUrl, fetchOptions);

  if (isLoading) return fallback;
  if (error || !data) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound error={onError ? onError(error) : error} />;
  }

  return <MagicTweet tweet={data} components={components} {...props} />;
};

export default ClientTweetCard;
