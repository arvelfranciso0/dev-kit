import { JsonLd } from "@/components/shared/json-ld";
import { categorySchemas, getRouteMetadata } from "@/lib/seo";
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

const path = "/tools/playgrounds";

export const metadata = getRouteMetadata(path);

export default function PlaygroundsHome() {
  return (
    <div className="p-8 space-y-12">
      <JsonLd data={categorySchemas(path)} />
      <Header
        category="Playgrounds"
        title="Code Playgrounds"
        description="Isolated HTML, CSS and JavaScript sandboxes with a live preview."
      />

      <ToolGrid tools={tools} columns={3} />
    </div>
  );
}
