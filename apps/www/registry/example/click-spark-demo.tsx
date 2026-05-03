import { Button } from "@/components/ui/button"
import ClickSpark from "@/registry/magicui/click-spark"

export default function ClickSparkDemo() {
  return (
    <div className="bg-background relative flex h-[350px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl">
      <ClickSpark
        sparkColor="#fff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <Button variant="secondary" className="px-8 py-6 text-lg font-semibold">
          Click Me
        </Button>
      </ClickSpark>
    </div>
  )
}
