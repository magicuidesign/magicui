import assets from "@/config/assets.json";
import Marquee from "@/registry/components/magicui/marquee";

export default function Press() {
  const halfIndex = Math.ceil(assets.press.length / 2);
  const firstRow = assets.press.slice(0, halfIndex);
  const secondRow = assets.press.slice(halfIndex);

  return (
    <section id="press">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-center text-sm font-semibold text-gray-600">
            FEATURED IN
          </h3>
          <div className="relative mt-6 overflow-hidden">
            <Marquee className="max-w-full [--duration:120s]">
              {firstRow.map((logo, idx) => (
                <img
                  key={idx}
                  src={`/assets/press/${logo}`}
                  className="h-10 w-40 px-2 transition duration-500 hover:opacity-100 hover:duration-200 dark:brightness-0 dark:invert"
                  alt={`logo-${logo}`}
                />
              ))}
            </Marquee>
            <Marquee className="max-w-full [--duration:120s]" reverse>
              {secondRow.map((logo, idx) => (
                <img
                  key={idx}
                  src={`/assets/press/${logo}`}
                  className="h-10 w-40 px-2 transition duration-500 hover:opacity-100 hover:duration-200 dark:brightness-0 dark:invert"
                  alt={`logo-${logo}`}
                />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
