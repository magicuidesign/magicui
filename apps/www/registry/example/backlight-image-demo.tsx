import { Backlight } from "@/registry/magicui/backlight"

export default function BacklightImageDemo() {
  return (
    <Backlight className="w-full">
      <img
        className="mx-auto h-auto w-full max-w-lg rounded-xl"
        src={
          "https://plus.unsplash.com/premium_photo-1672201106204-58e9af7a2888?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="fancy gradient background"
      />
    </Backlight>
  )
}
