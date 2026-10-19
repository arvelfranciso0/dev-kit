// Public origin of the site. Set NEXT_PUBLIC_SITE_URL once a custom domain is live;
// otherwise Netlify's build-time `URL` (the site's primary domain) is used.
const resolveSiteUrl = () => {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.URL ||
    "http://localhost:3000";
  return url.replace(/\/+$/, "");
};

// Netlify sets CONTEXT to "production", "deploy-preview" or "branch-deploy".
// Only production deploys should be indexed.
const resolveIndexable = () =>
  process.env.CONTEXT
    ? process.env.CONTEXT === "production"
    : process.env.NODE_ENV === "production";

export const siteConfig = {
  name: "Toolet",
  url: resolveSiteUrl(),
  indexable: resolveIndexable(),
  title: "Toolet – Free Online Developer Tools in Your Browser",
  description:
    "Free browser-based developer tools: JSON formatter, regex tester, JWT decoder, timestamp converter, password generator, SVG optimizer and more. No sign-up.",
  locale: "en_US",
  githubUrl: "https://github.com/arvelfranciso0/dev-kit",
};
