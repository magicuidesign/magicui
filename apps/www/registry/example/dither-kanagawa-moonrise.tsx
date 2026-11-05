import { Dither } from "@/registry/magicui/dither"

export default function DitherKanagawaMoonrise() {
  return (
    <Dither
      pattern="kanagawa-moonrise"
      className="h-96 w-full max-w-2xl rounded-xl border p-6 text-[#dcd7ba] select-none md:p-10"
    >
      <figure className="max-w-sm">
        <blockquote className="text-xl leading-snug font-medium text-balance md:text-2xl">
          “We moved the whole company over a weekend. Monday felt like nothing
          had changed.”
        </blockquote>
        <figcaption className="mt-4 text-sm text-[#c8c093]">
          Mira Tanaka, Head of Platform
        </figcaption>
      </figure>
    </Dither>
  )
}
