import { BentoCard, BentoGrid } from "@/registry/components/magicui/bento-grid";
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    span: "row-start-1 row-end-4 col-start-2 col-end-3",
    href: "/",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
  },
  {
    Icon: InputIcon,
    name: "Full text search",
    description: "Search through all your files in one place.",
    span: "col-start-1 col-end-2 row-start-1 row-end-3",
    href: "/",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    span: "col-start-1 col-end-2 row-start-3 row-end-4",
    href: "/",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    span: "col-start-3 col-end-3 row-start-1 row-end-2",
    href: "/",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description:
      "Get notified when someone shares a file or mentions you in a comment.",
    span: "col-start-3 col-end-3 row-start-2 row-end-4",
    href: "/",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
  },
];

export default async function BentoDemo() {
  return (
    <BentoGrid className="grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
