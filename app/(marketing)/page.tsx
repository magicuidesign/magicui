import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import FadeIn from "@/registry/components/magicui/fade-in";
import Marquee from "@/registry/components/magicui/marquee";
import { ServerTweetCard } from "@/registry/components/magicui/tweet-card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { CSSProperties } from "react";
import { getTweet } from "react-tweet/api";

const tweetUrls = [
  "https://twitter.com/pkp_io/status/1684561895481802753",
  "https://twitter.com/devcagatay/status/1684573935466328065",
  "https://twitter.com/KanishkKhurana_/status/1684613797984800768",
  "https://twitter.com/AwesomAmri/status/1668432554842619906",
  "https://twitter.com/taishik_/status/1668510585926066176",
  "https://twitter.com/SullyOmarr/status/1668506160620769280",
  "https://twitter.com/sup_nim/status/1668525144409624578",
  "https://twitter.com/JakeDuth/status/1668442365625790465",
  "https://twitter.com/0xRaduan/status/1668557577985179648",
  "https://twitter.com/yazinsai/status/1668617800934641672",
  "https://twitter.com/wes_walke/status/1668612106696941570",
  "https://twitter.com/DevAlien/status/1668618017528479745",
  "https://twitter.com/fredmaiaarantes/status/1684676668445622272",
  "https://twitter.com/DesignSumu/status/1668559314272022528",
  "https://twitter.com/commandodev/status/1668640878225764354",
  "https://twitter.com/SandBoxSo/status/1668570645741948930",
  "https://twitter.com/sxndrao/status/1668634137547399168",
  "https://twitter.com/jordienr/status/1681389309037772820",
  "https://twitter.com/beneverman/status/1681477151042797568",
].map((t) => t.split("/").slice(-1)[0]);

async function getTweets() {
  try {
    const tweets = await Promise.all(
      tweetUrls.map(async (id) => {
        const tweet = await getTweet(id);
        return tweet;
      })
    );
    return tweets.length ? { props: { tweets } } : { notFound: true };
  } catch (error) {
    return { notFound: true };
  }
}

export default async function Home() {
  const { props } = await getTweets();
  const firstRow = props?.tweets?.slice(0, props?.tweets?.length / 2);
  const secondRow = props?.tweets?.slice(props?.tweets?.length / 2);

  return (
    <>
      <section className="space-y-6 pb-8 pt-20 md:pb-12">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <FadeIn className="z-10 flex flex-col items-center justify-center w-full h-full">
            <Link
              href="/components/marquee"
              className={cn(
                "flex justify-center items-center flex-row",
                "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f]",
                "transition-shadow hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ease-out duration-500",
                "relative after:block after:w-full after:h-full after:absolute after:inset-0 after:p-[1px] after:[border-radius:inherit] after:bg-gradient-to-r after:from-[#ffaa40]/50 after:via-[#9c40ff]/50 after:to-[#ffaa40]/50 after:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] after:content-[''] after:[mask-composite:xor]",
                "after:animate-gradient after:bg-[length:var(--bg-size)_100%]"
              )}
              style={
                {
                  "--bg-size": "300%",
                } as CSSProperties
              }
            >
              {/* <Twitter className="h-4 w-4 mr-2 inline-block" />
              <div
                className={cn(
                  `bg-clip-text text-transparent bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] animate-gradient bg-[length:var(--bg-size)_100%]`
                )}
              >
                Follow along on Twitter
              </div> */}
              🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
              {/* <span className="sm:hidden">Style, a new CLI and more.</span> */}
              <span
                className={cn(
                  `bg-clip-text text-transparent bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] animate-gradient bg-[length:var(--bg-size)_100%]`,
                  `inline`
                )}
              >
                Introducing Marquee
              </span>
              <ChevronRight className="ml-1 h-4 w-4 text-gray-500" />
            </Link>
          </FadeIn>
          <FadeIn
            // delay={0.0}
            className="z-10 flex flex-col items-center justify-center w-full h-full"
          >
            <h1 className="font-medium text-5xl sm:text-6xl md:text-7xl lg:text-9xl tracking-tight">
              Create Magical <br /> Landing Pages
            </h1>
          </FadeIn>
          <FadeIn
            className="z-10 flex flex-col items-center justify-center w-full h-full"
            delay={0.1}
          >
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Magic UI is a curated collection of React + Tailwind CSS + Framer
              Motion components
            </p>
          </FadeIn>
          <FadeIn
            className="z-10 flex flex-col items-center justify-center w-full h-full"
            delay={0.2}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <Link href="/buy" className={cn(buttonVariants({ size: "lg" }))}>
                Buy Now
              </Link>
              <Link
                href="/components"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" })
                )}
              >
                Get Started
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative flex flex-col gap-4 pb-8 pt-20 md:pb-12">
        <Marquee pauseOnHover className="[--duration:120s]">
          {firstRow?.map((data, idx) => (
            <FadeIn delay={0.2 + idx * 0.15}>
              <ServerTweetCard
                tweet={data}
                key={idx}
                className="w-72 min-w-[18rem] h-36"
              />
            </FadeIn>
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:120s]">
          {secondRow?.map((data, idx) => (
            <FadeIn delay={0.2 + idx * 0.15}>
              <ServerTweetCard
                tweet={data}
                key={idx}
                className="w-72 min-w-[18rem] h-36"
              />
            </FadeIn>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r dark:from-background from-white"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 h-full  w-1/3 bg-gradient-to-l dark:from-background from-white"></div>
      </section>
    </>
  );
}
