import { CheckCircleIcon, InfoIcon, TriangleAlertIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { GlareHover } from "@/registry/magicui/glare-hover"

export default function Alerts() {
  return (
    <div className="flex flex-col gap-3">
      <GlareHover className="rounded-lg" duration={550} opacity={0.25}>
        <Alert className="[&>svg~*]:pl-10">
          <InfoIcon />
          <AlertTitle>Action required</AlertTitle>
          <AlertDescription>
            Your plan expires in 3 days. Renew to keep access.
          </AlertDescription>
        </Alert>
      </GlareHover>

      <GlareHover
        className="w-full rounded-lg"
        color="#ff6070"
        opacity={0.25}
        duration={550}
      >
        <Alert variant="destructive" className="bg-background [&>svg~*]:pl-10">
          <TriangleAlertIcon />
          <AlertTitle>Payment declined</AlertTitle>
          <AlertDescription>
            Check your card details and try again.
          </AlertDescription>
        </Alert>
      </GlareHover>

      <GlareHover
        className="w-full rounded-lg"
        color="#60ff70"
        opacity={0.25}
        duration={550}
      >
        <Alert className="[&>svg~*]:pl-10">
          <CheckCircleIcon className="stroke-emerald-500" />
          <AlertTitle className="text-emerald-500">
            Subscription confirmed
          </AlertTitle>
          <AlertDescription className="text-emerald-500">
            You have full Pro access until April 5, 2027.
          </AlertDescription>
        </Alert>
      </GlareHover>
    </div>
  )
}
