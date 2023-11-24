import Faq from "@/components/pricing/faq";
import { absoluteUrl, constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Frequently Asked Questions",
  description: "Frequently Asked Questions about Magic UI",
  image: absoluteUrl(`/api/og`),
});

export default function FAQS() {
  return <Faq />;
}
