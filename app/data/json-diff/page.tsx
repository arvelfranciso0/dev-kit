"use client";

import { useState, useMemo } from "react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { Diff, Split, Trash2 } from "lucide-react";
import { compareJson } from "@/lib/json-utils";
import { cn } from "@/lib/utils";

export default function JsonDiffTool() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");

  const { changes, error } = useMemo(
    () => compareJson(original || "{}", modified || "{}"),
    [original, modified]
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <ToolHeader
        title="JSON Diff"
        subtitle="Identify Structural Discrepancies"
        icon={<Diff />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActionPanel label="Original JSON" onReset={() => setOriginal("")}>
          <textarea
            className="w-full h-64 p-4 bg-transparent resize-none focus:outline-none text-xs font-mono"
            placeholder='{ "id": 1, "status": "active" }'
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
          />
        </ActionPanel>

        <ActionPanel label="Modified JSON" onReset={() => setModified("")}>
          <textarea
            className="w-full h-64 p-4 bg-transparent resize-none focus:outline-none text-xs font-mono"
            placeholder='{ "id": 1, "status": "pending" }'
            value={modified}
            onChange={(e) => setModified(e.target.value)}
          />
        </ActionPanel>
      </div>

      {/* DIFF OUTPUT AREA */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20">
          <div className="flex items-center gap-2">
            <Split size={14} className="text-zinc-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
              Comparison Result
            </span>
          </div>
          {error && (
            <span className="text-[10px] font-bold text-red-500 uppercase">
              {error}
            </span>
          )}
        </div>

        <div className="p-6 overflow-x-auto">
          <pre className="text-xs font-mono leading-relaxed">
            {changes.map((part, index) => (
              <div
                key={index}
                className={cn(
                  "px-2 py-0.5 rounded-sm my-0.5",
                  part.added &&
                    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-l-2 border-emerald-500",
                  part.removed &&
                    "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-l-2 border-rose-500 line-through opacity-70",
                  !part.added && !part.removed && "text-zinc-500 opacity-50"
                )}
              >
                {/* Prefix markers for clarity */}
                <span className="inline-block w-4 select-none mr-2">
                  {part.added ? "+" : part.removed ? "-" : " "}
                </span>
                {part.value}
              </div>
            ))}
            {!original && !modified && (
              <div className="py-12 text-center opacity-20 italic">
                Input JSON data above to see differences...
              </div>
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
