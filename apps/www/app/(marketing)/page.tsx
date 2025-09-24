import { Hero } from "@/components/sections/hero"
import { Showcase } from "@/components/sections/showcase"
import { Testimonials } from "@/components/sections/testimonials"
import { VideoTestimonials } from "@/components/sections/video-testimonials"

export default function Home() {
  return (
    <>
      <Hero />
      <Showcase />
      <Testimonials />
      <VideoTestimonials />
    </>
  )
}
