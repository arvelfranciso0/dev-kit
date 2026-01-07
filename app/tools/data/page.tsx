"use client";

import { Braces, FileJson, TableProperties, Diff, Eye } from "lucide-react";
import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";

const dataTools: Tool[] = [
  {
    title: "JSON Formatter",
    desc: "Beautify or minify JSON with customizable indentation and nesting.",
    href: "/data/formatter",
    icon: <Braces size={18} />,
    status: "ready",
  },
  {
    title: "JSON to CSV",
    desc: "Convert hierarchical arrays into flat CSV structures for Excel.",
    href: "/data/json-csv",
    icon: <FileJson size={18} />,
    status: "ready",
  },
  {
    title: "CSV to JSON",
    desc: "Parse raw spreadsheet data into clean, structured JSON objects.",
    href: "/data/csv-json",
    icon: <TableProperties size={18} />,
    status: "ready",
  },
  {
    title: "JSON Diff",
    desc: "Compare two JSON structures and identify key-value discrepancies.",
    href: "/data/json-diff",
    icon: <Diff size={18} />,
    status: "ready",
  },
  {
    title: "Data Viewer",
    desc: "Explore large data sets in an interactive tree or table view.",
    href: "/data/viewer",
    icon: <Eye size={18} />,
    status: "ready",
  },
];

export default function JsonDataHome() {
  return (
    <div className="p-8 space-y-12 text-zinc-900 dark:text-zinc-100">
      {/* HEADER */}
      <div className="space-y-4 border-b border-zinc-100 dark:border-zinc-800 pb-10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
          <span>TOOLS</span>
          <span className="text-zinc-200 dark:text-zinc-800">/</span>
          <span className="text-zinc-900 dark:text-zinc-100">JSON & Data</span>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            Data Manipulation
          </h1>
          <p className="text-zinc-500 max-w-xl text-sm leading-relaxed">
            Format, validate, and convert structured data formats. Built to
            handle large payloads with local-only browser processing.
          </p>
        </div>
      </div>

      {/* TOOLS GRID */}
      <ToolGrid tools={dataTools} columns={3} />
    </div>
  );
}
