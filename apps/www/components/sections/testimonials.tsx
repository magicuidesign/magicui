import Link from "next/link"
import { ArrowTopRightIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { getTweet } from "react-tweet/api"

import { cn } from "@/lib/utils"
import { TestimonialsMore } from "@/components/sections/testimonials-more"
import { AvatarCircles } from "@/registry/magicui/avatar-circles"
import { BorderBeam } from "@/registry/magicui/border-beam"
import { DotPattern } from "@/registry/magicui/dot-pattern"
import { NumberTicker } from "@/registry/magicui/number-ticker"
import { Pointer } from "@/registry/magicui/pointer"
import { TweetCard } from "@/registry/magicui/tweet-card"

// The first nine are always shown, in layout order: three left, the
// featured one, one below it, four right. The rest sit behind "Show more",
// which only exists from md up.
const allTweets = [
  "https://x.com/chronark_/status/1754781648262967323",
  "https://x.com/DmytroKrasun/status/1793642777873633543",
  "https://x.com/steventey/status/1722659583464968612",
  "https://x.com/mckaywrigley/status/1831098800351719924",
  "https://x.com/rauchg/status/1867249854613008822",
  "https://x.com/hailsxr/status/1853552782076477578",
  "https://x.com/avansteenweghen/status/1783271768138146086",
  "https://x.com/mckaywrigley/status/1831185841051590857",
  "https://x.com/aidenybai/status/1793403298843869672",
  "https://x.com/faris_shaikh247/status/1989028526478315611",
  "https://x.com/xhxaidi/status/2083772906820256135",
  "https://x.com/iagooar/status/1969617898202415156",
  "https://x.com/ChiragAsarpota/status/1989652816680612291",
  "https://x.com/phuctm97/status/1793443202592288914",
  "https://x.com/RayFernando1337/status/1821208623638573211",
  "https://x.com/SullyOmarr/status/1668506160620769280",
  "https://x.com/vahaah/status/1878800566144708650",
  "https://x.com/MarcKlingen/status/1793422145399455746",
  "https://x.com/jordanphughes/status/1794287517430415390",
  "https://x.com/jordienr/status/1681389309037772820",
  "https://x.com/karmpat72748262/status/1889758543840002457",
  "https://x.com/WhopIO/status/1722690049374830639",
  "https://x.com/taishik_/status/1668510585926066176",
  "https://x.com/sup_nim/status/1668525144409624578",
  "https://x.com/saporito_eth/status/1801445101786304799",
  "https://x.com/JakeDuth/status/1668442365625790465",
  "https://x.com/0xRaduan/status/1668557577985179648",
  "https://x.com/yazinsai/status/1668617800934641672",
  "https://x.com/wes_walke/status/1668612106696941570",
  "https://x.com/beneverman/status/1681477151042797568",
  "https://x.com/DevAlien/status/1668618017528479745",
  "https://x.com/fredmaiaarantes/status/1684676668445622272",
  "https://x.com/DesignSumu/status/1668559314272022528",
  "https://x.com/commandodev/status/1668640878225764354",
  "https://x.com/SandBoxSo/status/1668570645741948930",
  "https://x.com/sxndrao/status/1668634137547399168",
  "https://x.com/sameerposwal03/status/1862084069833797788",
  "https://x.com/eersnington/status/1854657826011967597",
  "https://x.com/fardeen14693425/status/1857782464673923476",
  "https://x.com/Md_Sadiq_Md/status/1858221399959359566",
  "https://x.com/AwesomAmri/status/1668432554842619906",
  "https://x.com/lizhagearty/status/1835827024981541193",
  "https://x.com/namyakhann/status/1793412434121949344",
  //"https://x.com/sphinxsaas/status/1879233539109216723",
  // "https://x.com/chronark_/status/1779077288329433146",
  // "https://x.com/_raoufai/status/1850950163051024470",
  // "https://x.com/taishik_/status/1875316979831337058",
  // "https://x.com/rauchg/status/1803626308720796147",
  // "https://x.com/dillionverma/status/1879324180598165702",
  // "https://x.com/Star_Knight12/status/1861814034363981989",
  // "https://x.com/mohamedzamakhan/status/1859810055924895904",
  // "https://x.com/DutchEngIishman/status/1795888864202043645",
].map((t) => t.split("/").slice(-1)[0])

function Tweet({ id, className }: { id: string; className?: string }) {
  return (
    <div className={cn("group/tweet relative flex grow flex-col", className)}>
      <TweetCard
        id={id}
        logo="x"
        className="border-border bg-card group-hover/tweet:border-foreground/30 max-w-none grow rounded-xl border transition-colors [&_a]:relative [&_a]:z-20 [&_video]:max-h-64 [&_video]:w-full [&_video]:object-cover"
      />
      <a
        data-card-link
        href={`https://x.com/i/status/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10 cursor-none rounded-xl"
      >
        <span className="sr-only">View post on X</span>
      </a>
      <Pointer>
        <div className="bg-foreground text-background hidden -translate-x-1/2 translate-y-3 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap shadow-lg [@media(hover:hover)]:group-has-[[data-card-link]:hover]/tweet:flex">
          View post
          <ArrowTopRightIcon className="size-3.5" />
        </div>
      </Pointer>
    </div>
  )
}

const xMentions = 1300

async function Stats() {
  const tweets = await Promise.all(
    allTweets.slice(0, 5).map((id) => getTweet(id).catch(() => undefined))
  )
  const avatars = tweets.flatMap((tweet) =>
    tweet
      ? [
          {
            imageUrl: tweet.user.profile_image_url_https,
            profileUrl: `https://x.com/${tweet.user.screen_name}`,
          },
        ]
      : []
  )
  return (
    <div className="bg-card relative flex grow flex-col justify-between gap-6 overflow-hidden rounded-xl border p-6">
      <DotPattern
        width={16}
        height={16}
        cr={1}
        className="text-foreground/15 [mask-image:radial-gradient(260px_circle_at_top_right,white,transparent)]"
      />
      <div className="relative">
        <div className="text-foreground text-6xl font-semibold tracking-tighter">
          <NumberTicker value={xMentions} />+
        </div>
        <p className="text-muted-foreground mt-2 text-sm">
          posts about Magic UI on X.
        </p>
      </div>
      <AvatarCircles className="relative" avatarUrls={avatars} />
    </div>
  )
}

