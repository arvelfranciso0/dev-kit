"use client";

import Link from "next/link";
import {
  ArrowRight,
  CaseUpper,
  Hash,
  Binary,
  Search,
  Link as LinkIcon,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const tools = [
  {
    title: "Case Converter",
    desc: "Transform text between UPPERCASE, camelCase, and snake_case formats.",
    href: "/text-string/case-converter",
    icon: <CaseUpper size={18} />,
    status: "ready",
  },
  {
    title: "Encoder / Decoder",
    desc: "Instant Base64 and URL encoding/decoding with zero latency.",
    href: "/text-string/encoder",
    icon: <Binary size={18} />,
    status: "ready",
  },
  {
    title: "Regex Debugger",
    desc: "Real-time expression testing with monochrome match highlighting.",
    href: "/text-string/regex",
    icon: <Search size={18} />,
    status: "ready",
  },
  {
    title: "Slug Generator",
    desc: "Create SEO-optimized URL fragments from any string input.",
    href: "#",
    icon: <LinkIcon size={18} />,
    status: "soon",
  },
  {
    title: "String Analyzer",
    desc: "Deep inspection of character counts, word density, and lines.",
    href: "#",
    icon: <Hash size={18} />,
    status: "soon",
  },
];

export default function TextStringHome() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 text-zinc-900 dark:text-zinc-100">
      {/* HEADER */}
      <div className="space-y-4 border-b border-zinc-100 dark:border-zinc-800 pb-10">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          <span>Utilities</span>
          <span className="text-zinc-200 dark:text-zinc-800">/</span>
          <span className="text-zinc-900 dark:text-zinc-100">
            Text & String
          </span>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            Text Processing Suite
          </h1>
          <p className="text-zinc-500 max-w-xl text-sm leading-relaxed">
            A minimalist collection of high-performance utilities for
            developers. No tracking, no ads, just instant transformation.
          </p>
        </div>
      </div>

      {/* TOOLS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.status === "ready" ? tool.href : "#"}
            className={cn(
              "group block h-full",
              tool.status !== "ready" && "cursor-not-allowed"
            )}
          >
            <Card
              className={cn(
                "relative flex flex-col justify-between p-6 h-48 rounded-2xl border transition-all duration-300",
                tool.status === "ready"
                  ? "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-900 dark:hover:border-zinc-100 hover:shadow-md"
                  : "border-dashed border-zinc-200 dark:border-zinc-800 opacity-60"
              )}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:scale-105 transition-transform">
                    {tool.icon}
                  </div>

                  {tool.status === "ready" ? (
                    <ArrowUpRight
                      size={16}
                      className="text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  ) : (
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded-md">
                      Soon
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-50">
                    {tool.title}
                  </h3>
                  <p className="text-[11px] text-zinc-500 leading-normal mt-1.5 line-clamp-2">
                    {tool.desc}
                  </p>
                </div>
              </div>

              {tool.status === "ready" && (
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                  Open Tool{" "}
                  <ArrowRight
                    size={10}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
