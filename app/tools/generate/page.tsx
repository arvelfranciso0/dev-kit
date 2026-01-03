"use client";

import { Key, FileText, Droplets, Palette } from "lucide-react";
import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";
import Header from "@/components/shared/header";

const tools: Tool[] = [
  {
    title: "Password Generator",
    desc: "Generate cryptographically secure passwords with customizable entropy, length, and character complexity.",
    href: "/tools/generate/password",
    icon: <Key size={18} />,
    status: "ready",
  },
  {
    title: "README Architect",
    desc: "Build professional repository documentation using a modular, block-based builder designed for open-source projects.",
    href: "/tools/generate/readme",
    icon: <FileText size={18} />,
    status: "ready",
  },
  {
    title: "Shadow Generator",
    desc: "Design realistic, multi-layered CSS box shadows with fine-tuned control over blur, spread, and transparency.",
    href: "/tools/generate/shadow",
    icon: <Droplets size={18} />,
    status: "ready",
  },
  {
    title: "Color Palette",
    desc: "Create harmonious and accessible color schemes with export support for Tailwind, CSS, and Figma.",
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
