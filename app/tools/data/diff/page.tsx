"use client";

import { useState, useMemo } from "react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import {
  Diff,
  FileEdit,
  GitCompare,
  History,
  Layers,
  Split,
} from "lucide-react";
import { compareJson } from "@/lib/json-utils";
import { cn } from "@/lib/utils";
import { InfoSection } from "@/components/shared/info-section";
import { Textarea } from "@/components/ui/textarea";

export default function JsonDiffTool() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");

  const { changes, error } = useMemo(
    () => compareJson(original || "{}", modified || "{}"),
    [original, modified]
  );

  return (
    <div className="p-4 md:p-8 space-y-8">
      <ToolHeader
        title="JSON Diff"
        subtitle="Identify Structural Discrepancies"
        icon={<Diff />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActionPanel
          label="Original JSON"
          onReset={() => setOriginal("")}
          icon={<History />}
        >
          <textarea
            className="w-full h-64 p-4 bg-transparent resize-none focus:outline-none text-xs font-mono"
            placeholder='{ "id": 1, "status": "active" }'
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
          />
        </ActionPanel>

        <ActionPanel
          label="Modified JSON"
          onReset={() => setModified("")}
          icon={<FileEdit />}
        >
          <textarea
            className="w-full h-64 p-4 bg-transparent resize-none focus:outline-none text-xs font-mono"
            placeholder='{ "id": 1, "status": "pending" }'
            value={modified}
            onChange={(e) => setModified(e.target.value)}
          />
        </ActionPanel>
      </div>

      {/* DIFF OUTPUT AREA */}

      <ActionPanel label="Comparison Result" icon={<Split />}>
        <div className="p-6 overflow-x-auto">
          {error ? (
            <span className="text-[10px] font-bold text-red-500 uppercase">
              {error}
            </span>
          ) : (
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
          )}
        </div>
      </ActionPanel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t border-zinc-100 dark:border-zinc-800 pt-12">
        <InfoSection
          title="Structural Comparison"
          icon={GitCompare}
          description="Unlike standard text diffing, JSON Diff analyzes the underlying data structure. It identifies changes in keys, value types, and array order, ensuring that semantic differences are highlighted even if the formatting or white space varies."
        />
        <InfoSection
          title="Nested Object Tracking"
          icon={Layers}
          description="Complex applications often deal with deeply nested responses. This engine recursively traverses through every level of your JSON objects to pinpoint exactly where a value was modified, added, or removed in a clear, hierarchical view."
        />
      </div>
    </div>
  );
}
