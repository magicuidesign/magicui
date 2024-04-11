import Hero from "@/components/landing/hero";
import Faq from "@/components/pricing/faq";
import Pricing from "@/components/pricing/pricing";
import Testimonials from "@/components/pricing/testimonials";

export default async function Home() {
  return (
    <>
      <Hero />
      {/* <WhatIsMagicUI /> */}
      <Testimonials />
      {/* <FeatureGrid /> */}
      {/* <FeatureSections /> */}
      {/* <ChangelogSection /> */}
      <Pricing />
      <Faq />
    </>
  );
}
