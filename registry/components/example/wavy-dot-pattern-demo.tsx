"use client";

import WavyDotPattern from "@/registry/components/magicui/wavy-dot-pattern";

const WavyDotPatternDemo = () => {
  return (
    <div className = "relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-background p-40">
      
      <p className = "z-10 whitespace-pre-wrap text-center text-4xl font-semibold tracking-tighter text-black dark:text-white">
        Wavy Dot Pattern
      </p>
      
      <WavyDotPattern gridWidth = { 30 } gridHeight = { 15 } dotWidth = { 8 } dotHeight = { 8 }/>
    
    </div>
  )
}

export default WavyDotPatternDemo;
