import { rehypeComponent } from "@/lib/rehype-component";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { BlogPosting, WithContext } from "schema-dts";
import { visit } from "unist-util-visit";
import { defineCollection, defineConfig, s } from "velite";

const computedFields = <
  T extends {
    title: string;
    description: string;
    slug: string;
    date?: string;
    author?: string;
  },
>(
  data: T,
) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
  slug: data.slug.split("/").slice(1).join("/"),
  url: `/${data.slug}`,
  image: `${process.env.NEXT_PUBLIC_APP_URL}/api/og?title=${encodeURI(data.title)}`,
  structuredData: {
    "@context": "https://schema.org",
    "@type": `BlogPosting`,
    headline: data.title,
    datePublished: data.date,
    dateModified: data.date,
    description: data.description,
    image: `${process.env.NEXT_PUBLIC_APP_URL}/api/og?title=${encodeURI(data.title)}`,
    url: `https://magicui.design/${data.slug}`,
    author: {
      "@type": "Person",
      name: data.author,
      url: `https://twitter.com/${data.author}`,
    },
  } as WithContext<BlogPosting>,
});

const pages = defineCollection({
  name: "Page",
  pattern: "pages/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      description: s.string(),
      slug: s.path(),
      code: s.mdx(),
    })
    .transform(computedFields),
});

const docs = defineCollection({
  name: "Doc",
  pattern: "docs/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(99), // Zod primitive type
      description: s.string(),
      // slug: s.slug("docs"), // validate format, unique in posts collection
      slug: s.path(), // auto generate slug from file path
      date: s.isodate().optional(), // input Date-like string, output ISO Date string
      author: s.string().optional(),
      published: s.boolean().default(true),
      links: s
        .object({
          doc: s.string(),
          api: s.string(),
        })
        .optional(),
      featured: s.boolean().default(false),
      toc: s.boolean().default(true),
      video: s.file().optional(), // input file relative path, output file public path
      metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
      excerpt: s.excerpt(), // excerpt of markdown content
      content: s.markdown(), // transform markdown to html
      code: s.mdx(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: {
    docs,
    pages,
  },
  mdx: {
    rehypePlugins: [
      rehypeSlug as any,
      rehypeComponent,
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children;
            if (codeEl.tagName !== "code") {
              return;
            }
            if (codeEl.data?.meta) {
              // Extract event from meta and pass it down the tree.
              const regex = /event="([^"]*)"/;
              const match = codeEl.data?.meta.match(regex);
              if (match) {
                node.__event__ = match ? match[1] : null;
                codeEl.data.meta = codeEl.data.meta.replace(regex, "");
              }
            }
            node.__rawString__ = codeEl.children?.[0].value;
            node.__src__ = node.properties?.__src__;
            node.__style__ = node.properties?.__style__;
          }
        });
      },
      [
        rehypePrettyCode as any,
        {
          theme: "material-theme-palenight",
          //   light: "material-theme-lighter",
          // },
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          // keepBackground: true,
          onVisitHighlightedLine(node: any) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "div") {
            if (!("data-rehype-pretty-code-fragment" in node.properties)) {
              return;
            }
            const preElement = node.children.at(-1);
            if (preElement.tagName !== "pre") {
              return;
            }
            preElement.properties["__withMeta__"] =
              node.children.at(0).tagName === "div";
            preElement.properties["__rawString__"] = node.__rawString__;
            if (node.__src__) {
              preElement.properties["__src__"] = node.__src__;
            }
            if (node.__event__) {
              preElement.properties["__event__"] = node.__event__;
            }
            if (node.__style__) {
              preElement.properties["__style__"] = node.__style__;
            }
          }
        });
      },
      [
        rehypeAutolinkHeadings as any,
        {
          properties: {
            className: ["anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
