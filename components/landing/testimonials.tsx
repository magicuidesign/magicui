import FadeIn from "@/registry/components/magicui/fade-in";
import Marquee from "@/registry/components/magicui/marquee";
import { ServerTweetCard } from "@/registry/components/magicui/tweet-card";
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
  "",
].map((t) => t.split("/").slice(-1)[0]);

async function getTweets() {
  try {
    const tweets = await Promise.all(
      tweetUrls.map(async (id) => {
        const tweet = await getTweet(id);
        return tweet;
      }),
    );
    return tweets.length ? { props: { tweets } } : { notFound: true };
  } catch (error) {
    return { notFound: true };
  }
}

export default async function Testimonials() {
  const { props } = await getTweets();
  const firstRow = props?.tweets?.slice(0, props?.tweets?.length / 2);
  const secondRow = props?.tweets?.slice(props?.tweets?.length / 2);

  return (
    <section className="relative flex flex-col gap-4 pb-8 pt-20 md:pb-12">
      <Marquee className="max-w-screen [--duration:120s]" pauseOnHover>
        {firstRow?.map((data, idx) => (
          <FadeIn delay={0.06 + idx * 0.04}>
            <ServerTweetCard
              tweet={data}
              key={idx}
              className="h-36 w-72 min-w-[18rem]"
            />
          </FadeIn>
        ))}
      </Marquee>
      <Marquee className="max-w-screen [--duration:120s]" reverse pauseOnHover>
        {secondRow?.map((data, idx) => (
          <FadeIn delay={0.06 + 0.04 * (secondRow.length - idx)}>
            <ServerTweetCard
              tweet={data}
              key={idx}
              className="h-36 w-72 min-w-[18rem]"
            />
          </FadeIn>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 h-full  w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </section>
  );
}
