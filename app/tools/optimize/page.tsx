import { JsonLd } from "@/components/shared/json-ld";
import { categorySchemas, getRouteMetadata } from "@/lib/seo";
import { Minimize2, ShieldCheck } from "lucide-react";
import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";
import Header from "@/components/shared/header";

const tools: Tool[] = [
  {
    title: "SVG Optimizer",
    desc: "Compress and minify SVG vectors using SVGO to reduce file size without losing visual quality.",
    href: "/tools/optimize/svg",
    icon: <Minimize2 size={18} />,
    status: "ready",
  },
  {
    title: "HTML Sanitizer",
    desc: "Strip scripts, event handlers, and non-allowlisted tags from untrusted HTML using DOMPurify.",
    href: "/tools/optimize/html",
    icon: <ShieldCheck size={18} />,
    status: "ready",
  },
];

const path = "/tools/optimize";

export const metadata = getRouteMetadata(path);

export default function OptimizeHome() {
  return (
    <div className="p-8 space-y-12">
      <JsonLd data={categorySchemas(path)} />
      <Header
        category="Optimization"
        title="Optimization Tools"
        description="Minify SVG files with SVGO and sanitize untrusted HTML with DOMPurify."
      />
      <ToolGrid tools={tools} columns={3} />
    </div>
  );
}
