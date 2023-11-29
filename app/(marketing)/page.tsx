import Hero from "@/components/landing/hero";
import Testimonials from "@/components/landing/testimonials";
import Faq from "@/components/pricing/faq";

export default async function Home() {
  return (
    <>
      <Hero />
      <Testimonials />
      {/* <FeatureGrid /> */}
      {/* <FeatureSections /> */}
      <Faq />
    </>
  );
}
