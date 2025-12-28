"use client";

import { useState, useMemo } from "react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { Button } from "@/components/ui/button";
import { Braces, AlignLeft, Zap, FileJson, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatJSON, minifyJSON } from "@/lib/json-utils";

export default function Formatter() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formattedResult = useMemo(() => {
    if (!input) {
      setError(null);
      return "";
    }
    try {
      const result = formatJSON(input);
      setError(null);
      return result;
    } catch (e: any) {
      setError("Invalid JSON: " + e.message);
      return "";
    }
  }, [input]);

  const handleMinify = () => {
    try {
      const minified = minifyJSON(input);
      setInput(minified);
    } catch (e: any) {
      setError("Cannot minify: " + e.message);
    }
  };

  const handleCopy = () => {
    if (!formattedResult) return;
    navigator.clipboard.writeText(formattedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <ToolHeader
          title="JSON Formatter"
          subtitle="Data Structure Beautifier"
          icon={Braces}
        />

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleMinify}
            className="rounded-xl font-bold uppercase tracking-widest text-[10px] h-10 border-zinc-200 dark:border-zinc-800"
          >
            <Zap size={14} className="mr-2 text-amber-500" /> Minify Input
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUT PANEL */}
        <ActionPanel
          label="Raw JSON"
          count={input.length}
          onReset={() => setInput("")}
        >
          <div className="relative group h-125 md:h-150">
            <textarea
              className="w-full h-full p-6 bg-transparent resize-none focus:outline-none font-mono text-sm leading-relaxed"
              placeholder='Paste your JSON here... e.g. {"id": 1, "name": "DevKit"}'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
            />
            {error && (
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 backdrop-blur-md flex items-start gap-3 text-destructive animate-in fade-in slide-in-from-bottom-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <p className="text-xs font-mono leading-tight">{error}</p>
              </div>
            )}
          </div>
        </ActionPanel>

        {/* OUTPUT PANEL */}
        <ActionPanel
          label="Beautified"
          icon={<FileJson size={14} />}
          onCopy={handleCopy}
          isCopied={copied}
          variant="output"
        >
          <div className="h-125 md:h-150 overflow-auto bg-zinc-50/50 dark:bg-zinc-900/30">
            {formattedResult ? (
              <pre className="p-6 font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre">
                {formattedResult}
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-400 space-y-4">
                <AlignLeft size={32} strokeWidth={1} className="opacity-20" />
                <span className="text-xs font-bold uppercase tracking-widest italic">
                  Waiting for valid JSON...
                </span>
              </div>
            )}
          </div>
        </ActionPanel>
      </div>

      {/* QUICK STATUS BAR */}
      <div className="flex justify-between items-center px-6 py-4 rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-900/10">
        <div className="flex gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-zinc-400 tracking-tighter">
              Status
            </span>
            <span
              className={cn(
                "text-xs font-bold",
                error ? "text-destructive" : "text-emerald-500"
              )}
            >
              {error ? "Invalid Syntax" : input ? "Valid JSON" : "Idle"}
            </span>
          </div>
          <div className="flex flex-col border-l border-zinc-200 dark:border-zinc-800 pl-6">
            <span className="text-[10px] font-black uppercase text-zinc-400 tracking-tighter">
              Indent
            </span>
            <span className="text-xs font-bold">2 Spaces</span>
          </div>
        </div>
      </div>
    </div>
  );
}
