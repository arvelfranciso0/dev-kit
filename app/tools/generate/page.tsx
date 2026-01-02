"use client";

import { Key, FileText, Droplets, Palette } from "lucide-react";
import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";
import Header from "@/components/shared/header";

const tools: Tool[] = [
  {
    title: "Password Generator",
    desc: "Entropy-based secure passwords.",
    href: "/tools/generate/password",
    icon: <Key size={18} />,
    status: "ready",
  },
  {
    title: "README Architect",
    desc: "Composable README builder.",
    href: "/tools/generate/readme",
    icon: <FileText size={18} />,
    status: "ready",
  },
  {
    title: "Shadow Generator",
    desc: "CSS shadow presets.",
    href: "/tools/generate/shadow",
    icon: <Droplets size={18} />,
    status: "ready",
  },
  {
    title: "Color Palette",
    desc: "Accessible color scales.",
    href: "/tools/generate/colors",
    icon: <Palette size={18} />,
    status: "ready",
  },
];

export default function GeneratorsHome() {
  return (
    <div className="p-8 space-y-12">
      <Header
        category="Generators"
        title="Generators & Builders"
        description="Generate production-ready assets in seconds."
      />
      <ToolGrid tools={tools} columns={3} />
    </div>
  );
}
