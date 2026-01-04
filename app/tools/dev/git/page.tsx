"use client";

import { useState } from "react";
import {
  Terminal,
  Search,
  RotateCcw,
  FileText,
  Lightbulb,
  CheckCircle2,
  GitBranch,
  History,
  MessageSquareCode,
  Tag,
} from "lucide-react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InfoSection } from "@/components/shared/info-section";
import CopiedStatus from "@/components/shared/copied-status";
import { GIT_COMMANDS } from "@/configs/git-commands";
import { MetadataCard } from "@/components/shared/meta-card";
import { CopyItem } from "@/components/shared/copy-item";

const CONVENTIONAL_TYPES = [
  { type: "feat", desc: "A new feature" },
  { type: "fix", desc: "A bug fix" },
  { type: "docs", desc: "Documentation only changes" },
  {
    type: "style",
    desc: "Changes that do not affect the meaning of the code (white-space, formatting, etc)",
  },
  {
    type: "refactor",
    desc: "A code change that neither fixes a bug nor adds a feature",
  },
  { type: "perf", desc: "A code change that improves performance" },
  { type: "test", desc: "Adding missing tests or correcting existing tests" },
  {
    type: "chore",
    desc: "Changes to the build process or auxiliary tools and libraries",
  },
];

export default function GitCheatSheet() {
  const [search, setSearch] = useState("");

  const filteredCommands = GIT_COMMANDS.map((cat) => ({
    ...cat,
    commands: cat.commands.filter(
      (c) =>
        c.cmd.toLowerCase().includes(search.toLowerCase()) ||
        c.desc.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.commands.length > 0);

  const allCommandsText = GIT_COMMANDS.flatMap((cat) =>
    cat.commands.map((c) => `${c.cmd} # ${c.desc}`)
  ).join("\n");

  return (
    <div className="flex flex-col p-4 lg:p-8 space-y-6 h-full">
      <ToolHeader
        title="Git Cheat Sheet"
        subtitle="Interactive reference for advanced Git commands"
        icon={<Terminal />}
      />

      <ActionPanel
        label="Git Reference"
        icon={<FileText size={14} />}
        copyValue={allCommandsText}
        variant="output"
      >
        <div className="flex flex-col space-y-8 p-6 min-h-125 bg-zinc-50/50 dark:bg-zinc-900/30">
          {/* Search Bar */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                size={16}
              />
              <Input
                placeholder="Search commands..."
                className="pl-10 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {search && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearch("")}
                className="text-zinc-500"
              >
                <RotateCcw size={14} className="mr-2" /> Reset
              </Button>
            )}
          </div>

          {/* Grid of Commands */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCommands.map((section) => (
              <ActionPanel
                label={section.category}
                key={section.category}
                variant={"output"}
              >
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {section.commands.map((item, idx) => (
                    <CopyItem
                      copyValue={item.cmd}
                      key={idx}
                      className="group p-4 hover:bg-amber-500/5 transition-colors cursor-pointer"
                    >
                      <div className="flex flex-col gap-1">
                        <code className="text-xs font-bold text-amber-600 dark:text-amber-500 font-mono">
                          {item.cmd}
                        </code>
                        <p className="text-[11px] text-zinc-500 leading-tight">
                          {item.desc}
                        </p>
                      </div>
                    </CopyItem>
                  ))}
                </div>
              </ActionPanel>
            ))}
          </div>

          {/* Conventional Commits Reference List */}
          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 mb-6">
              <Tag className="text-amber-500" size={18} />
              <h3 className="text-sm font-bold uppercase tracking-widest">
                Conventional Commit Types
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CONVENTIONAL_TYPES.map((item) => (
                <div
                  key={item.type}
                  className="flex flex-col p-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
                >
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    {item.type}
                  </span>
                  <span className="text-[10px] text-zinc-500 leading-normal">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Best Practices Section */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="text-amber-500" size={18} />
              <h3 className="text-sm font-bold uppercase tracking-widest">
                Commit Best Practices
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Use imperative mood ('fix' not 'fixed')",
                "Subject line limit: 50 chars",
                "Explain 'what' and 'why', not 'how'",
                "Atomic commits (one change per commit)",
              ].map((tip, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
                >
                  <CheckCircle2
                    size={14}
                    className="text-emerald-500 shrink-0"
                  />
                  <span className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    {tip}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ActionPanel>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 border-t pt-12">
        <InfoSection
          title="Atomic Commits"
          icon={GitBranch}
          description="Keep commits small and focused on a single logical change. This makes history easier to browse and safer to revert."
        />
        <InfoSection
          title="Conventional Commits"
          icon={MessageSquareCode}
          description="A specification for adding human and machine readable meaning to commit messages, allowing for automated tools."
        />
        <InfoSection
          title="Clean History (Rebase)"
          icon={History}
          description="Rebasing rewrites project history by moving your local changes to the tip of the target branch for a linear timeline."
        />
      </div>
    </div>
  );
}
