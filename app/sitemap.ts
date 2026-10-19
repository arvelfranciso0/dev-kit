import type { MetadataRoute } from "next";
import { categoryRoutes, toolRoutes } from "@/configs/seo-routes";
import { absoluteUrl } from "@/lib/seo";

// lastModified is omitted on purpose: there is no reliable per-page change date,
// and stamping every URL with the build time misleads crawlers.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...categoryRoutes.map((route) => route.path),
    ...toolRoutes.map((route) => route.path),
  ];

  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
