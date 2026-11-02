#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const payload = JSON.parse(fs.readFileSync("payload.json", "utf8"));
const articles = (payload && payload.data && payload.data.articles) || [];
if (!Array.isArray(articles) || articles.length === 0) process.exit(0);

const folder = path.resolve("apps", "www", "content", "blog");
fs.mkdirSync(folder, { recursive: true });

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const written = [];

for (const a of articles) {
  const slug = a && a.slug;
  if (typeof slug !== "string" || !slugPattern.test(slug)) {
    console.error(`Skipped article with invalid slug: ${JSON.stringify(slug)}`);
    continue;
  }
  const file = path.resolve(folder, `${slug}.mdx`);
  if (path.dirname(file) !== folder) {
    console.error(`Skipped article outside blog folder: ${file}`);
    continue;
  }

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
  fs.writeFileSync(file, fm + body, "utf8");
  written.push(path.relative(process.cwd(), file));
  console.log(`Wrote ${file}`);
}

// The workflow stages only these files.
fs.writeFileSync("written-articles.txt", written.join("\n"), "utf8");
