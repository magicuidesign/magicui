import { Backlight } from "@/registry/magicui/backlight"

export default function BacklightVideoDemo() {
  return (
    <Backlight blur={40} className="w-full">
      <iframe
        className="mx-auto aspect-video w-full max-w-lg"
        src="https://www.youtube.com/embed/9CJLtzzUphU"
        title="Gradient Loop Background"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </Backlight>
  )
}