export function Testimonials() {
  const [featured, below] = allTweets.slice(3, 5)
  return (
    <section id="testimonials" className="py-10 md:py-14">
      <div className="container mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-foreground text-3xl leading-[1.2] font-semibold tracking-tighter md:text-4xl">
            Loved by the community
          </h2>
          <p className="text-muted-foreground mt-1 text-base tracking-tight">
            What people are saying on X.
          </p>
        </div>
        <Link
          href="https://x.com/magicuidesign"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/80 hover:text-foreground group inline-flex items-center gap-1 text-sm font-medium"
        >
          Follow on X
          <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="container">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Stats />
            {allTweets.slice(0, 3).map((id, index) => (
              <Tweet
                key={id}
                id={id}
                className={index > 0 ? "max-md:hidden" : undefined}
              />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative flex grow flex-col overflow-hidden rounded-xl">
              <Tweet id={featured} />
              <BorderBeam size={180} duration={8} />
            </div>
            <Tweet id={below} />
          </div>
          <div className="flex flex-col gap-4 max-md:hidden md:col-span-2 md:grid md:grid-cols-2 lg:col-span-1 lg:flex">
            {allTweets.slice(5, 9).map((id) => (
              <Tweet key={id} id={id} />
            ))}
          </div>
        </div>
        <TestimonialsMore>
          <div className="columns-2 gap-4 lg:columns-3">
            {allTweets.slice(9).map((id) => (
              <Tweet key={id} id={id} className="mb-4 break-inside-avoid" />
            ))}
          </div>
        </TestimonialsMore>
      </div>
    </section>
  )
}
