import {
  Sparkles,
  Terminal,
  Zap,
  Layers,
  Palette,
  ShieldCheck,
  Type,
  Cpu,
  Code2,
  Settings2,
  Repeat,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/logo-mark";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { menuGroups } from "@/configs/navigation";
import { siteConfig } from "@/configs/site";
import { createMetadata, websiteSchema } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = createMetadata({
  path: "/",
  title: siteConfig.title,
  description: siteConfig.description,
  absoluteTitle: true,
});

// Icon mapping based on the group title
const iconMap: Record<string, React.ReactNode> = {
  "Text Tools": <Type className="w-5 h-5" />,
  "Data Tools": <Terminal className="w-5 h-5" />,
  Generators: <Sparkles className="w-5 h-5" />,
  Optimization: <Zap className="w-5 h-5" />,
  "Design Utilities": <Palette className="w-5 h-5" />,
  "Developer Tools": <Code2 className="w-5 h-5" />,
  Security: <ShieldCheck className="w-5 h-5" />,
  Playgrounds: <Cpu className="w-5 h-5" />,
  Converter: <Repeat className="w-5 h-5" />,
};

const descriptionMap: Record<string, string> = {
  "Text Tools":
    "Advanced string manipulation, regex testing, and encoding utilities for rapid text processing.",
  "Data Tools":
    "Format, compare, and convert between JSON, CSV, and other structured data formats instantly.",
  Generators:
    "Quickly bootstrap assets with secure password generation, README builders, CSS shadow presets, and color palettes.",
  Optimization:
    "Minify and sanitize your web assets to improve performance and code cleanliness.",
  "Design Utilities":
    "Essential tools for UI/UX developers including unit conversion and contrast validation.",
  "Developer Tools":
    "Enhance your workflow with markdown previews, git references, and code diffing.",
  Security:
    "Client-side security tools for debugging JWTs and generating secure cryptographic hashes.",
  Playgrounds:
    "Live, isolated environments for rapid prototyping of HTML, CSS, and JavaScript components.",
  Converter:
    "Convert Unix timestamps to readable dates and back, in any time zone, with a live clock.",
};

export default function Home() {
  return (
    <div className="flex flex-col items-center px-6 py-24 md:py-32 space-y-24 bg-white dark:bg-zinc-950">
      <JsonLd data={websiteSchema()} />
      {/* HERO SECTION */}
      <section className="max-w-4xl text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="p-1 rounded-[2.5rem] border-2 border-zinc-100 dark:border-zinc-800 shadow-2xl">
              <LogoMark decorative className="h-[100px] w-[100px] grayscale hover:grayscale-0 transition-all duration-700 hover:rotate-6" />
            </div>
          </div>
          <h1 className="flex flex-col items-center gap-4 text-zinc-900 dark:text-zinc-50">
            <span className="text-6xl md:text-8xl font-semibold tracking-tighter">
              Toolet<span className="text-zinc-300 dark:text-zinc-700">.</span>
            </span>
            <span className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-700 dark:text-zinc-300">
              Free online developer tools
            </span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Format JSON, test regular expressions, convert timestamps, decode
            JWTs, optimize SVGs and more. Everything runs{" "}
            <span className="text-zinc-900 dark:text-zinc-100 underline decoration-zinc-300 underline-offset-4">
              locally
            </span>{" "}
            in your browser: nothing is uploaded, and there&apos;s no sign-up.
          </p>
        </div>
      </section>

      {/* DYNAMIC FEATURE GRID */}
      <section className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full">
        {menuGroups.map((group) => (
          <FeatureCard
            key={group.title}
            icon={iconMap[group.title] || <Settings2 className="w-5 h-5" />}
            title={group.title}
            description={
              descriptionMap[group.title] ||
              "Explore our suite of specialized developer utilities."
            }
            items={group.items.map((item) => ({
              title: item.title,
              href: `${group.href}${item.href}`,
            }))}
            href={group.href}
            active={group.status === "ready" || group.status === "live"}
          />
        ))}
      </section>

      {/* FOOTER DECORATION */}
      <div className="opacity-20 flex items-center gap-4 w-full max-w-xl">
        <div className="h-px flex-1 bg-zinc-400" />
        <Zap size={14} className="text-zinc-500" />
        <div className="h-px flex-1 bg-zinc-400" />
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  items,
  href,
  active = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: { title: string; href: string }[];
  href: string;
  active?: boolean;
}) {
  return (
    <Card
      className={cn(
        "group relative flex flex-col p-2 rounded-[2.5rem] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-500 shadow-sm overflow-hidden h-full",
        !active && "opacity-50"
      )}
    >
      <CardHeader className="p-8 pb-4">
        <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
          {icon}
        </div>
        <CardTitle className="font-bold text-2xl tracking-tight text-zinc-900 dark:text-zinc-100">
          <h2 className="flex items-center gap-2">
            {active ? (
              <Link href={href} className="hover:underline underline-offset-4">
                {title}
              </Link>
            ) : (
              title
            )}
            {active && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </h2>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-8 pb-8 flex flex-col flex-1">
        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">
          {description}
        </p>

        <ul className="mt-auto flex flex-wrap gap-2">
          {items.map((item) => (
            <li key={item.href}>
              {active ? (
                <Link
                  href={item.href}
                  className="inline-block text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                >
                  {item.title}
                </Link>
              ) : (
                <span className="inline-block text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400">
                  {item.title}
                </span>
              )}
            </li>
          ))}
        </ul>

        {active && (
          <Link
            href={href}
            className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Browse all {title}
            <ArrowRight size={12} />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
