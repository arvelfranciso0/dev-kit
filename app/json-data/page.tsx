"use client";

import Link from "next/link";
import {
  Braces,
  FileCheck,
  FileJson,
  TableProperties,
  Diff,
  Eye,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const dataTools = [
  {
    title: "JSON Formatter",
    desc: "Beautify or minify JSON with customizable indentation and nesting.",
    href: "/json-data/formatter",
    icon: <Braces size={18} />,
    status: "ready", // Assuming you'll build this next!
  },
  {
    title: "JSON Validator",
    desc: "Strict syntax checking and error highlighting for complex objects.",
    href: "/json-data/validator",
    icon: <FileCheck size={18} />,
    status: "soon",
  },
  {
    title: "JSON to CSV",
    desc: "Convert hierarchical arrays into flat CSV structures for Excel.",
    href: "/json-data/json-to-csv",
    icon: <FileJson size={18} />,
    status: "soon",
  },
  {
    title: "CSV to JSON",
    desc: "Parse raw spreadsheet data into clean, structured JSON objects.",
    href: "/json-data/csv-to-json",
    icon: <TableProperties size={18} />,
    status: "soon",
  },
  {
    title: "JSON Diff",
    desc: "Compare two JSON structures and identify key-value discrepancies.",
    href: "/json-data/diff",
    icon: <Diff size={18} />,
    status: "soon",
  },
  {
    title: "Data Viewer",
    desc: "Explore large data sets in an interactive tree or table view.",
    href: "/json-data/viewer",
    icon: <Eye size={18} />,
    status: "soon",
  },
];

export default function JsonDataHome() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 text-zinc-900 dark:text-zinc-100">
      {/* HEADER */}
      <div className="space-y-4 border-b border-zinc-100 dark:border-zinc-800 pb-10">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          <span>Utilities</span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dataTools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.status === "ready" ? tool.href : "#"}
            className={cn(
              "group relative flex flex-col justify-between p-6 h-48 rounded-xl border transition-all duration-200",
              tool.status === "ready"
                ? "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-900 dark:hover:border-zinc-100 hover:shadow-sm"
                : "border-dashed border-zinc-200 dark:border-zinc-800 opacity-60 cursor-not-allowed"
            )}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {tool.icon}
                </div>
                {tool.status === "ready" ? (
                  <ArrowUpRight
                    size={14}
                    className="text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors"
                  />
                ) : (
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                    Soon
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm tracking-tight">
                  {tool.title}
                </h3>
                <p className="text-[11px] text-zinc-500 leading-normal mt-1">
                  {tool.desc}
                </p>
              </div>
            </div>

            {tool.status === "ready" && (
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                Open Tool <ArrowRight size={10} />
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* FOOTER METADATA */}
      <div className="flex justify-between items-center text-[10px] opacity-30 font-mono pt-12">
        <div className="flex gap-4">
          <span>DATA_NODE_STABLE</span>
          <span>COMPRESSION: ENABLED</span>
        </div>
        <span>V 1.0.2</span>
      </div>
    </div>
  );
}
