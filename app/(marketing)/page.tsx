import CTASection from "@/components/landing/cta-section";
import Hero from "@/components/landing/hero";
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
      {/* <Pricing /> */}
      {/* <Faq /> */}
      <CTASection />
    </>
  );
}
