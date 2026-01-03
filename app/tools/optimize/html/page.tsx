"use client";

import { useState, useEffect, useMemo } from "react";
import DOMPurify from "dompurify";
import {
  ShieldCheck,
  Code2,
  Eye,
  RefreshCcw,
  FileCode,
  Zap,
  Trash2,
} from "lucide-react";

import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoSection } from "@/components/shared/info-section";
import { MetadataCard } from "@/components/shared/meta-card";

export default function HTMLSanitizer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const sanitizeHTML = (html: string) => {
    if (!html) {
      setOutput("");
      return;
    }

    const clean = DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
      ALLOWED_TAGS: [
        "b",
        "i",
        "em",
        "strong",
        "a",
        "p",
        "br",
        "ul",
        "ol",
        "li",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "blockquote",
        "code",
        "pre",
        "img",
      ],
      ALLOWED_ATTR: ["href", "title", "target", "src", "alt", "class"],
    });

    setOutput(clean);
  };

  useEffect(() => {
    sanitizeHTML(input);
  }, [input]);

  // Calculate stats for the MetadataCards
  const stats = useMemo(() => {
    const rawSize = new Blob([input]).size;
    const cleanSize = new Blob([output]).size;
    const diff = rawSize - cleanSize;
    const percent = rawSize > 0 ? Math.max(0, (diff / rawSize) * 100) : 0;

    return {
      raw: (rawSize / 1024).toFixed(2),
      clean: (cleanSize / 1024).toFixed(2),
      reduction: percent.toFixed(1),
    };
  }, [input, output]);

  return (
    <div className="flex flex-col p-4 lg:p-8 space-y-6 h-full">
      <ToolHeader
        title="HTML Sanitizer"
        subtitle="Strip malicious scripts and normalize messy markup into clean HTML5"
        icon={<ShieldCheck />}
      />

      <div className="flex justify-end w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto md:min-w-150">
          <MetadataCard
            icon={<FileCode size={14} />}
            label="Original Size"
            value={input ? `${stats.raw} KB` : "---"}
          />
          <MetadataCard
            icon={<ShieldCheck size={14} className="text-emerald-500" />}
            label="Sanitized Size"
            value={output ? `${stats.clean} KB` : "---"}
          />
          <MetadataCard
            icon={<Trash2 size={14} className="text-amber-500" />}
            label="Bloat Removed"
            value={output ? `-${stats.reduction}%` : "---"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ActionPanel
          label="Dirty HTML Input"
          icon={<Code2 size={14} />}
          onReset={() => setInput("")}
          count={input.length}
        >
          <div className="p-4">
            <textarea
              placeholder="Paste untrusted HTML..."
              className="min-h-[400px] font-mono text-xs resize-none bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </ActionPanel>

        <ActionPanel
          label="Sanitized Result"
          icon={<ShieldCheck size={14} />}
          variant="output"
          copyValue={output}
        >
          <div className="p-4">
            <Tabs defaultValue="code" className="w-full">
              <TabsList className="bg-zinc-100 dark:bg-zinc-900 mb-4">
                <TabsTrigger value="code" className="text-xs">
                  <Code2 size={12} className="mr-2" /> Source
                </TabsTrigger>
                <TabsTrigger value="preview" className="text-xs">
                  <Eye size={12} className="mr-2" /> Visual Preview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="code">
                <pre className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 min-h-[350px] max-h-[350px] overflow-auto text-xs font-mono text-amber-600 dark:text-amber-500 whitespace-pre-wrap">
                  {output || "Waiting for input..."}
                </pre>
              </TabsContent>

              <TabsContent value="preview">
                <div
                  className="p-4 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 min-h-[350px] max-h-[350px] overflow-auto prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: output }}
                />
              </TabsContent>
            </Tabs>
          </div>
        </ActionPanel>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t pt-12">
        <InfoSection
          title="XSS Prevention"
          icon={ShieldCheck}
          description="Ensures untrusted content cannot execute malicious scripts by stripping 'on-' events and unauthorized tags."
        />
        <InfoSection
          title="DOM Normalization"
          icon={RefreshCcw}
          description="Fixes broken markup, closes tags, and converts messy HTML into clean, well-formed HTML5 structures."
        />
      </div>
    </div>
  );
}
