"use client";

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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { menuGroups } from "@/configs/navigation";

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
};

const descriptionMap: Record<string, string> = {
  "Text Tools":
    "Advanced string manipulation, regex testing, and encoding utilities for rapid text processing.",
  "Data Tools":
    "Format, compare, and convert between JSON, CSV, and other structured data formats instantly.",
  Generators:
    "Quickly bootstrap assets with secure password generation, README builders, and CSS shadow presets.",
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
};

export default function Home() {
  return (
    <main className="flex flex-col items-center px-6 py-24 md:py-32 space-y-24 bg-white dark:bg-zinc-950">
      {/* HERO SECTION */}
      <section className="max-w-4xl text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="p-1 rounded-[2.5rem] border-2 border-zinc-100 dark:border-zinc-800 shadow-2xl">
              <Image
                src="/dev-logo.png"
                alt="DevKit logo"
                className="rounded-[2.2rem] grayscale hover:grayscale-0 transition-all duration-700 hover:rotate-6"
                width={100}
                height={100}
                priority
              />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter text-zinc-900 dark:text-zinc-50">
            DevKit<span className="text-zinc-300 dark:text-zinc-700">.</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Professional-grade utilities for developers. All processing is done{" "}
            <span className="text-zinc-900 dark:text-zinc-100 underline decoration-zinc-300 underline-offset-4">
              locally
            </span>{" "}
            in your browser.
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
            items={group.items.map((item) => item.title)}
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
    </main>
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
  items: string[];
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn("block group", !active && "pointer-events-none opacity-50")}
    >
      <Card className="relative flex flex-col p-2 rounded-[2.5rem] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-500 shadow-sm overflow-hidden h-full">
        <CardHeader className="p-8 pb-4">
          <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            {icon}
          </div>
          <CardTitle className="font-bold text-2xl tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            {title}
            {active && (
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="px-8 pb-8 flex flex-col flex-1">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">
            {description}
          </p>

          <div className="mt-auto flex flex-wrap gap-2">
            {items.map((item) => (
              <span
                key={item}
                className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/50"
              >
                {item}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
