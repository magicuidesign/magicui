import Hero from "@/components/landing/hero";
import Testimonials from "@/components/landing/testimonials";
import Faq from "@/components/pricing/faq";

export default async function Home() {
  return (
    <>
      <Hero />
      {/* <WhatIsMagicUI /> */}
      <Testimonials />
      {/* <FeatureGrid /> */}
      {/* <FeatureSections /> */}
      {/* <ChangelogSection /> */}
      <Faq />
    </>
  );
}
