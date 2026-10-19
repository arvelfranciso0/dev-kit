import { JsonLd } from "@/components/shared/json-ld";
import { categorySchemas, getRouteMetadata } from "@/lib/seo";
import Header from "@/components/shared/header";
import { Braces, FileJson, TableProperties, Diff, Eye } from "lucide-react";
import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";

const dataTools: Tool[] = [
  {
    title: "JSON Formatter",
    desc: "Beautify or minify JSON with customizable indentation and nesting.",
    href: "/tools/data/formatter",
    icon: <Braces size={18} />,
    status: "ready",
  },
  {
    title: "JSON to CSV",
    desc: "Convert hierarchical arrays into flat CSV structures for Excel.",
    href: "/tools/data/json-to-csv",
    icon: <FileJson size={18} />,
    status: "ready",
  },
  {
    title: "CSV to JSON",
    desc: "Parse raw spreadsheet data into clean, structured JSON objects.",
    href: "/tools/data/csv-to-json",
    icon: <TableProperties size={18} />,
    status: "ready",
  },
  {
    title: "JSON Diff",
    desc: "Compare two JSON structures and identify key-value discrepancies.",
    href: "/tools/data/diff",
    icon: <Diff size={18} />,
    status: "ready",
  },
  {
    title: "JSON Viewer",
    desc: "Explore large data sets in an interactive tree or table view.",
    href: "/tools/data/viewer",
    icon: <Eye size={18} />,
    status: "ready",
  },
];

const path = "/tools/data";

export const metadata = getRouteMetadata(path);

export default function JsonDataHome() {
  return (
    <div className="p-8 space-y-12 text-zinc-900 dark:text-zinc-100">
      <JsonLd data={categorySchemas(path)} />
      <Header
        category="Data Tools"
        title="JSON & Data Tools"
        description="Format, validate, compare, and convert JSON and CSV. All processing happens locally in your browser."
      />

      {/* TOOLS GRID */}
      <ToolGrid tools={dataTools} columns={3} />
    </div>
  );
}
