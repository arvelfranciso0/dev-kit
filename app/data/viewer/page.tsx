"use client";

import { useState, useMemo } from "react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { Eye, Table, TreeDeciduous, Search, Info } from "lucide-react";
import { JsonView, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { cn } from "@/lib/utils";

export default function DataViewer() {
  const [input, setInput] = useState("");
  const [viewMode, setViewMode] = useState<"tree" | "table">("tree");

  const parsedData = useMemo(() => {
    try {
      return input ? JSON.parse(input) : null;
    } catch (e) {
      return { error: "Invalid JSON format" };
    }
  }, [input]);

  const isArrayOfObjects =
    Array.isArray(parsedData) && typeof parsedData[0] === "object";

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <ToolHeader
          title="Data Viewer"
          subtitle="Interactive Dataset Exploration"
          icon={<Eye />}
        />

        {/* VIEW MODE TOGGLE */}
        <div className="flex gap-1 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setViewMode("tree")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
              viewMode === "tree"
                ? "bg-white dark:bg-zinc-800 shadow-sm"
                : "opacity-50 hover:opacity-100"
            )}
          >
            <TreeDeciduous size={14} /> Tree
          </button>
          <button
            disabled={!isArrayOfObjects}
            onClick={() => setViewMode("table")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
              viewMode === "table"
                ? "bg-white dark:bg-zinc-800 shadow-sm"
                : "opacity-50 hover:opacity-100",
              !isArrayOfObjects && "cursor-not-allowed grayscale"
            )}
          >
            <Table size={14} /> Table
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* INPUT SOURCE */}
        <div className="lg:col-span-1">
          <ActionPanel label="Raw JSON Source" onReset={() => setInput("")}>
            <textarea
              className="w-full h-[600px] p-4 bg-transparent resize-none focus:outline-none text-xs font-mono leading-relaxed"
              placeholder="Paste your JSON array or object here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
            />
          </ActionPanel>
        </div>

        {/* INTERACTIVE VIEWER */}
        <div className="lg:col-span-2 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Inspector Output
            </span>
            {parsedData && !parsedData.error && (
              <div className="flex gap-4 text-[10px] font-mono text-zinc-500">
                <span>
                  Type: {Array.isArray(parsedData) ? "Array" : "Object"}
                </span>
                <span>
                  Size: {new TextEncoder().encode(input).length} bytes
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-auto p-6">
            {parsedData?.error ? (
              <div className="h-full flex flex-col items-center justify-center text-rose-500 gap-2 opacity-50">
                <Info size={24} />
                <span className="text-[10px] font-bold uppercase tracking-tighter">
                  {parsedData.error}
                </span>
              </div>
            ) : !parsedData ? (
              <div className="h-full flex items-center justify-center text-zinc-300 italic text-sm">
                Awaiting data input...
              </div>
            ) : viewMode === "tree" ? (
              <div className="font-mono text-sm custom-json-view">
                <JsonView
                  data={parsedData}
                  shouldExpandNode={(level) => level < 2}
                  style={defaultStyles}
                />
              </div>
            ) : (
              <DataTable data={parsedData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for Table View
function DataTable({ data }: { data: any[] }) {
  if (!Array.isArray(data) || data.length === 0) return null;
  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800">
            {headers.map((h) => (
              <th
                key={h}
                className="py-2 px-4 text-[10px] font-black uppercase tracking-widest text-zinc-400"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-xs font-mono">
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-b border-zinc-100 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
            >
              {headers.map((h) => (
                <td key={h} className="py-2 px-4 truncate max-w-[200px]">
                  {typeof row[h] === "object" ? "{...}" : String(row[h])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
