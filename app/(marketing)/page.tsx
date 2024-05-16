import CTASection from "@/components/landing/cta-section";
import Hero from "@/components/landing/hero";
import Testimonials from "@/components/landing/testimonials";

export default async function Home() {
  return (
    <>
      <Hero />
      <Testimonials />
      <CTASection />
    </>
  );
}
