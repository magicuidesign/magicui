import { JWT } from "google-auth-library";
import { google } from "googleapis";

const { SITE_URL, SITEMAP_URL, GOOGLE_SEARCH_CONSOLE_JSON_KEY } = process.env;

if (!SITE_URL || !SITEMAP_URL || !GOOGLE_SEARCH_CONSOLE_JSON_KEY) {
  throw new Error("Missing required environment variables");
}

const keys = JSON.parse(
  Buffer.from(GOOGLE_SEARCH_CONSOLE_JSON_KEY, "base64").toString("utf-8"),
);

const client = new JWT({
  email: keys.client_email,
  key: keys.private_key,
  scopes: [
    "https://www.googleapis.com/auth/webmasters",
    "https://www.googleapis.com/auth/webmasters.readonly",
  ],
});

google.options({ auth: client });

const searchconsole = google.searchconsole("v1");

(async () => {
  try {
    await searchconsole.sitemaps.submit({
      feedpath: SITEMAP_URL,
      siteUrl: SITE_URL,
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  } finally {
    process.exit(0);
  }
})();
