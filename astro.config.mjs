import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { site } from "./src/data/site.ts";

export default defineConfig({
  site: site.url,
  // Keep equal to `site.base` (src/data/site.ts). Empty when served from the domain root.
  base: site.base || undefined,
  trailingSlash: "ignore",
  // No sitemap while the site is noindex.
  integrations: site.noindex ? [] : [sitemap()],
});
