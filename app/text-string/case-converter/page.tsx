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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

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

  const handleCopy = (value: string, label: string) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 1500);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 text-zinc-900 dark:text-zinc-100">
      <ToolHeader
        title="Case Converter"
        subtitle="String Transformation Utility"
        icon={Type}
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
            onCopy={() => handleCopy(value, label)}
            isCopied={copiedLabel === label}
          >
            <div className="p-6 font-mono text-base break-all min-h-20 flex items-center">
              {value || (
                <span className="text-zinc-300 italic text-sm">Waiting...</span>
              )}
            </div>
          </ActionPanel>
        ))}
      </div>
    </div>
  );
}
