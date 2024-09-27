import Marquee from "@/registry/default/magicui/marquee";
import TweetCard from "@/registry/default/magicui/tweet-card";

const tweets = [
  "https://x.com/chronark_/status/1754781648262967323",
  "https://x.com/pkp_io/status/1684561895481802753",
  "https://x.com/devcagatay/status/1684573935466328065",
  "https://x.com/KanishkKhurana_/status/1684613797984800768",
  "https://x.com/WhopIO/status/1722690049374830639",
  "https://x.com/steventey/status/1722659583464968612",
  "https://x.com/AwesomAmri/status/1668432554842619906",
  "https://x.com/taishik_/status/1668510585926066176",
  "https://x.com/SullyOmarr/status/1668506160620769280",
  "https://x.com/sup_nim/status/1668525144409624578",
  "https://x.com/JakeDuth/status/1668442365625790465",
  "https://x.com/0xRaduan/status/1668557577985179648",
  "https://x.com/yazinsai/status/1668617800934641672",

  "https://x.com/wes_walke/status/1668612106696941570",
  "https://x.com/DevAlien/status/1668618017528479745",
  "https://x.com/fredmaiaarantes/status/1684676668445622272",
  "https://x.com/DesignSumu/status/1668559314272022528",
  "https://x.com/commandodev/status/1668640878225764354",
  "https://x.com/SandBoxSo/status/1668570645741948930",
  "https://x.com/sxndrao/status/1668634137547399168",
  "https://x.com/jordienr/status/1681389309037772820",
  "https://x.com/beneverman/status/1681477151042797568",
].map((t) => t.split("/").slice(-1)[0]);

export default async function Testimonials() {
  const firstRow = tweets.slice(0, tweets.length / 2);
  const secondRow = tweets.slice(tweets.length / 2);

  return (
    <section id="testimonials" className="container py-14">
      <h2 className="mb-4 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
        What People Are Saying
      </h2>
      <h3 className="mx-auto mb-8 max-w-lg text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
        Don&apos;t just take our word for it. Here&apos;s what{" "}
        <strong>real people</strong> are saying about Magic UI on Twitter.
      </h3>
      <div className="relative flex flex-col">
        <Marquee className="max-w-screen [--duration:120s]" pauseOnHover>
          {firstRow.map((id, idx) => (
            <TweetCard id={id} className="max-h-32 w-72 min-w-72" key={idx} />
          ))}
        </Marquee>
        <Marquee
          className="max-w-screen [--duration:120s]"
          reverse
          pauseOnHover
        >
          {secondRow.map((id, idx) => (
            <TweetCard id={id} className="max-h-32 w-72 min-w-72" key={idx} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 h-full  w-1/3 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
}
