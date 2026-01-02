"use client";

import { Ruler, Contrast, Type, RectangleHorizontal } from "lucide-react";
import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";
import Header from "@/components/shared/header";

const tools: Tool[] = [
  {
    title: "Unit Converter",
    desc: "PX, REM, VW, VH conversions.",
    href: "/tools/design/units",
    icon: <Ruler size={18} />,
    status: "ready",
  },
  {
    title: "Contrast Checker",
    desc: "WCAG contrast validation.",
    href: "/tools/design/contrast",
    icon: <Contrast size={18} />,
    status: "ready",
  },
  {
    title: "Fluid Type Scale",
    desc: "Responsive clamp() typography.",
    href: "/tools/design/typography",
    icon: <Type size={18} />,
    status: "ready",
  },
  {
    title: "Aspect Ratio",
    desc: "Aspect-ratio calculator.",
    href: "/tools/design/aspect-ratio",
    icon: <RectangleHorizontal size={18} />,
    status: "ready",
  },
];

export default function DesignHome() {
  return (
    <div className="p-8 space-y-12">
      <Header
        category="Design Utilities"
        title="Design Utilities"
        description="Precise tools for modern UI engineering."
      />
      <ToolGrid tools={tools} columns={3} />
    </div>
  );
}
