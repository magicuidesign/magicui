import { cn } from "@/lib/utils";
import { StarFilledIcon } from "@radix-ui/react-icons";

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
        "bg-cyan-600/20 p-1 py-0.5 font-bold text-cyan-600 dark:bg-cyan-600/20 dark:text-cyan-600",
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
      "flex h-64 w-72 shrink-0 cursor-pointer snap-center snap-always flex-col justify-between rounded-xl p-4 shadow-xl shadow-black/[0.1] lg:min-w-96",
      // light styles
      " border border-neutral-200 bg-white",
      // dark styles
      "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
    {...props} // Spread the rest of the props here
  >
    <div className="select-none font-normal text-neutral-700 dark:text-neutral-400">
      {description}
    </div>

    <div className="select-none">
      <div className="flex flex-row py-1">
        <StarFilledIcon className="size-4 text-yellow-500" />
        <StarFilledIcon className="size-4 text-yellow-500" />
        <StarFilledIcon className="size-4 text-yellow-500" />
        <StarFilledIcon className="size-4 text-yellow-500" />
        <StarFilledIcon className="size-4 text-yellow-500" />
      </div>
      <p className="font-medium text-neutral-500">{name}</p>
      <p className="text-sm font-normal text-neutral-400">{role}</p>
    </div>
  </div>
);

const testimonials = [
  {
    name: "Alex Rivera",
    role: "CTO at InnovateTech",
    description: (
      <p>
        The AI-driven analytics from #QuantumInsights have revolutionized our
        product development cycle.
        <Highlight>
          Insights are now more accurate and faster than ever.
        </Highlight>{" "}
        A game-changer for tech companies.
      </p>
    ),
  },
  {
    name: "Samantha Lee",
    role: "Marketing Director at NextGen Solutions",
    description: (
      <p>
        Implementing #AIStream's customer prediction model has drastically
        improved our targeting strategy.
        <Highlight>Seeing a 50% increase in conversion rates!</Highlight> Highly
        recommend their solutions.
      </p>
    ),
  },
  {
    name: "Raj Patel",
    role: "Founder & CEO at StartUp Grid",
    description: (
      <p>
        As a startup, we need to move fast and stay ahead. #CodeAI's automated
        coding assistant helps us do just that.
        <Highlight>Our development speed has doubled.</Highlight> Essential tool
        for any startup.
      </p>
    ),
  },
  {
    name: "Emily Chen",
    role: "Product Manager at Digital Wave",
    description: (
      <p>
        #VoiceGen's AI-driven voice synthesis has made creating global products
        a breeze.
        <Highlight>Localization is now seamless and efficient.</Highlight> A
        must-have for global product teams.
      </p>
    ),
  },
  {
    name: "Michael Brown",
    role: "Data Scientist at FinTech Innovations",
    description: (
      <p>
        Leveraging #DataCrunch's AI for our financial models has given us an
        edge in predictive accuracy.
        <Highlight>
          Our investment strategies are now powered by real-time data analytics.
        </Highlight>{" "}
        Transformative for the finance industry.
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
            <div
              className={cn(
                "flex w-full snap-x snap-mandatory flex-row gap-6 overflow-x-auto py-14",

                // no scrollbar
                "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              )}
            >
              {/* Empty placeholder  */}
              <div className="size-72 shrink-0 md:h-60 md:min-w-96"></div>
              {testimonials.map((card, idx) => (
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
