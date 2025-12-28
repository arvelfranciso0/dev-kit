"use client";

import { useState } from "react";
import { toUpper, toLower, toCamelCase, toSnakeCase } from "@/lib/string-utils";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const conversions = {
    UPPERCASE: toUpper(text),
    lowercase: toLower(text),
    camelCase: toCamelCase(text),
    snake_case: toSnakeCase(text),
  };

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 1500); // revert back after 1.5s
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl font-semibold">Case Converter</h1>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Note: Please separate each word with a space for camelCase and
        snake_case conversions.
      </p>

      <Textarea
        className="border p-2 w-full h-32"
        placeholder="Type here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="space-y-4">
        {Object.entries(conversions).map(([label, value]) => (
          <div
            key={label}
            className="relative border rounded p-4 bg-gray-50 dark:bg-gray-800"
          >
            <span className="absolute -top-3 left-3 bg-gray-50 dark:bg-gray-800 px-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              {label}
            </span>
            <pre className="whitespace-pre-wrap break-words">{value}</pre>
            <div
              onClick={() => handleCopy(value, label)}
              className="absolute top-2 text-xs right-2 cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              title="Copy"
            >
              {copiedLabel === label ? (
                "✓ Copied"
              ) : (
                <Copy className="w-4 h-4 inline" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
