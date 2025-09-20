#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const payload = JSON.parse(fs.readFileSync("payload.json", "utf8"));
const articles = (payload && payload.data && payload.data.articles) || [];
if (!Array.isArray(articles) || articles.length === 0) process.exit(0);

const folder = path.join("apps", "www", "content", "blog");
fs.mkdirSync(folder, { recursive: true });

for (const a of articles) {
  const fmObj = {
    title: a.title || "",
    description: a.meta_description || "",
    image: a.image_url || "",
    author: "Dillion Verma",
    tags: Array.isArray(a.tags) ? a.tags : [],
    publishedOn: a.created_at || "",
    featured: true,
  };
  const fm =
    "---\n" + yaml.dump(fmObj, { noRefs: true, lineWidth: 0 }) + "---\n";
  const body = String(a.content_markdown || "");
  const file = path.join(folder, `${a.slug}.mdx`);
  fs.writeFileSync(file, fm + body, "utf8");
  console.log(`Wrote ${file}`);
}
