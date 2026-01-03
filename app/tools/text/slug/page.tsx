"use client";

import { useState, useMemo } from "react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { Button } from "@/components/ui/button";
import {
  Link2,
  Globe,
  ShieldCheck,
  Code2,
  CaseSensitive,
  Search,
} from "lucide-react";
import { generateSlug } from "@/lib/string-utils";
import { SlugEncoding } from "@/types/string";
import { MetadataCard } from "@/components/shared/meta-card";
import { InfoSection } from "@/components/shared/info-section";
export default function SlugGenerator() {
  const [input, setInput] = useState("");
  const [separator, setSeparator] = useState<"-" | "_">("-");
  const [encoding, setEncoding] = useState<SlugEncoding>("ascii");
  const [keepCase, setKeepCase] = useState(false);

  const slug = useMemo(
    () => generateSlug(input, { separator, keepCase, encoding }),
    [input, separator, keepCase, encoding]
  );

  return (
    <div className="p-4 md:p-8  space-y-8">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <ToolHeader
          title="Slug Generator"
          subtitle="Sanitized URL Transformation"
          icon={<Link2 />}
        />

        {/* ENHANCED CONFIGURATION BAR */}
        <div className="flex flex-wrap items-center gap-3 p-1.5 bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          {/* Separator Toggle */}
          <div className="flex gap-1 bg-white dark:bg-zinc-950 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
            {["-", "_"].map((s) => (
              <Button
                key={s}
                variant={separator === s ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSeparator(s as "-" | "_")}
                className="h-7 px-3 rounded-lg text-[9px] font-bold uppercase tracking-widest"
              >
                {s === "-" ? "Kebab" : "Snake"}
              </Button>
            ))}
          </div>

          {/* Encoding Toggle */}
          <div className="flex gap-1 bg-white dark:bg-zinc-950 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
            {(["ascii", "unicode", "percent"] as SlugEncoding[]).map((e) => (
              <Button
                key={e}
                variant={encoding === e ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setEncoding(e)}
                className="h-7 px-3 rounded-lg text-[9px] font-bold uppercase tracking-widest"
              >
                {e}
              </Button>
            ))}
          </div>

          <Button
            variant={keepCase ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setKeepCase(!keepCase)}
            className="h-9 px-4 rounded-xl text-[9px] font-bold uppercase tracking-widest gap-2"
          >
            <CaseSensitive size={14} />
            {keepCase ? "Raw Case" : "Lower"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActionPanel label="Source Content" onReset={() => setInput("")}>
          <textarea
            className="w-full h-48 p-6 bg-transparent resize-none focus:outline-none text-lg font-medium font-mono"
            placeholder="e.g. München Café @ 2025"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </ActionPanel>

        <ActionPanel label="Output Slug" copyValue={slug} variant="output">
          <div className="h-48 flex items-center justify-center p-6 text-center">
            {slug ? (
              <span className="font-mono text-xl font-bold tracking-tight break-all text-zinc-900 dark:text-zinc-100">
                {slug}
              </span>
            ) : (
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-20">
                Awaiting input...
              </span>
            )}
          </div>
        </ActionPanel>
      </div>

      {/* DYNAMIC PROTOCOL LEGEND */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetadataCard
          icon={<ShieldCheck size={14} />}
          label="Safety"
          value={
            encoding === "ascii" ? "High (Legacy Safe)" : "Medium (Modern Web)"
          }
        />
        <MetadataCard
          icon={<Globe size={14} />}
          label="International"
          value={encoding === "unicode" ? "Enabled" : "Stripped"}
        />
        <MetadataCard
          icon={<Code2 size={14} />}
          label="URI Protocol"
          value={encoding === "percent" ? "RFC 3986" : "Standard Slug"}
        />
        <MetadataCard
          icon={<Link2 size={14} />}
          label="Path Type"
          value={separator === "-" ? "URL Path" : "Variable/File"}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t pt-12">
        <InfoSection
          title="SEO Optimization"
          icon={Search}
          description="Clean, keyword-rich URLs are a primary ranking factor. This generator strips special characters and converts spaces to hyphens, ensuring your links are human-readable and crawlable by search engines."
        />
        <InfoSection
          title="URL Normalization"
          icon={Globe}
          description="Standardizing your slugs prevents duplicate content issues. It handles accents (diacritics), removes stop words, and enforces lowercase formatting to ensure consistent link structures across your entire platform."
        />
      </div>
    </div>
  );
}
