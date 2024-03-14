import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "bg-cyan-600/20 px-1 py-0.5 font-bold text-cyan-600 dark:bg-cyan-600/20 dark:text-cyan-600",
        className,
      )}
    >
      {children}
    </span>
  );
};

export interface TestimonialCardProps {
  name: string;
  role: string;
  description: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const TestimonialCard = ({
  description,
  name,

  role,
  className,
  ...props // Capture the rest of the props
}: TestimonialCardProps) => (
  <div
    className={cn(
      "flex h-96 w-72 shrink-0 cursor-pointer snap-center snap-always flex-col justify-between rounded-xl border border-neutral-200 bg-white p-4 shadow-xl shadow-black/[0.1] md:h-96 md:min-w-96",
      className,
    )}
    {...props} // Spread the rest of the props here
  >
    <div className="select-none font-normal text-neutral-700">
      {description}
    </div>

    <div className="select-none">
      <div className="flex flex-row py-1">
        <StarIcon className="size-4 text-yellow-300" />
        <StarIcon className="size-4 text-yellow-300" />
        <StarIcon className="size-4 text-yellow-300" />
        <StarIcon className="size-4 text-yellow-300" />
        <StarIcon className="size-4 text-yellow-300" />
      </div>
      <p className="font-medium text-neutral-500">{name}</p>
      <p className="font-normal text-neutral-400">{role}</p>
    </div>
  </div>
);

const CARDS = [
  {
    name: "John Doe",
    role: "Product Manager at Acme Corp",
    description: (
      <p>
        Very impressed with #SectaLabs headshots. After trying many services I
        decided to try them.
        <Highlight>They provided the best results by far!</Highlight> If you're
        looking for headshots, give them a try.
      </p>
    ),
  },
  {
    name: "John Doe",
    role: "Product Manager at Acme Corp",
    description: (
      <p>
        Very impressed with #SectaLabs headshots. After trying many services I
        decided to try them.
        <Highlight>They provided the best results by far!</Highlight> If you're
        looking for headshots, give them a try.
      </p>
    ),
  },
  {
    name: "John Doe",
    role: "Product Manager at Acme Corp",
    description: (
      <p>
        Very impressed with #SectaLabs headshots. After trying many services I
        decided to try them.
        <Highlight>They provided the best results by far!</Highlight> If you're
        looking for headshots, give them a try.
      </p>
    ),
  },
  {
    name: "John Doe",
    role: "Product Manager at Acme Corp",
    description: (
      <p>
        Very impressed with #SectaLabs headshots. After trying many services I
        decided to try them.
        <Highlight>They provided the best results by far!</Highlight> If you're
        looking for headshots, give them a try.
      </p>
    ),
  },
  {
    name: "John Doe",
    role: "Product Manager at Acme Corp",
    description: (
      <p>
        Very impressed with #SectaLabs headshots. After trying many services I
        decided to try them.
        <Highlight>They provided the best results by far!</Highlight> If you're
        looking for headshots, give them a try.
      </p>
    ),
  },
];

export default function Testimonial2() {
  return (
    <section id="testimonial">
      <div className="py-14">
        <div className="mx-auto md:container md:px-8">
          <h3 className="text-center text-sm font-semibold text-gray-600">
            TESTIMONIALS
          </h3>
          <div className="relative mx-auto mt-6 max-w-[100vw] overflow-hidden">
            <div className="no-scrollbar flex w-full snap-x snap-mandatory flex-row gap-6 overflow-x-auto py-14">
              {/* Empty placeholder  */}
              <div className="size-72 shrink-0 md:h-60 md:min-w-96"></div>
              {CARDS.map((card, idx) => (
                <TestimonialCard {...card} key={idx} />
              ))}
              {/* Empty placeholder  */}
              <div className="size-72 shrink-0 md:h-60 md:min-w-96"></div>
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 hidden h-full w-1/5 bg-gradient-to-r from-background md:block"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-1/5 bg-gradient-to-l from-background md:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
