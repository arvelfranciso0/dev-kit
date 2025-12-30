"use client";

import {
  Sparkles,
  Terminal,
  Zap,
  Lock,
  Layers,
  Palette,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-6 py-24 md:py-32 space-y-24 bg-white dark:bg-zinc-950">
      {/* HERO SECTION */}
      <section className="max-w-4xl text-center space-y-8">
        {/* <div className="flex justify-center">
          <Badge
            variant="outline"
            className="px-4 py-1.5 rounded-full border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400">
              New: Layered Shadow Engine Live
            </span>
          </Badge>
        </div> */}

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
            A minimalist, high-performance suite of tools for the modern
            engineer. Built with{" "}
            <span className="text-zinc-900 dark:text-zinc-100 underline decoration-zinc-300 underline-offset-4">
              privacy-first
            </span>{" "}
            architecture.
          </p>
        </div>
      </section>

      {/* CORE TOOL CATEGORIES */}
      <section className="grid gap-6 md:grid-cols-3 max-w-6xl w-full">
        <FeatureCard
          icon={<Layers className="w-5 h-5" />}
          title="Frontend Lab"
          description="Design layered shadows, fluid typography, and optimize SVGs with instant code exports."
          tags={["Shadows", "Unit", "Generator"]}
          href="/frontend"
          active
        />
        <FeatureCard
          icon={<Sparkles className="w-5 h-5" />}
          title="Text & Regex"
          description="Transform casing, debug complex patterns, and clean text with instant visual feedback."
          tags={["Casing", "Regex", "Diff"]}
          href="/text"
          active
        />
        <FeatureCard
          icon={<Terminal className="w-5 h-5" />}
          title="Protocol & Code"
          description="Base64, and JSON formatting. Built for low-latency performance."
          tags={["JSON", "JWT", "CSV"]}
          href="/data"
          active
        />
        <FeatureCard
          icon={<Lock className="w-5 h-5" />}
          title="Security First"
          description="Hash generation and UUIDs handled entirely client-side. Your data never leaves your browser."
          tags={["Hashing", "UUID", "Crypto"]}
          href="/security"
          active
        />
      </section>

      {/* SUBTLE FOOTER DECORATION */}
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
  tags,
  href,
  active = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn("block group", !active && "pointer-events-none opacity-60")}
    >
      <Card className="relative flex flex-col p-2 rounded-[2.5rem] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-500 shadow-sm overflow-hidden h-full">
        <CardHeader className="p-8 pb-0">
          <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            {icon}
          </div>
          <CardTitle className="font-bold text-2xl tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            {title}
            {active && (
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-8 flex flex-col flex-1">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8">
            {description}
          </p>

          <div className="mt-auto flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
