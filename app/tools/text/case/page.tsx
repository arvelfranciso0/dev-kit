"use client";

import { useState } from "react";
import { toUpper, toLower, toCamelCase, toSnakeCase } from "@/lib/string-utils";
import {
  Copy,
  Check,
  Type,
  RotateCcw,
  Hash,
  CaseUpper,
  CaseLower,
  Codepen,
  Terminal,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { InfoSection } from "@/components/shared/info-section";

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
    <div className="p-4 md:p-8 space-y-8 text-zinc-900 dark:text-zinc-100">
      <ToolHeader
        title="Case Converter"
        subtitle="String Transformation Utility"
        icon={<Type />}
      />

      <ActionPanel
        label="Raw Input"
        count={text.length}
        onReset={() => setText("")}
      >
        <textarea
          className="w-full h-40 p-6 bg-transparent resize-none focus:outline-none font-mono text-base md:text-lg leading-relaxed"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text..."
        />
      </ActionPanel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {conversions.map(({ label, value, icon }) => (
          <ActionPanel
            key={label}
            label={label}
            icon={icon}
            variant="output"
            copyValue={value}
          >
            <div className="p-6 font-mono text-base break-all min-h-20 flex items-center">
              {value || (
                <span className="text-zinc-300 italic text-sm">Waiting...</span>
              )}
            </div>
          </ActionPanel>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t pt-12">
        <InfoSection
          title="Naming Conventions"
          icon={CaseUpper}
          description="Consistency is key in clean code. Whether you are switching a database schema to snake_case or a React component to PascalCase, this utility ensures your identifiers match your project's architectural standards perfectly."
        />
        <InfoSection
          title="Refactoring Speed"
          icon={Zap}
          description="Manual text editing is prone to human error. By automating case transformation, you eliminate typos and mismatched variable names, allowing you to focus on logic rather than string formatting during large-scale refactors."
        />
      </div>
    </div>
  );
}
