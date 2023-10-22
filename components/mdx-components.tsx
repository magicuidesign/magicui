import { cn } from "@/lib/utils";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import Link from "next/link";
import { ComponentPreview } from "./component-preview";
import { ComponentSource } from "./component-source";
import { CopyButton } from "./copy-button";

const CustomLink = (props: any) => {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link {...props} href={href}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const components = {
  a: CustomLink,
  Image,
  ComponentPreview,
  ComponentSource: (props: any) => <ComponentSource {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("m-0 border-t p-0", className)} {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "whitespace-pre border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <div
      className={cn(
        "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  Steps: ({ ...props }) => (
    <div
      className="[&>div]:step mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  ),
  pre: ({
    className,
    __rawString__,
    // __npmCommand__,
    // __pnpmCommand__,
    // __yarnCommand__,
    __withMeta__,
    __src__,
    // __event__,
    // __style__,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & {
    // __style__?: Style["name"]
    __rawString__?: string;
    __withMeta__?: boolean;
    __src__?: string;
    // __event__?: Event["name"]
  }) => {
    return (
      <>
        <pre
          className={cn(
            "mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900",
            className,
          )}
          {...props}
        />
        {__rawString__ && (
          <CopyButton
            value={__rawString__}
            src={__src__}
            // event={__event__}
            className={cn("absolute right-4 top-4", __withMeta__ && "top-16")}
          />
        )}
        {/* {__npmCommand__ && __yarnCommand__ && __pnpmCommand__ && (
          <CopyNpmCommandButton
            commands={{
              __npmCommand__,
              __pnpmCommand__,
              __yarnCommand__,
            }}
            className={cn("absolute right-4 top-4", __withMeta__ && "top-16")}
          />
        )} */}
      </>
    );
  },
};

interface MDXProps {
  code: string;
}

export function Mdx({ code }: MDXProps) {
  const Component = useMDXComponent(code);

  return (
    <article
      className={cn(
        `leading-tighter prose prose-gray tracking-tighter dark:prose-invert`,
        // `md:prose-lg lg:prose-xl`,

        // no underline on links
        `prose-a:no-underline`,
        // `prose-a:transition-colors prose-a:duration-200 prose-a:ease-out`,
        // `dark:prose-a:text-gray-200 prose-a:underline-offset-4 dark:hover:prose-a:text-gray-700 prose-a:font-semibold hover:prose-a:text-gray-400`,
        // `prose-pre:bg-gray-900 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:border prose-pre:px-0 `,
        `prose-pre:mb-4 prose-pre:mt-6 prose-pre:max-h-[650px] prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:border prose-pre:bg-gray-900 prose-pre:px-0 prose-pre:py-4 prose-pre:text-xs prose-pre:tracking-tighter prose-pre:dark:bg-gray-900 md:prose-pre:text-sm`,
      )}
    >
      {/* @ts-ignore */}
      <Component components={components} />
    </article>
  );
}
