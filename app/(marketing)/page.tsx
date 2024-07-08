import ComponentDemos from "@/components/sections/component-demos";
import Hero from "@/components/sections/hero";
import Showcase from "@/components/sections/showcase";
import Testimonials from "@/components/sections/testimonials";

export default async function Home() {
  return (
    <>
      <Hero />
      <Showcase />
      <ComponentDemos />
      <Testimonials />
    </>
  );
}
