import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/registry/magicui/scroll-based-velocity"

const IMAGES_ROW_A = [
  "https://images.unsplash.com/photo-1749738456487-2af715ab65ea?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1720139288219-e20aa9c8895b?q=80&w=1810&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

const IMAGES_ROW_B = [
  "https://images.unsplash.com/photo-1749738456487-2af715ab65ea?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1720139288219-e20aa9c8895b?q=80&w=1810&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

export default function ScrollBasedVelocityImagesDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
      <ScrollVelocityContainer className="w-full">
        <ScrollVelocityRow baseVelocity={6} direction={1} className="py-4">
          {IMAGES_ROW_A.map((src, idx) => (
            <img
              key={idx}
              src={`${src}&ixlib=rb-4.0.3`}
              alt="Unsplash sample"
              width={240}
              height={160}
              loading="lazy"
              decoding="async"
              className="mx-4 inline-block h-40 w-60 rounded-lg object-cover shadow-sm"
            />
          ))}
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={6} direction={-1} className="py-4">
          {IMAGES_ROW_B.map((src, idx) => (
            <img
              key={idx}
              src={`${src}&ixlib=rb-4.0.3`}
              alt="Unsplash sample"
              width={240}
              height={160}
              loading="lazy"
              decoding="async"
              className="mx-4 inline-block h-40 w-60 rounded-lg object-cover shadow-sm"
            />
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>

      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  )
}
