import { ExpandableMasonarySection } from "@/components/sections/expandable-masonary-section";
import { TweetCard } from "@/registry/magicui/tweet-card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const allTweets = [
  "https://x.com/steventey/status/1722659583464968612",
  "https://x.com/rauchg/status/1867249854613008822",
  "https://x.com/mckaywrigley/status/1831098800351719924",
  "https://x.com/chronark_/status/1754781648262967323",
  "https://x.com/aidenybai/status/1793403298843869672",
  "https://x.com/phuctm97/status/1793443202592288914",
  "https://x.com/RayFernando1337/status/1821208623638573211",
  "https://x.com/SullyOmarr/status/1668506160620769280",
  "https://x.com/vahaah/status/1878800566144708650",
  "https://x.com/DmytroKrasun/status/1793642777873633543",
  "https://x.com/MarcKlingen/status/1793422145399455746",
  "https://x.com/jordanphughes/status/1794287517430415390",
  "https://x.com/jordienr/status/1681389309037772820",
  "https://x.com/mckaywrigley/status/1831185841051590857",
  "https://x.com/karmpat72748262/status/1889758543840002457",
  "https://x.com/WhopIO/status/1722690049374830639",
  "https://x.com/hailsxr/status/1853552782076477578",
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
  "https://x.com/sphinxsaas/status/1879233539109216723",
  "https://x.com/AwesomAmri/status/1668432554842619906",
  "https://x.com/avansteenweghen/status/1783271768138146086",
  "https://x.com/lizhagearty/status/1835827024981541193",
  "https://x.com/namyakhann/status/1793412434121949344",
  // "https://x.com/chronark_/status/1779077288329433146",
  // "https://x.com/_raoufai/status/1850950163051024470",
  // "https://x.com/taishik_/status/1875316979831337058",
  // "https://x.com/rauchg/status/1803626308720796147",
  // "https://x.com/dillionverma/status/1879324180598165702",
  // "https://x.com/Star_Knight12/status/1861814034363981989",
  // "https://x.com/mohamedzamakhan/status/1859810055924895904",
  // "https://x.com/DutchEngIishman/status/1795888864202043645",
].map((t) => t.split("/").slice(-1)[0]);

export default function Testimonials() {
  return (
    <section id="testimonials" className="container max-w-screen-xl py-14">
      <h2 className="mb-8 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
        What People Are Saying on Twitter
      </h2>
      <ExpandableMasonarySection>
        {allTweets.map((id) => (
          <Link
            href={`https://x.com/i/status/${id}`}
            key={id}
            className="group relative"
          >
            <TweetCard
              id={id}
              className="break-inside-avoid overflow-hidden rounded-lg bg-secondary shadow-sm"
            />
            <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/20 p-4 text-lg font-bold text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <span className="flex translate-y-[14px] items-center gap-2 transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                View Tweet
                <ArrowUpRight className="h-6 w-6" />
              </span>
            </span>
          </Link>
        ))}
      </ExpandableMasonarySection>
    </section>
  );
}
