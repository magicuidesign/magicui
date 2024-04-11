import Faq from "@/components/pricing/faq";
import Pricing from "@/components/pricing/pricing";
import Testimonials from "@/components/pricing/testimonials";
import { absoluteUrl, constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Lifetime Access to Beautifully Crafted Tailwind CSS Components",
  description:
    "Get lifetime access to beautifully crafted React + Tailwind CSS + Framer Motion components and templates for your next web project. Get lifetime access to all components and templates",
  image: absoluteUrl(`/api/og`),
});

export default function PricingPage() {
  return (
    <div className="relative">
      <div
        className={`absolute inset-0 -z-10 m-auto h-full max-h-[800px] w-full max-w-[800px] rounded-full opacity-20 blur-[150px]`}
        style={{
          background:
            "linear-gradient(180deg, #9E7AFF 0%,#FE8BBB 33.33%,#FFBD7A 66.67%,#F8EAC3 100%)",
        }}
      ></div>
      <Pricing />
      <Testimonials />
      <Faq />
    </div>
  );
}
