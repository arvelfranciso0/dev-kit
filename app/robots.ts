import type { MetadataRoute } from "next";
import { siteConfig } from "@/configs/site";

// Every crawler (search and AI alike) may crawl. Non-production deploys are kept out of
// the index with a noindex meta tag (see app/layout.tsx) rather than a Disallow, because
// a blocked crawler never sees the noindex directive.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    ...(siteConfig.indexable && { sitemap: `${siteConfig.url}/sitemap.xml` }),
  };
}
