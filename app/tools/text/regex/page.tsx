"use client";

import { useMemo, useState, useRef } from "react";
import { Toggle } from "@/components/ui/toggle";
import {
  AlertCircle,
  Search,
  TextCursorInput,
  BookOpen,
  Bug,
  Layers,
  Target,
  Hash,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Reusable Components
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { InfoSection } from "@/components/shared/info-section";
import { MetadataCard } from "@/components/shared/meta-card";
import { Textarea } from "@/components/ui/textarea";

const AVAILABLE_FLAGS = [
  { char: "g", label: "Global", desc: "Find all occurrences." },
  { char: "i", label: "Case Insensitive", desc: "Ignore case differences." },
  { char: "m", label: "Multiline", desc: "^ and $ match line breaks." },
  { char: "s", label: "Single Line", desc: "Dot matches newlines." },
  { char: "u", label: "Unicode", desc: "Full Unicode support." },
];

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [text, setText] = useState("");
  const [flags, setFlags] = useState<string[]>(["g", "m"]);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const regex = useMemo(() => {
    if (!pattern) {
      setError(null);
      return null;
    }

    try {
      const unescapedDelimiter = /(?<!\\)\//;
      if (unescapedDelimiter.test(pattern)) {
        setError("An unescaped delimiter must be escaped, use `\\/` ");
        return null;
      }

      const r = new RegExp(pattern, flags.join(""));
      setError(null);
      return r;
    } catch (e: any) {
      setError(e.message);
      return null;
    }
  }, [pattern, flags]);

  const matches = useMemo(() => {
    if (!regex || !text) return [];
    try {
      if (!flags.includes("g")) {
        const match = text.match(regex);
        return match ? [match] : [];
      }
      return [...text.matchAll(regex)];
    } catch (e) {
      return [];
    }
  }, [regex, text, flags]);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = e.currentTarget.scrollTop;
  };

  const renderHighlightedText = () => {
    if (!text) return null;
    if (!regex || matches.length === 0) return text;

    let result: React.ReactNode[] = [];
    let lastIndex = 0;

    matches.forEach((match, i) => {
      const start = match.index!;
      const end = start + match[0].length;
      result.push(text.slice(lastIndex, start));
      result.push(
        <mark key={i} className="bg-amber-500/30  text-transparent">
          {match[0]}
        </mark>
      );
      lastIndex = end;
    });

    result.push(text.slice(lastIndex));
    return result;
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <ToolHeader
          title="Regex Debugger"
          subtitle="Real-time regular expression testing and visual match highlighting."
          icon={<Bug />}
        />

        {/* METRICS ROW */}
        <div className="flex justify-end">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto md:min-w-100">
            <MetadataCard
              icon={<Target size={14} className="text-emerald-500" />}
              label="Matches Found"
              value={matches.length > 0 ? matches.length.toString() : "0"}
            />
            <MetadataCard
              icon={
                <AlertCircle
                  size={14}
                  className={cn(error ? "text-destructive" : "text-zinc-400")}
                />
              }
              label="Engine Status"
              value={error ? "Invalid" : pattern ? "Ready" : "Idle"}
            />
          </div>
        </div>
      </div>

      {/* EXPRESSION CARD */}
      <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm space-y-4">
        <div className="flex items-center justify-between px-1">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
            Regex Expression
          </label>
          {error && (
            <span className="text-xs font-mono text-destructive flex items-center gap-2">
              <AlertCircle size={12} /> {error}
            </span>
          )}
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-4">
          <div
            className={cn(
              "flex-1 flex items-center gap-3 px-5 min-h-14 rounded-2xl border transition-all bg-zinc-50/50 dark:bg-zinc-900/30",
              error
                ? "border-destructive/50 ring-4 ring-destructive/5"
                : "border-zinc-200 dark:border-zinc-800 focus-within:border-zinc-400 dark:focus-within:border-zinc-600"
            )}
          >
            <span className="text-zinc-400 font-mono text-lg select-none">
              /
            </span>
            <input
              placeholder="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none font-mono text-sm placeholder:text-zinc-300 dark:placeholder:text-zinc-700 w-full"
              spellCheck={false}
            />
            <span className="text-zinc-400 font-mono text-lg select-none">
              /
            </span>
            <div className="flex items-center gap-1 ml-2 text-amber-600 dark:text-amber-500 font-mono font-bold text-sm">
              {flags.join("")}
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1.5 bg-zinc-100/50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            {AVAILABLE_FLAGS.map((f) => (
              <Toggle
                key={f.char}
                pressed={flags.includes(f.char)}
                onPressedChange={(on) =>
                  setFlags((prev) =>
                    on ? [...prev, f.char] : prev.filter((x) => x !== f.char)
                  )
                }
                className="w-10 h-10 rounded-xl data-[state=on]:bg-white dark:data-[state=on]:bg-zinc-800 data-[state=on]:shadow-sm transition-all font-mono text-sm"
              >
                {f.char}
              </Toggle>
            ))}
          </div>
        </div>
      </div>

      {/* WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <ActionPanel
            label="Test String"
            icon={<TextCursorInput size={14} />}
            onReset={() => setText("")}
            count={text.length}
          >
            <div className="relative h-125 font-mono text-sm overflow-hidden bg-white dark:bg-zinc-950">
              <div
                ref={scrollRef}
                aria-hidden="true"
                className="absolute inset-0 p-6 pointer-events-none whitespace-pre-wrap break-all overflow-auto text-transparent leading-relaxed"
              >
                {renderHighlightedText()}
              </div>
              <Textarea
                className="relative w-full h-full p-6 bg-transparent border-none focus:ring-0 focus:outline-none resize-none whitespace-pre-wrap break-all font-mono leading-relaxed text-zinc-800 dark:text-zinc-200"
                placeholder="Insert text here to test your regex matches..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onScroll={handleScroll}
                spellCheck={false}
              />
            </div>
          </ActionPanel>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <BookOpen size={14} /> Flag Reference
            </h3>
            <div className="space-y-2">
              {AVAILABLE_FLAGS.map((f) => (
                <div
                  key={f.char}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-2xl border transition-all",
                    flags.includes(f.char)
                      ? "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50"
                      : "border-transparent opacity-40"
                  )}
                >
                  <span className="font-mono text-xs font-bold bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded-lg shrink-0">
                    {f.char}
                  </span>
                  <div>
                    <p className="text-xs font-bold">{f.label}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Hash size={14} /> Quick Tokens
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {[
                  { t: ".", d: "any" },
                  { t: "\\d", d: "digit" },
                  { t: "\\w", d: "word" },
                  { t: "\\s", d: "space" },
                  { t: "^", d: "start" },
                  { t: "$", d: "end" },
                ].map((token) => (
                  <div
                    key={token.t}
                    className="bg-zinc-50 dark:bg-zinc-900/50 p-2 rounded-lg border border-zinc-100 dark:border-zinc-800 flex justify-between"
                  >
                    <span className="font-bold text-amber-600">{token.t}</span>
                    <span className="text-zinc-500">{token.d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t border-zinc-100 dark:border-zinc-800 pt-12">
        <InfoSection
          title="Pattern Integrity"
          icon={Search}
          description="Regular expressions are powerful but fragile. Our validator provides real-time visual feedback, ensuring your patterns behave exactly as expected before deployment."
        />
        <InfoSection
          title="Capture Group Insights"
          icon={Layers}
          description="Beyond simple matches, this tool helps you visualize how complex regex extracts specific data fragments for parsing logic and transformation pipelines."
        />
      </div>
    </div>
  );
}
