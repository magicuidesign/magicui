import BoxReveal from "@/registry/components/magicui/box-reveal";

import { Button } from "@/components/ui/button";

export default async function BoxRevealDemo() {
  return (
    <div className = "h-full w-full max-w-[32rem] items-center justify-center overflow-hidden pt-8">
        <BoxReveal boxColor = { "#5046e6" } duration = { 0.5 }>
          <p className = "text-[3.5rem] font-semibold">
            Magic UI<span className = "text-[#5046e6]">.</span>
          </p>
        </BoxReveal>
        
        <BoxReveal boxColor = { "#5046e6"}  duration = { 0.5 }>
            <h2 className = "text-[1rem] mt-[.5rem]">
                UI library for <span className = "text-[#5046e6]">Design Engineers</span>
            </h2>
        </BoxReveal>

        <BoxReveal boxColor = { "#5046e6" } duration = { 0.5 }>
          <div className = "mt-[1.5rem]">
            <p>
              -&gt; 20+ free and open-source animated components built with
                <span className = "text-[#5046e6] font-semibold"> React</span>,
                <span className = "text-[#5046e6] font-semibold"> Typescript</span>,
                <span className = "text-[#5046e6] font-semibold"> Tailwind CSS</span>, and
                <span className = "text-[#5046e6] font-semibold"> Framer Motion</span>. <br /> 
              -&gt; 100% open-source, and customizable. <br />
            </p>
          </div>
        </BoxReveal>

        <BoxReveal boxColor = { "#5046e6" } duration = { 0.5 }>
          
          <Button className = "bg-[#5046e6] mt-[1.6rem]">Explore</Button>
        
        </BoxReveal>
    </div>
  );
}
