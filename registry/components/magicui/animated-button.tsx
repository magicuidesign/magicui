"use client"

import Link from "next/link"

export const AnimatedButton = () => {
  return (
    <main className="w-full">
      <ol className="grid grid-cols-3 gap-5 ml-5 list-decimal text-center">
        <li className="relative cursor-pointer">
          <Link href={"google.com"} target="_blank" className="relative underline px-2 py-2 bg-white hover:text-red-500">Hover over me</Link>
        </li>
        <li>

          <span
            className="relative block h-full w-full text-sm uppercase tracking-wide text-[rgb(0,0,0,65%)] dark:font-light dark:text-[rgb(255,255,255,90%)]"
            style={{
              maskImage:
                "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
            }}
          >
            Hello
          </span>
          <span
            style={{
              mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
              maskComposite: "exclude",
            }}
            className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
          ></span>
        </li>
        <li>Button</li>
        <li>Button</li>
        <li>Button</li>
        <li>Button</li>
        <li>Button</li>
        <li>Button</li>
        <li>Button</li>
        <li>Button</li>
      </ol>
    </main>
  )
}
