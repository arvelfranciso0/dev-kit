import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/configs/site";
import { ogImagePath } from "@/lib/seo";
import Sidebar from "@/components/layout/sidebar";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  preload: false,
});

// Site-wide defaults. Each route sets its own title, description, canonical and
// social tags via createMetadata() in lib/seo.ts; no canonical is set here because
// child segments would inherit it.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: ogImagePath("/"), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImagePath("/")],
  },
  // Indexing is the default; only non-production deploys opt out
  ...(!siteConfig.indexable && { robots: { index: false, follow: false } }),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar footer={<Footer />}>
            <main className="flex-1">{children}</main>
          </Sidebar>
        </ThemeProvider>
      </body>
    </html>
  );
}
