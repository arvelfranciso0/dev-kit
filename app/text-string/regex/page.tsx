"use client";

import { useMemo, useState, useRef } from "react";
import { Toggle } from "@/components/ui/toggle";
import {
  AlertCircle,
  Search,
  TextCursorInput,
  BookOpen,
  Bug,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Reusable Components
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";

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
  const [flags, setFlags] = useState<string[]>(["g"]);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handlePatternChange = (val: string) => {
    const delimiterMatch = val.match(/^\/(.+)\/([gimsu]*)$/);
    if (delimiterMatch) {
      setPattern(delimiterMatch[1]);
      const newFlags = delimiterMatch[2].split("");
      setFlags(Array.from(new Set(newFlags)));
    } else {
      setPattern(val);
    }
  };

  const regex = useMemo(() => {
    if (!pattern) {
      setError(null);
      return null;
    }
    try {
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
        <mark
          key={i}
          className="bg-yellow-500/30 border-b-2 border-yellow-500 text-transparent rounded-sm"
        >
          {match[0]}
        </mark>
      );
      lastIndex = end;
    });

    result.push(text.slice(lastIndex));
    return result;
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 text-zinc-900 dark:text-zinc-100">
      <ToolHeader
        title="Regex Debugger"
        subtitle="Pattern Validation Engine"
        icon={Bug}
      />

      {/* EXPRESSION CARD (Unique Layout) */}
      <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
          <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
            Expression
          </label>
          {error && (
            <span className="text-xs font-mono text-destructive flex items-center gap-2 bg-destructive/10 px-4 py-1.5 rounded-lg border border-destructive/20 animate-in fade-in slide-in-from-top-1">
              <AlertCircle size={14} className="shrink-0" /> {error}
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="flex-1 flex items-center gap-4 px-5 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 focus-within:ring-4 focus-within:ring-zinc-400/10 transition-all bg-zinc-50/30 dark:bg-zinc-900/10">
            <span className="text-zinc-300 dark:text-zinc-700 font-mono text-sm select-none">
              /
            </span>
            <input
              placeholder="enter_pattern_here..."
              value={pattern}
              onChange={(e) => handlePatternChange(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none font-mono text-sm placeholder:text-zinc-300 w-full"
              spellCheck={false}
            />
            <span className="text-zinc-300 dark:text-zinc-700 font-mono text-sm select-none">
              /
            </span>
          </div>

          <div className="flex items-center justify-center gap-1.5 p-2 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
            {AVAILABLE_FLAGS.map((f) => (
              <Toggle
                key={f.char}
                pressed={flags.includes(f.char)}
                onPressedChange={(on) =>
                  setFlags((prev) =>
                    on ? [...prev, f.char] : prev.filter((x) => x !== f.char)
                  )
                }
                className="w-10 h-10 shrink-0 rounded-lg data-[state=on]:bg-zinc-900 data-[state=on]:text-white dark:data-[state=on]:bg-white dark:data-[state=on]:text-black transition-all font-mono text-base font-bold"
              >
                {f.char}
              </Toggle>
            ))}
          </div>
        </div>
      </div>

      {/* WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* TEST STRING AREA (Using Reusable ActionPanel) */}
        <div className="lg:col-span-2">
          <ActionPanel
            label="Test String"
            icon={<TextCursorInput size={16} />}
            count={matches.length}
            onReset={() => setText("")}
          >
            <div className="relative h-125 md:h-150 font-mono text-base overflow-hidden">
              <div
                ref={scrollRef}
                aria-hidden="true"
                className="absolute inset-0 p-6 pointer-events-none whitespace-pre-wrap break-all overflow-auto text-transparent leading-relaxed"
              >
                {renderHighlightedText()}
              </div>
              <textarea
                className="relative w-full h-full p-6 bg-transparent border-none focus:ring-0 focus:outline-none resize-none whitespace-pre-wrap break-all font-mono leading-relaxed"
                placeholder="Paste content to test against..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onScroll={handleScroll}
                spellCheck={false}
              />
            </div>
          </ActionPanel>
        </div>

        {/* SIDEBAR REFERENCE (Styled to match ActionPanel aesthetic) */}
        <div className="space-y-6">
          <div className="flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm p-6 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
              <BookOpen size={16} /> Reference
            </h3>

            <div className="space-y-3">
              {AVAILABLE_FLAGS.map((f) => (
                <div
                  key={f.char}
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-xl border transition-all",
                    flags.includes(f.char)
                      ? "border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/50"
                      : "border-transparent opacity-30 grayscale"
                  )}
                >
                  <span className="font-mono text-sm font-bold bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded-md shrink-0">
                    {f.char}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold leading-tight">{f.label}</p>
                    <p className="text-xs text-zinc-500 mt-1 leading-normal">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <h3 className="font-black text-xs uppercase tracking-[0.2em] text-zinc-400">
                Token Guide
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 text-[13px] font-mono bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <p>
                  <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                    .
                  </span>{" "}
                  any char
                </p>
                <p>
                  <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                    \d
                  </span>{" "}
                  digit
                </p>
                <p>
                  <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                    \w
                  </span>{" "}
                  word
                </p>
                <p>
                  <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                    \s
                  </span>{" "}
                  space
                </p>
                <p>
                  <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                    ^
                  </span>{" "}
                  start
                </p>
                <p>
                  <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                    $
                  </span>{" "}
                  end
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
