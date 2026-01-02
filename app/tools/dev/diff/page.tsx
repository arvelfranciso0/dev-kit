"use client";

import { useState, useMemo } from "react";
import { formatLines, diffLines } from "unidiff";
import { parseDiff, Diff, Hunk } from "react-diff-view";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitCompare, Trash2, Columns, Rows } from "lucide-react";
import "react-diff-view/style/index.css";
import { InfoSection } from "@/components/shared/info-section";

export default function DiffViewer() {
  const [oldCode, setOldCode] = useState("");
  const [newCode, setNewCode] = useState("");
  const [viewType, setViewType] = useState<"split" | "unified">("split");

  // Memoize the diff calculation for performance
  const diffData = useMemo(() => {
    if (!oldCode && !newCode) return null;

    // Create a unified diff string
    const diffText = formatLines(diffLines(oldCode, newCode), { context: 3 });
    // Parse it into a file object
    const [file] = parseDiff(diffText);
    return file;
  }, [oldCode, newCode]);

  return (
    <div className="p-4 md:p-8 space-y-8">
      <ToolHeader
        title="Diff Viewer"
        subtitle="Compare code snippets side-by-side with high-precision highlighting."
        icon={<GitCompare />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActionPanel label="Original Code" onReset={() => setOldCode("")}>
          <div className="p-4 space-y-4">
            <Textarea
              placeholder="Paste original code..."
              className="min-h-75 font-mono text-[11px] bg-zinc-50 dark:bg-zinc-950 border-none rounded-2xl"
              value={oldCode}
              onChange={(e) => setOldCode(e.target.value)}
            />
          </div>
        </ActionPanel>

        <ActionPanel label="Modified Code" onReset={() => setNewCode("")}>
          <div className="p-4 space-y-4">
            <Textarea
              placeholder="Paste modified code..."
              className="min-h-75 font-mono text-[11px] bg-zinc-50 dark:bg-zinc-950 border-none rounded-2xl"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
            />
          </div>
        </ActionPanel>
      </div>

      {diffData && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-900 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <Tabs value={viewType} onValueChange={(v) => setViewType(v as any)}>
              <TabsList className="bg-transparent">
                <TabsTrigger value="split" className="gap-2">
                  <Columns size={14} /> Split
                </TabsTrigger>
                <TabsTrigger value="unified" className="gap-2">
                  <Rows size={14} /> Unified
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setOldCode("");
                setNewCode("");
              }}
            >
              <Trash2 size={14} className="mr-2" /> Clear
            </Button>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-950 shadow-sm">
            <Diff
              viewType={viewType}
              hunks={diffData.hunks || []}
              diffType="modify"
            >
              {(hunks) =>
                hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)
              }
            </Diff>

            {diffData.hunks?.length === 0 && (
              <div className="p-20 text-center text-zinc-400 text-xs uppercase tracking-widest font-bold">
                No changes detected
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t border-zinc-100 dark:border-zinc-800 pt-12">
        <InfoSection
          title="Why Side-by-Side?"
          icon={Columns}
          description="Side-by-side (split) diffing provides a spatial context that unified views often lack. It allows you to see the logical flow of changes relative to their original position, making it easier to spot accidental deletions or indentation errors."
        />
        <InfoSection
          title="Algorithm Precision"
          icon={GitCompare}
          description="The underlying comparison engine uses the Myers diff algorithm to find the shortest path of changes. This ensures that the generated diff is human-readable and accurately represents moved or modified blocks of code rather than just random lines."
        />
      </div>
    </div>
  );
}
