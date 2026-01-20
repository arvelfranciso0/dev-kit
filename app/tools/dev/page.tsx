"use client";

import { FileCode, GitCompare, GitBranch, Table2 } from "lucide-react";
import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";
import Header from "@/components/shared/header";

const tools: Tool[] = [
  {
    title: "Markdown Preview",
    desc: "Real-time GitHub-flavored Markdown editor and renderer with GFM support and synchronous scrolling.",
    href: "/tools/dev/markdown",
    icon: <FileCode size={18} />,
    status: "ready",
  },
  {
    title: "Diff Viewer",
    desc: "Perform side-by-side or unified visual comparisons between code snippets to track changes and resolve conflicts.",
    href: "/tools/dev/diff",
    icon: <GitCompare size={18} />,
    status: "ready",
  },
  {
    title: "Git Commands",
    desc: "A comprehensive reference for advanced Git workflows, including conventional commits and branching strategies.",
    href: "/tools/dev/git",
    icon: <GitBranch size={18} />,
    status: "ready",
  },
  {
    title: "DB Architect",
    desc: "Design and model database relationships using DBML with live visual feedback.",
    href: "/tools/dev/database-visualize",
    icon: <Table2 size={18} />,
    status: "ready",
  },
];

export default function DevToolsHome() {
  return (
    <div className="p-8 space-y-12">
      <Header
        category="Developer Tools"
        title="Developer Utilities"
        description="Tools built for everyday engineering workflows."
      />
      <ToolGrid tools={tools} columns={3} />
    </div>
  );
}
