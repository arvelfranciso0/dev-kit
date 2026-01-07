"use client";

import { useState, useMemo } from "react";
import { formatLines, diffLines } from "unidiff";
import { parseDiff, Diff, Hunk } from "react-diff-view";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitCompare, Columns, Rows, Check } from "lucide-react";
import "react-diff-view/style/index.css";
import { InfoSection } from "@/components/shared/info-section";
import { CodeEditor } from "@/components/shared/code-mirror";
import { cn } from "@/lib/utils";

export default function DiffViewer() {
  const [oldCode, setOldCode] = useState("");
  const [newCode, setNewCode] = useState("");
  const [viewType, setViewType] = useState<"split" | "unified">("split");

  const diffData = useMemo(() => {
    if (!oldCode && !newCode) return null;
    const diffText = formatLines(diffLines(oldCode, newCode), { context: 3 });
    const [file] = parseDiff(diffText);
    return file;
  }, [oldCode, newCode]);

  const hasChanges = diffData && diffData.hunks && diffData.hunks.length > 0;

  return (
    <div className="p-4 md:p-8 space-y-8">
      <ToolHeader
        title="Diff Viewer"
        subtitle="Compare code snippets side-by-side with high-precision highlighting."
        icon={<GitCompare />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActionPanel label="Original Code" onReset={() => setOldCode("")}>
          <CodeEditor
            editable={true}
            value={oldCode}
            onChange={(value) => setOldCode(value)}
            containerClassName="h-162.5"
          />
        </ActionPanel>

        <ActionPanel label="Modified Code" onReset={() => setNewCode("")}>
          <CodeEditor
            editable={true}
            value={newCode}
            onChange={(value) => setNewCode(value)}
            containerClassName="h-162.5"
          />
        </ActionPanel>
      </div>

      {diffData && (
        <ActionPanel
          label="Comparison Result"
          icon={<GitCompare size={14} />}
          onReset={() => {
            setOldCode("");
            setNewCode("");
          }}
        >
          <div className="p-4 space-y-4">
            {/* View Switcher */}
            <div className="flex justify-start">
              <Tabs
                value={viewType}
                onValueChange={(v) => setViewType(v as any)}
                className="w-auto"
              >
                <TabsList className="bg-zinc-100 dark:bg-zinc-900 h-9 p-1 rounded-xl">
                  <TabsTrigger
                    value="split"
                    className="text-xs gap-2 rounded-lg"
                  >
                    <Columns size={12} /> Split
                  </TabsTrigger>
                  <TabsTrigger
                    value="unified"
                    className="text-xs gap-2 rounded-lg"
                  >
                    <Rows size={12} /> Unified
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Diff Window */}
            <div className="rounded-2xl border verflow-hidden shadow-sm">
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
                <div className="p-20 flex flex-col items-center justify-center space-y-4 text-zinc-400">
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-full">
                    <Check size={24} className="text-emerald-500" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest">
                    No changes detected
                  </p>
                </div>
              )}
            </div>
          </div>
        </ActionPanel>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t border-zinc-100 dark:border-zinc-800 pt-12">
        <InfoSection
          title="Why Side-by-Side?"
          icon={Columns}
          description="Side-by-side diffing provides spatial context. It allows you to see the logical flow of changes relative to their original position, making it easier to spot errors."
        />
        <InfoSection
          title="Algorithm Precision"
          icon={GitCompare}
          description="Uses the Myers diff algorithm to find the shortest path of changes, ensuring the output represents modified blocks accurately rather than random lines."
        />
      </div>
    </div>
  );
}
