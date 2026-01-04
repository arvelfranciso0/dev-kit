"use client";

import { useState } from "react";
import {
  toUpper,
  toLower,
  toCamelCase,
  toSnakeCase,
  // Assuming toPascalCase exists in your utils, if not:
  // (str) => str.replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase()).replace(/\s+/g, '')
} from "@/lib/string-utils";
import {
  Type,
  Zap,
  CaseUpper,
  CaseLower,
  Codepen,
  Terminal,
  Hash,
  Box,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Shared Components
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { InfoSection } from "@/components/shared/info-section";
import { MetadataCard } from "@/components/shared/meta-card";
import { Input } from "@/components/ui/input";

export default function CaseConverter() {
  const [text, setText] = useState("");

  const conversions = [
    { label: "UPPERCASE", value: toUpper(text), icon: <CaseUpper size={16} /> },
    { label: "lowercase", value: toLower(text), icon: <CaseLower size={16} /> },
    {
      label: "camelCase",
      value: toCamelCase(text),
      icon: <Codepen size={16} />,
    },
    {
      label: "snake_case",
      value: toSnakeCase(text),
      icon: <Terminal size={16} />,
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header & Metrics */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <ToolHeader
          title="Case Converter"
          subtitle="Transform strings between common programming naming conventions."
          icon={<Type />}
        />

        <div className="flex justify-end">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto md:min-w-100">
            <MetadataCard
              icon={<Hash size={14} className="text-zinc-400" />}
              label="Characters"
              value={text.length.toString()}
            />
            <MetadataCard
              icon={<Zap size={14} className="text-amber-500" />}
              label="Words"
              value={
                text.trim() ? text.trim().split(/\s+/).length.toString() : "0"
              }
            />
          </div>
        </div>
      </div>

      {/* Input Section */}
      <ActionPanel label="String Input" onReset={() => setText("")}>
        <div className="p-6">
          <Input
            placeholder="Type or paste text to transform..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="h-14 px-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-lg font-medium placeholder:text-zinc-400 focus-visible:ring-zinc-200 dark:focus-visible:ring-zinc-800 transition-all"
          />
        </div>
      </ActionPanel>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {conversions.map(({ label, value, icon }) => (
          <ActionPanel
            key={label}
            label={label}
            icon={icon}
            variant="output"
            copyValue={value}
          >
            <div className="p-6 font-mono text-base break-all min-h-25 flex items-center bg-white dark:bg-zinc-950/50">
              {value ? (
                <span className="text-zinc-900 dark:text-zinc-100 animate-in fade-in slide-in-from-left-2 duration-300">
                  {value}
                </span>
              ) : (
                <span className="text-zinc-400 italic text-sm">
                  Waiting for input...
                </span>
              )}
            </div>
          </ActionPanel>
        ))}
      </div>

      {/* Documentation Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t border-zinc-100 dark:border-zinc-800 pt-12">
        <InfoSection
          title="Naming Conventions"
          icon={CaseUpper}
          description="Consistency is key in clean code. Whether you are switching a database schema to snake_case or a React component to PascalCase, this utility ensures your identifiers match your project standards."
        />
        <InfoSection
          title="Refactoring Speed"
          icon={Zap}
          description="Manual text editing is prone to human error. Automating case transformation eliminates typos and mismatched variable names, especially during large-scale code refactors."
        />
      </div>
    </div>
  );
}
