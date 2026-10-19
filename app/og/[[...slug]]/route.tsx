import { ImageResponse } from "next/og";
import { categoryRoutes, toolRoutes } from "@/configs/seo-routes";
import { siteConfig } from "@/configs/site";
import { getCategoryForPath } from "@/lib/seo";

// Social preview images, prerendered at build time for every route in the SEO registry.
export const dynamicParams = false;

const toSlug = (path: string) => path.split("/").filter(Boolean);

export function generateStaticParams() {
  return [
    { slug: [] },
    ...[...categoryRoutes, ...toolRoutes].map((route) => ({
      slug: toSlug(route.path),
    })),
  ];
}

const getContent = (path: string) => {
  const route =
    toolRoutes.find((item) => item.path === path) ??
    categoryRoutes.find((item) => item.path === path);

  if (!route) {
    return {
      eyebrow: "Developer Toolkit",
      heading: siteConfig.name,
      description:
        "Free, browser-based tools for formatting, converting, generating and debugging.",
    };
  }

  return {
    eyebrow: getCategoryForPath(path)?.name ?? "Tool Category",
    heading: route.name,
    description: route.description,
  };
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug = [] } = await params;
  const { eyebrow, heading, description } = getContent(
    slug.length ? `/${slug.join("/")}` : "/"
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#09090b",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#fafafa" />
            <path
              d="M11.5 8.5H8.5v15h3M20.5 8.5h3v15h-3"
              fill="none"
              stroke="#18181b"
              strokeWidth={2.75}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.6 9.5L13.4 22.5"
              fill="none"
              stroke="#f59e0b"
              strokeWidth={3}
              strokeLinecap="round"
            />
          </svg>
          <div style={{ fontSize: 36, fontWeight: 700 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#f59e0b",
            }}
          >
            {eyebrow}
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            {heading}
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.4,
              color: "#a1a1aa",
              maxWidth: 1000,
            }}
          >
            {description}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#71717a" }}>
          Free · Runs in your browser · No sign-up
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
