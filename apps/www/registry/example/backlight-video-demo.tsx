import Backlight from "@/registry/magicui/backlight"

export default function BacklightVideoDemo() {
  return (
    <Backlight blur={40}>
      <iframe
        className="block aspect-video max-w-lg rounded-xl"
        width="512"
        height="288"
        src="https://www.youtube.com/embed/qxzbh6vPRZg?&autoplay=1"
        title="Gradient Loop Background"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </Backlight>
  )
}
