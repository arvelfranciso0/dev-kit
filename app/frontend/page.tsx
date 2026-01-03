"use client";

import {
  Palette,
  Ruler,
  Layout,
  Type,
  Maximize,
  Image as ImageIcon,
  Framer,
  Code2,
  ShieldCheck,
} from "lucide-react";
import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";

const tools: Tool[] = [
  {
    title: "Unit Converter",
    desc: "Universal mapping between PX, REM, Viewport (VW/VH), and Character (CH) units.",
    href: "/frontend/unit-converter",
    icon: <Ruler size={18} />,
    status: "ready",
  },
  {
    title: "Color Palette",
    desc: "Generate accessible 50-950 design scales using LCH perceptual interpolation math.",
    href: "/frontend/color-palette",
    icon: <Palette size={18} />,
    status: "ready",
  },
  {
    title: "Shadow Generator",
    desc: "Design layered, organic shadows using easing curves for realistic depth and occlusion.",
    href: "/frontend/shadow-generator",
    icon: <Layout size={18} />,
    status: "ready",
  },
  {
    title: "Contrast Checker",
    desc: "Validate WCAG 2.1 compliance with real-time contrast ratios and accessibility scoring.",
    href: "/frontend/contrast-checker",
    icon: <ShieldCheck size={18} />, // Changed from Palette to avoid duplication
    status: "soon",
  },
  {
    title: "Fluid Type Scale",
    desc: "Create responsive clamp() typography that scales smoothly between mobile and desktop.",
    href: "/frontend/fluid-type",
    icon: <Type size={18} />,
    status: "soon",
  },

  {
    title: "Aspect Ratio",
    desc: "Calculate modern CSS aspect-ratio properties and legacy padding-top container hacks.",
    href: "/frontend/aspect-ratio",
    icon: <Maximize size={18} />,
    status: "soon",
  },
  {
    title: "SVG Optimizer",
    desc: "Minify paths and strip XML metadata using SVGO logic for lightweight web assets.",
    href: "/frontend/svg-optimizer",
    icon: <ImageIcon size={18} />,
    status: "soon",
  },
];

export default function FrontendDesignHome() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 text-zinc-900 dark:text-zinc-100">
      {/* HEADER */}
      <div className="space-y-4 border-b border-zinc-100 dark:border-zinc-800 pb-10">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          <span>TOOLS</span>
          <span className="text-zinc-200 dark:text-zinc-800">/</span>
          <span className="text-zinc-900 dark:text-zinc-100">
            Frontend & Design
          </span>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            UI & Engineering Suite
          </h1>
          <p className="text-zinc-500 max-w-xl text-sm leading-relaxed">
            A collection of precision utilities for design systems, CSS
            architecture, and asset optimization. Built for developers who care
            about the details.
          </p>
        </div>
      </div>

      {/* TOOLS GRID */}
      <ToolGrid tools={tools} columns={3} />
    </div>
  );
}
