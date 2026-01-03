"use client";

import { CaseUpper, Binary, Search, Link as LinkIcon } from "lucide-react";

import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";

const tools: Tool[] = [
  {
    title: "Case Converter",
    desc: "Seamlessly transform strings between camelCase, snake_case, PascalCase, and other programmatic naming conventions.",
    href: "/tools/text/case",
    icon: <CaseUpper size={18} />,
    status: "ready",
  },
  {
    title: "Encoder / Decoder",
    desc: "Perform secure, client-side Base64 and URL encoding/decoding for handling binary data and safe URI parameters.",
    href: "/tools/text/encode",
    icon: <Binary size={18} />,
    status: "ready",
  },
  {
    title: "Regex Validator",
    desc: "Debug and test regular expressions in real-time with visual match highlighting and capture group breakdown.",
    href: "/tools/text/regex",
    icon: <Search size={18} />,
    status: "ready",
  },
  {
    title: "Slug Generator",
    desc: "Convert titles and strings into clean, SEO-friendly URL slugs with customizable separators and character stripping.",
    href: "/tools/text/slug",
    icon: <LinkIcon size={18} />,
    status: "ready",
  },
];

export default function TextStringHome() {
  return (
    <div className="p-8 space-y-12 text-zinc-900 dark:text-zinc-100">
      {/* HEADER */}
      <div className="space-y-4 border-b border-zinc-100 dark:border-zinc-800 pb-10">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          <span>TOOLS</span>
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

      <ToolGrid tools={tools} columns={3} />
    </div>
  );
}
