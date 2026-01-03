"use client";

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
    desc: "Strip malicious scripts and normalize messy markup into clean, safe, and valid HTML5.",
    href: "/tools/optimize/html",
    icon: <ShieldCheck size={18} />,
    status: "ready",
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
