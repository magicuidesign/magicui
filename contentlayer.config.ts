// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { BlogPosting, WithContext } from "schema-dts";
import { visit } from "unist-util-visit";
import { env } from "./env.mjs";
import { rehypeComponent } from "./lib/rehype-component";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  url: {
    type: "string",
    resolve: (post: any) => `/${post._raw.flattenedPath}`,
  },
  image: {
    type: "string",
    resolve: (post: any) =>
      `${env.NEXT_PUBLIC_APP_URL}/api/og?title=${encodeURI(post.title)}`,
  },
  slug: {
    type: "string",
    resolve: (doc: any) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc: any) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  structuredData: {
    type: "json",
    resolve: (doc: any) =>
      ({
        "@context": "https://schema.org",
        "@type": `BlogPosting`,
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.date,
        description: doc.summary,
        image: doc.image,
        url: `https://magicuikit.com/${doc._raw.flattenedPath}`,
        author: {
          "@type": "Person",
          name: doc.author,
          url: `https://twitter.com/${doc.author}`,
        },
      }) as WithContext<BlogPosting>,
  },
};

export const Component = defineDocumentType(() => ({
  name: "Component",
  filePathPattern: `components/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    video: { type: "string", required: false },
    summary: { type: "string", required: true },
    author: { type: "string", required: true },
    published: { type: "boolean", required: false, default: true },
    toc: { type: "boolean", default: false, required: false },
  },
  // @ts-ignore
  computedFields,
}));

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  // @ts-ignore
  computedFields,
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Component, Page],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
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
        rehypePrettyCode,
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
        rehypeAutolinkHeadings,
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
