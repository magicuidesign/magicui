// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { BlogPosting, WithContext } from "schema-dts";
import { visit } from "unist-util-visit";
import { env } from "./env.mjs";

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
    toc: { type: "boolean", default: true, required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    image: {
      type: "string",
      resolve: (post) =>
        `${env.NEXT_PUBLIC_APP_URL}/api/og?title=${encodeURI(post.title)}`,
    },
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.replace(`components/`, ""),
    },
    structuredData: {
      type: "json",
      resolve: (doc) =>
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
        } as WithContext<BlogPosting>),
    },
  },
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Component],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
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
