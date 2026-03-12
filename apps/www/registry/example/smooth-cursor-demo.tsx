import { SmoothCursor } from "@/registry/magicui/smooth-cursor"

export default function SmoothCursorDemo() {
  return (
    <>
      <span className="hidden md:block">Move your mouse around</span>
      <span className="block md:hidden">
        SmoothCursor is disabled on touch devices
      </span>
      <SmoothCursor />
    </>
  )
}
