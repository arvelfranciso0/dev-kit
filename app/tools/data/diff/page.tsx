"use client";

import { useState, useMemo } from "react";
import { parseDiff, Diff, Hunk } from "react-diff-view";
import { formatLines, diffLines } from "unidiff";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { CodeEditor } from "@/components/shared/code-mirror";
import { InfoSection } from "@/components/shared/info-section";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Diff as DiffIcon,
  FileEdit,
  GitCompare,
  History,
  Layers,
  Columns,
  Rows,
  Check,
  Info,
} from "lucide-react";
import "react-diff-view/style/index.css";

export default function JsonDiffTool() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [viewType, setViewType] = useState<"split" | "unified">("split");

  const diffData = useMemo(() => {
    if (!original && !modified) return null;

    try {
      const oldObj = original
        ? JSON.stringify(JSON.parse(original), null, 2)
        : "";
      const newObj = modified
        ? JSON.stringify(JSON.parse(modified), null, 2)
        : "";

      const diffText = formatLines(diffLines(oldObj, newObj), { context: 3 });

      const [file] = parseDiff(diffText);
      return file;
    } catch (e) {
      return { error: "Invalid JSON format" };
    }
  }, [original, modified]);

  const hasChanges =
    diffData && "hunks" in diffData && diffData.hunks.length > 0;
  const isError = diffData && "error" in diffData;

  return (
    <div className="p-4 md:p-8 space-y-8">
      <ToolHeader
        title="JSON Diff"
        subtitle="Compare JSON structures with precision"
        icon={<DiffIcon />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActionPanel
          label="Original JSON"
          onReset={() => setOriginal("")}
          icon={<History />}
        >
          <CodeEditor
            value={original}
            onChange={setOriginal}
            containerClassName="h-120"
            editable
            mode="json"
          />
        </ActionPanel>

        <ActionPanel
          label="Modified JSON"
          onReset={() => setModified("")}
          icon={<FileEdit />}
        >
          <CodeEditor
            value={modified}
            onChange={setModified}
            containerClassName="h-120"
            editable
            mode="json"
          />
        </ActionPanel>
      </div>

      <ActionPanel label="Comparison Result" icon={<GitCompare size={14} />}>
        <div className="p-4 space-y-4">
          {/* View Switcher */}
          <div className="flex justify-between items-center">
            <Tabs value={viewType} onValueChange={(v) => setViewType(v as any)}>
              <TabsList className="bg-zinc-100 dark:bg-zinc-900 rounded-xl">
                <TabsTrigger value="split" className="text-xs gap-2">
                  <Columns size={12} /> Split
                </TabsTrigger>
                <TabsTrigger value="unified" className="text-xs gap-2">
                  <Rows size={12} /> Unified
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-950">
            {hasChanges ? (
              <Diff
                viewType={viewType}
                hunks={diffData.hunks || []}
                diffType="modify"
              >
                {(hunks) =>
                  hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)
                }
              </Diff>
            ) : (
              <div className="p-20 flex flex-col items-center justify-center text-zinc-400">
                {isError ? (
                  <>
                    <Info size={32} className="text-red-400 mb-4" />
                    <p className="text-xs font-black uppercase tracking-widest text-red-400">
                      Fix JSON Errors to Compare
                    </p>
                  </>
                ) : (
                  <>
                    <Check size={32} className="text-emerald-500 mb-4" />
                    <p className="text-xs font-black uppercase tracking-widest text-emerald-500">
                      No Changes Detected
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
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
