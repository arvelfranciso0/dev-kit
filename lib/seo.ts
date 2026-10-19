import type { Metadata } from "next";
import { siteConfig } from "@/configs/site";
import {
  categoryRoutes,
  RouteSeo,
  toolRoutes,
} from "@/configs/seo-routes";

export const absoluteUrl = (path = "/") =>
  `${siteConfig.url}${path === "/" ? "" : path}`;

// Generated Open Graph image for a route, served by app/og/[[...slug]]/route.tsx
export const ogImagePath = (path = "/") =>
  `/og${path === "/" ? "" : path}`;

export const getRouteSeo = (path: string): RouteSeo => {
  const route =
    toolRoutes.find((item) => item.path === path) ??
    categoryRoutes.find((item) => item.path === path);
  if (!route) throw new Error(`Missing SEO entry for route "${path}"`);
  return route;
};

export const getCategoryForPath = (path: string) =>
  categoryRoutes.find((category) => path.startsWith(`${category.path}/`));

interface MetadataInput {
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
  // Skip the " | Toolet" title template (used by the home page)
  absoluteTitle?: boolean;
}

// Builds complete per-page metadata. openGraph/twitter are rebuilt in full because
// Next.js merges metadata shallowly and a child object replaces the parent's.
export const createMetadata = ({
  path,
  title,
  description,
  ogTitle,
  absoluteTitle,
}: MetadataInput): Metadata => {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const socialTitle = ogTitle ?? fullTitle;
  const image = {
    url: ogImagePath(path),
    width: 1200,
    height: 630,
    alt: socialTitle,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: path,
      title: socialTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
};

export const getRouteMetadata = (path: string): Metadata => {
  const { title, description, ogTitle } = getRouteSeo(path);
  return createMetadata({ path, title, description, ogTitle });
};

// ---------- Structured data ----------

type Schema = Record<string, unknown>;

export const websiteSchema = (): Schema => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${absoluteUrl("/")}#website`,
  name: siteConfig.name,
  url: absoluteUrl("/"),
  description: siteConfig.description,
  inLanguage: "en",
});

const breadcrumbSchema = (items: { name: string; path: string }[]): Schema => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const categorySchemas = (path: string): Schema[] => {
  const category = getRouteSeo(path);
  return [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: category.name, path },
    ]),
  ];
};

export const toolSchemas = (path: string): Schema[] => {
  const tool = getRouteSeo(path);
  const category = getCategoryForPath(path);

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: tool.name,
      description: tool.description,
      url: absoluteUrl(path),
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any (web browser)",
      browserRequirements: "Requires JavaScript",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      isPartOf: { "@id": `${absoluteUrl("/")}#website` },
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      ...(category ? [{ name: category.name, path: category.path }] : []),
      { name: tool.name, path },
    ]),
  ];
};
