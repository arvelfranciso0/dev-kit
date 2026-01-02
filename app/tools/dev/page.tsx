"use client";

import { FileCode, GitCompare, GitBranch } from "lucide-react";
import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";
import Header from "@/components/shared/header";

const tools: Tool[] = [
  {
    title: "Markdown Preview",
    desc: "Live GitHub-style rendering.",
    href: "/tools/dev/markdown",
    icon: <FileCode size={18} />,
    status: "ready",
  },
  {
    title: "Diff Viewer",
    desc: "Side-by-side code comparison.",
    href: "/tools/dev/diff",
    icon: <GitCompare size={18} />,
    status: "ready",
  },
  {
    title: "Git Commands",
    desc: "Interactive git reference.",
    href: "/tools/dev/git",
    icon: <GitBranch size={18} />,
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
