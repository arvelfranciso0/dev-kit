"use client";

import { useState, useMemo } from "react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { MetadataCard } from "@/components/shared/meta-card";
import { Button } from "@/components/ui/button";
import {
  Braces,
  AlignLeft,
  Zap,
  FileJson,
  Database,
  Hash,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatJSON, minifyJSON } from "@/lib/json-utils";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import { transparentThemeCodeViewer } from "@/configs/themes";
import { EditorError } from "@/components/shared/error";
import { CodeEditor } from "@/components/shared/code-mirror";

export default function Formatter() {
  const [input, setInput] = useState("");

  const errorDetails = useMemo(() => {
    if (!input) return null;
    try {
      formatJSON(input);
      return null;
    } catch (e: any) {
      const message = e.message;
      const match = message.match(/line (\d+) column (\d+)/);
      return {
        message,
        line: match ? Number(match[1]) : null,
        column: match ? Number(match[2]) : null,
      };
    }
  }, [input]);

  const formattedResult = useMemo(() => {
    if (!input || errorDetails) return "";
    try {
      return formatJSON(input);
    } catch {
      return "";
    }
  }, [input, errorDetails]);

  const handleMinify = () => {
    try {
      const minified = minifyJSON(input);
      setInput(minified);
    } catch (e: any) {}
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      {errorDetails && <EditorError message={errorDetails?.message} />}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <ToolHeader
          title="JSON Formatter"
          subtitle="Beautify, validate, and minify your JSON data structures."
          icon={<Braces />}
        />

        <div className="flex justify-end">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto md:min-w-125">
            <MetadataCard
              icon={<Database size={14} className="text-zinc-400" />}
              label="Size"
              value={input ? `${(input.length / 1024).toFixed(2)} KB` : "0 KB"}
            />
            <MetadataCard
              icon={
                <ShieldCheck
                  size={14}
                  className={
                    errorDetails ? "text-rose-500" : "text-emerald-500"
                  }
                />
              }
              label="Status"
              value={errorDetails ? "Invalid" : input ? "Valid" : "Idle"}
              variant={errorDetails ? "error" : input ? "success" : "default"}
            />
            <MetadataCard
              icon={<Hash size={14} className="text-blue-500" />}
              label="Indentation"
              value="2 Spaces"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* INPUT PANEL */}
        <ActionPanel
          label="Input Raw JSON"
          onReset={() => setInput("")}
          count={input.length}
        >
          <div className="flex flex-col h-162.5">
            <CodeEditor
              value={input}
              onChange={(value) => setInput(value)}
              containerClassName="h-162.5"
              editable
              mode={"json"}
            />

            <div className="px-4 pb-4">
              <Button
                variant="default"
                onClick={handleMinify}
                disabled={!input || !!errorDetails}
                className="w-full h-11 rounded-xl"
              >
                <Zap size={14} className="mr-2" />
                Minify Input
              </Button>
            </div>
          </div>
        </ActionPanel>

        {/* OUTPUT PANEL */}
        <ActionPanel
          label="Formatted Result"
          icon={<FileJson size={14} />}
          copyValue={formattedResult}
          variant="output"
          count={formattedResult.length}
        >
          <div className="flex flex-col h-162.5">
            {formattedResult ? (
              <CodeEditor value={formattedResult} readOnly />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-300 dark:text-zinc-700">
                <AlignLeft size={48} strokeWidth={1} />
                <span className="text-xs font-black uppercase tracking-widest italic mt-4">
                  Awaiting valid JSON...
                </span>
              </div>
            )}
          </div>
        </ActionPanel>
      </div>
    </div>
  );
}
