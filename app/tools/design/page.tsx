import { JsonLd } from "@/components/shared/json-ld";
import { categorySchemas, getRouteMetadata } from "@/lib/seo";
import { Ruler, Contrast, Type, RectangleHorizontal } from "lucide-react";
import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";
import Header from "@/components/shared/header";

const tools: Tool[] = [
  {
    title: "Unit Converter",
    desc: "Convert px, rem, vw, and pt values to every common CSS unit based on your project's root font size.",
    href: "/tools/design/units",
    icon: <Ruler size={18} />,
    status: "ready",
  },
  {
    title: "Contrast Checker",
    desc: "Ensure accessibility by validating foreground and background color combinations against WCAG 2.1 AA/AAA standards.",
    href: "/tools/design/contrast",
    icon: <Contrast size={18} />,
    status: "ready",
  },
  {
    title: "Fluid Type Scale",
    desc: "Generate smart CSS clamp() values to create typography that scales perfectly between mobile and desktop breakpoints.",
    href: "/tools/design/typography",
    icon: <Type size={18} />,
    status: "ready",
  },
  {
    title: "Aspect Ratio",
    desc: "Calculate precise dimensions and padding-top percentages for consistent media layouts and modern CSS aspect-ratio properties.",
    href: "/tools/design/aspect-ratio",
    icon: <RectangleHorizontal size={18} />,
    status: "ready",
  },
];

const path = "/tools/design";

export const metadata = getRouteMetadata(path);

export default function DesignHome() {
  return (
    <div className="p-8 space-y-12">
      <JsonLd data={categorySchemas(path)} />
      <Header
        category="Design Utilities"
        title="CSS Design Utilities"
        description="Convert CSS units, check WCAG color contrast, build fluid font sizes, and calculate aspect ratios."
      />
      <ToolGrid tools={tools} columns={3} />
    </div>
  );
}
