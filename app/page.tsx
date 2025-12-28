"use client";

import { Button } from "@/components/ui/button";
import {
  Code2,
  ImageIcon,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Terminal,
  Zap,
  Lock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-6 py-24 md:py-32 space-y-24">
      {/* HERO SECTION */}
      <section className="max-w-4xl text-center space-y-8">
        {/* Status Badge */}
        {/* <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400">
              V1.0 Live — Browser Native
            </span>
          </div>
        </div> */}

        {/* Logo & Title */}
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="p-1 rounded-3xl border-2 border-zinc-100 dark:border-zinc-800 shadow-xl">
              <Image
                src="/dev-logo.png"
                alt="DevKit logo"
                className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
                width={80}
                height={80}
                priority
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-zinc-900 dark:text-zinc-50">
            DevKit<span className="text-zinc-400">.</span>
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            A minimalist, high-performance suite of tools for the modern
            engineer. No tracking, no server-side lag, just pure utility.
          </p>
        </div>

        {/* <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button
            size="lg"
            className="rounded-xl px-8 h-12 font-bold uppercase tracking-widest text-xs"
          >
            Explore All Tools
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl px-8 h-12 font-bold uppercase tracking-widest text-xs border-zinc-200 dark:border-zinc-800"
          >
            Github Repository
          </Button>
        </div> */}
      </section>

      {/* FEATURE GRID */}
      <section className="grid gap-6 md:grid-cols-3 max-w-6xl w-full">
        <FeatureCard
          icon={<Sparkles className="w-5 h-5" />}
          title="String & Regex"
          description="Transform casing, debug complex patterns, and clean text with instant visual feedback."
          tags={["Casing", "Regex", "Diff"]}
        />
        <FeatureCard
          icon={<Terminal className="w-5 h-5" />}
          title="Protocol & Code"
          description="Base64, URL encoding, and JSON formatting. Built for speed and accuracy."
          tags={["Encoding", "JSON", "JWT"]}
        />
        <FeatureCard
          icon={<Lock className="w-5 h-5" />}
          title="Security First"
          description="Hash generation and UUIDs handled entirely client-side. Your data never leaves your machine."
          tags={["Hashing", "UUID", "Crypto"]}
        />
      </section>

      {/* SUBTLE FOOTER DECORATION */}
      <div className="opacity-20 flex items-center gap-4 w-full max-w-xl">
        <div className="h-px flex-1 bg-zinc-400" />
        <Zap size={14} />
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
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
}) {
  return (
    <Card className="group relative flex flex-col p-2 rounded-[2rem] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 shadow-sm overflow-hidden">
      <CardHeader className="p-6 pb-0">
        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <CardTitle className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 flex flex-col flex-1">
        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">
          {description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-black uppercase tracking-[0.15em] px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
