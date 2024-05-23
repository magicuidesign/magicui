"use client";

import { cn } from "@/lib/utils";

interface AvatarCirclesProps {
    className?: string;
    numPeople?: number;
}

export default function AvatarCircles({
    numPeople,
    className,
}: AvatarCirclesProps) {

  return (
    <div className = { cn("flex -space-x-4 rtl:space-x-reverse", className) }>
        <img className = "w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src = "https://avatars.githubusercontent.com/u/16860528" alt = ""/>
        <img className = "w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src = "https://avatars.githubusercontent.com/u/29210732" alt = ""/>
        <img className = "w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src = "https://avatars.githubusercontent.com/u/20110627" alt = ""/>
        <a className = "flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href = "#">+{ numPeople }</a>
    </div>
  );
}
