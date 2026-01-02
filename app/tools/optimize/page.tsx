"use client";

import { Minimize2, ShieldCheck } from "lucide-react";
import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";
import Header from "@/components/shared/header";

const tools: Tool[] = [
  {
    title: "SVG Optimizer",
    desc: "SVGO-based SVG minification.",
    href: "/tools/optimize/svg",
    icon: <Minimize2 size={18} />,
    status: "ready",
  },
  {
    title: "HTML Sanitizer",
    desc: "Clean and normalize HTML.",
    href: "/tools/optimize/html",
    icon: <ShieldCheck size={18} />,
    status: "soon",
  },
];

export default function OptimizeHome() {
  return (
    <div className="p-8 space-y-12">
      <Header
        category="Optimization"
        title="Optimization Tools"
        description="Reduce size, improve performance, and clean output."
      />
      <ToolGrid tools={tools} columns={3} />
    </div>
  );
}
