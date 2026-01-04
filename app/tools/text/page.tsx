"use client";

import { CaseUpper, Binary, Search, Link as LinkIcon } from "lucide-react";

import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";
import Header from "@/components/shared/header";

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
      <Header
        category="Text & String"
        title="Text Processing Suite"
        description=" A minimalist collection of high-performance utilities for
            developers. No tracking, no ads, just instant transformation."
      />

      <ToolGrid tools={tools} columns={3} />
    </div>
  );
}
