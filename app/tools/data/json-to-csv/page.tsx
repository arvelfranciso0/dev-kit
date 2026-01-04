"use client";

import { useState, useMemo } from "react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { Button } from "@/components/ui/button";
import {
  FileSpreadsheet,
  FileJson,
  Download,
  Table,
  AlertCircle,
  ListTree,
  TableProperties,
} from "lucide-react";
import { jsonToCsv } from "@/lib/json-utils";
import { InfoSection } from "@/components/shared/info-section";
import { Textarea } from "@/components/ui/textarea";
import { CodeEditor } from "@/components/shared/code-mirror";

export default function JsonCsv() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const csvResult = useMemo(() => {
    if (!input) {
      setError(null);
      return "";
    }
    try {
      const result = jsonToCsv(input);
      setError(null);
      return result;
    } catch (e: any) {
      setError("Parsing Error: Ensure input is a valid JSON object or array.");
      return "";
    }
  }, [input]);

  const handleDownload = () => {
    const blob = new Blob([csvResult], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `devkit-export-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <ToolHeader
          title="JSON to CSV"
          subtitle="Data Flattening Utility"
          icon={<Table />}
        />

        <Button
          variant="outline"
          size="sm"
          disabled={!csvResult}
          onClick={handleDownload}
          className="rounded-xl font-bold uppercase tracking-widest text-[10px] h-10 border-zinc-200 dark:border-zinc-800"
        >
          <Download size={14} className="mr-2" /> Download CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUT PANEL */}
        <ActionPanel
          label="Source JSON"
          count={input.length}
          onReset={() => setInput("")}
        >
          <CodeEditor
            value={input}
            onChange={(value) => setInput(value)}
            containerClassName="h-162.5"
            editable
          />
        </ActionPanel>

        {/* OUTPUT PANEL */}
        <ActionPanel
          label="CSV Result"
          icon={<FileSpreadsheet size={14} />}
          count={csvResult.length}
          copyValue={csvResult}
          variant="output"
        >
          <div className="h-125 overflow-auto">
            {csvResult ? (
              <pre className="p-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {csvResult}
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-300 opacity-50">
                <FileJson size={40} strokeWidth={1} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] mt-4">
                  Waiting for Valid Input
                </span>
              </div>
            )}
          </div>
        </ActionPanel>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t border-zinc-100 dark:border-zinc-800 pt-12">
        <InfoSection
          title="Data Flattening"
          icon={ListTree}
          description="JSON often contains deeply nested objects and arrays. Our converter intelligently flattens these hierarchies into a single-row relationship, using dot notation for keys to ensure no data point is lost during the transition to a 2D grid."
        />
        <InfoSection
          title="Tabular Interoperability"
          icon={TableProperties}
          description="Bridge the gap between modern API responses and traditional analysis tools. By transforming structured JSON into RFC 4180 compliant CSV format, your data becomes instantly compatible with Excel, Google Sheets, and SQL bulk-import utilities."
        />
      </div>
    </div>
  );
}
