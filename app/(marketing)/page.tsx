import Faq from "@/components/landing/faq";
import Hero from "@/components/landing/hero";
import Testimonials from "@/components/landing/testimonials";

export default async function Home() {
  return (
    <>
      <Hero />
      <Testimonials />
      <Faq />
    </>
  );
}
