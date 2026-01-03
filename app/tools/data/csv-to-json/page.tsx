"use client";

import { useState, useMemo, useRef } from "react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import {
  Upload,
  Database,
  Loader2,
  Binary,
  TableProperties,
} from "lucide-react";
import { csvToJson, parseCsvFile } from "@/lib/json-utils";
import { cn } from "@/lib/utils";
import { InfoSection } from "@/components/shared/info-section";

export default function CsvToJsonTool() {
  const [input, setInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const jsonResult = useMemo(() => {
    if (!input) return "";
    try {
      return csvToJson(input);
    } catch (e) {
      return "Error parsing manual input.";
    }
  }, [input]);

  // Handle file processing
  const processFile = async (file: File) => {
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      alert("Please upload a valid CSV file.");
      return;
    }

    setIsParsing(true);
    try {
      const rawCsvText = await file.text();
      setInput(rawCsvText);
    } catch (e) {
      console.error(e);
    } finally {
      setIsParsing(false);
    }
  };

  // Drag and Drop Handlers
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      <ToolHeader
        title="CSV to JSON"
        subtitle="Upload or Paste Data"
        icon={<Database />}
      />

      {/* DROP ZONE */}
      <div
        onDragOver={onDragOver}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative group cursor-pointer flex flex-col items-center justify-center py-12 px-6 rounded-3xl border-2 border-dashed transition-all duration-300",
          isDragging
            ? "border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-900"
            : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-400"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".csv"
          onChange={(e) =>
            e.target.files?.[0] && processFile(e.target.files[0])
          }
        />

        {isParsing ? (
          <Loader2 className="w-10 h-10 animate-spin text-zinc-400" />
        ) : (
          <Upload
            className={cn(
              "w-10 h-10 mb-4 transition-transform",
              isDragging && "scale-110"
            )}
          />
        )}

        <p className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
          {isDragging ? "Drop to Parse" : "Drop CSV file here"}
        </p>
        <p className="text-xs text-zinc-500 mt-2">
          or click to browse from computer
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActionPanel label="Manual CSV Input" onReset={() => setInput("")}>
          <textarea
            className="w-full h-100 p-6 bg-transparent resize-none focus:outline-none text-sm font-mono leading-relaxed"
            placeholder="paste,csv,data,here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </ActionPanel>

        <ActionPanel
          label="JSON Result"
          variant="output"
          copyValue={jsonResult}
        >
          <div className="h-100 overflow-auto">
            {jsonResult ? (
              <pre className="p-6 text-sm font-mono text-zinc-600 dark:text-zinc-400">
                {jsonResult}
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-30 italic text-xs">
                JSON output will appear here...
              </div>
            )}
          </div>
        </ActionPanel>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t border-zinc-100 dark:border-zinc-800 pt-12">
        <InfoSection
          title="Tabular to Structured"
          icon={TableProperties}
          description="CSV data is inherently flat. This converter parses your comma-separated rows and maps them into an array of JSON objects, using the first row as keys to ensure your data is ready for API consumption or database seeding."
        />
        <InfoSection
          title="Type Inference"
          icon={Binary}
          description="Beyond simple string conversion, the engine intelligently detects data types. It automatically identifies numbers, booleans, and null values within your CSV, preventing the 'everything-is-a-string' issue during integration."
        />
      </div>
    </div>
  );
}
