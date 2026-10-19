import { JsonLd } from "@/components/shared/json-ld";
import { categorySchemas, getRouteMetadata } from "@/lib/seo";
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
    desc: "Generate an 11-step 50–950 color scale from one hex color and copy it as CSS custom properties.",
    href: "/tools/generate/colors",
    icon: <Palette size={18} />,
    status: "ready",
  },
];

const path = "/tools/generate";

export const metadata = getRouteMetadata(path);

export default function GeneratorsHome() {
  return (
    <div className="p-8 space-y-12">
      <JsonLd data={categorySchemas(path)} />
      <Header
        category="Generators"
        title="Generators & Builders"
        description="Generate secure passwords, README files, layered CSS box shadows, and color scales."
      />
      <ToolGrid tools={tools} columns={3} />
    </div>
  );
}
