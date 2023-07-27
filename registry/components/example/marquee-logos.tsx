import { cn } from "@/lib/utils";
import Marquee from "@/registry/components/magicui/marquee";

const logos = [
  {
    name: "Microsoft",
    img: "https://cdn.simpleicons.org/microsoft/000/fff",
  },
  {
    name: "Apple",
    img: "https://cdn.simpleicons.org/apple/000/fff",
  },
  {
    name: "Google",
    img: "https://cdn.simpleicons.org/google/000/fff",
  },
  {
    name: "Facebook",
    img: "https://cdn.simpleicons.org/facebook/000/fff",
  },
  {
    name: "LinkedIn",
    img: "https://cdn.simpleicons.org/linkedin/000/fff",
  },
  {
    name: "Twitter",
    img: "https://cdn.simpleicons.org/twitter/000/fff",
  },
];

const Logo = ({ name, img }: { name: string; img: string }) => {
  return (
    <div className={cn("h-12 w-12 cursor-pointer")}>
      <img src={img} alt={name} />
    </div>
  );
};

const MarqueeLogos = () => {
  return (
    <div className="border rounded-lg h-full w-full relative flex justify-center items-center bg-background overflow-hidden py-20 flex-col gap-4">
      <Marquee className="[--gap:3rem]">
        {logos.map((logo, idx) => (
          <Logo key={idx} {...logo} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r dark:from-gray-950 from-gray-50"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l dark:from-gray-950 from-gray-50"></div>
    </div>
  );
};

export default MarqueeLogos;
