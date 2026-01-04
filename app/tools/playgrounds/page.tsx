"use client";

import { Monitor, Code2, Globe, Cpu } from "lucide-react";
import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";
import Header from "@/components/shared/header";

const tools: Tool[] = [
  {
    title: "Web Lab",
    desc: "A high-performance HTML, CSS, and JavaScript playground with real-time rendering and asset isolation.",
    href: "/tools/playgrounds/web",
    icon: <Globe size={18} />,
    status: "ready",
  },
];

export default function PlaygroundsHome() {
  return (
    <div className="p-8 space-y-12">
      <Header
        category="Playgrounds"
        title="Interactive Sandboxes"
        description="Isolated environments for rapid prototyping and technical experimentation."
      />

      <ToolGrid tools={tools} columns={3} />
    </div>
  );
}
