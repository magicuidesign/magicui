"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import LinearGradient from "@/registry/components/magicui/linear-gradient";
import { Twitter } from "lucide-react";
import {
  enrichTweet,
  useTweet,
  type EnrichedTweet,
  type TweetProps,
  type TwitterComponents,
} from "react-tweet";
import type { Tweet } from "react-tweet/api";

export const truncate = (str: string | null, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length - 3)}...`;
};

export const TweetSkeleton = () => (
  <div className="flex flex-col w-full h-full border rounded-lg p-4 gap-2">
    <div className="flex flex-row gap-2">
      <Skeleton className="h-10 w-10 rounded-full shrink-0" />
      <Skeleton className="h-10 w-full" />
    </div>
    <Skeleton className="h-20 w-full" />
  </div>
);

export const TweetNotFound = (_props: { error?: any }) => (
  <div className="flex flex-col w-full h-full border rounded-lg p-4 gap-2 items-center">
    <h3>Tweet not found</h3>
  </div>
);

export const TweetHeader = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="flex items-center justify-between tracking-tight">
    <div className="flex items-center space-x-2">
      <a href={tweet.user.url} target="_blank" rel="noreferrer">
        <img
          alt={tweet.user.screen_name}
          height={48}
          width={48}
          src={tweet.user.profile_image_url_https}
          className="overflow-hidden rounded-full border border-transparent"
        />
      </a>
      <div>
        <a
          href={tweet.user.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center font-semibold"
        >
          {truncate(tweet.user.name, 20)}
          {tweet.user.verified || tweet.user.is_blue_verified ? (
            <svg
              aria-label="Verified Account"
              className="ml-1 inline h-4 w-4 text-blue-500"
              viewBox="0 0 24 24"
            >
              <g fill="currentColor">
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
              </g>
            </svg>
          ) : null}
        </a>
        <div className="flex items-center space-x-1">
          <a
            href={tweet.user.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-500 transition-all duration-75"
          >
            @{truncate(tweet.user.screen_name, 16)}
          </a>
        </div>
      </div>
    </div>
    <a href={tweet.url} target="_blank" rel="noreferrer">
      <span className="sr-only">Link to tweet</span>
      <Twitter className="h-5 w-5 text-[#3BA9EE] transition-all ease-in-out hover:scale-105" />
    </a>
  </div>
);

export const TweetBody = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="break-words tracking-tighter leading-normal">
    {tweet.entities.map((entity) => {
      switch (entity.type) {
        case "url":
        case "symbol":
        case "hashtag":
        case "mention":
          return (
            <a
              href={entity.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500"
            >
              <span>{entity.text}</span>
            </a>
          );
        case "text":
          return (
            <span
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: entity.text }}
            />
          );
      }
    })}
  </div>
);

type Props = {
  tweet: Tweet;
  components?: TwitterComponents;
  className?: string;
};

export const MyTweet = ({
  tweet: t,
  components,
  className,
  ...props
}: Props) => {
  const tweet = enrichTweet(t);
  return (
    <div
      className={cn(
        "backdrop-blur-md rounded-lg p-4 border relative gap-2 flex flex-col w-full h-full overflow-hidden",
        className
      )}
      {...props}
    >
      <TweetHeader tweet={tweet} />
      <TweetBody tweet={tweet} />
      <LinearGradient />
    </div>
  );
};

export const TweetCard = ({
  id,
  apiUrl,
  fallback = <TweetSkeleton />,
  components,
  onError,
  ...props
}: TweetProps & { className?: string }) => {
  const { data, error, isLoading } = useTweet(id, apiUrl);

  if (isLoading) return fallback;
  if (error || !data) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound error={onError ? onError(error) : error} />;
  }

  return <MyTweet tweet={data} components={components} {...props} />;
};

export default TweetCard;
