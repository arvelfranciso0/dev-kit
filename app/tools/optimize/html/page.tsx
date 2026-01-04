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
import { CodeEditor } from "@/components/shared/code-mirror";

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
    <div className="p-4 md:p-8 space-y-8 ">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <ToolHeader
          title="HTML Sanitizer"
          subtitle="Strip malicious scripts and normalize messy markup into clean HTML5"
          icon={<ShieldCheck />}
        />

        <div className="flex justify-end">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto md:min-w-125">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <ActionPanel
          label="Dirty HTML Input"
          icon={<Code2 size={14} />}
          onReset={() => setInput("")}
          count={input.length}
        >
          <CodeEditor
            value={input}
            onChange={(value) => setInput(value)}
            mode={"html"}
            containerClassName="h-162.5"
            placeholder={"Paste untrusted HTML..."}
            editable
          />
        </ActionPanel>

        <ActionPanel
          label="Sanitized Result"
          icon={<ShieldCheck size={14} />}
          variant="output"
          copyValue={output}
        >
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
              <CodeEditor
                containerClassName="h-148"
                value={output}
                placeholder={"Waiting for input..."}
                readOnly
              />
            </TabsContent>

            <TabsContent value="preview">
              <div
                className="p-4 h-148 overflow-auto prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: output }}
              />
            </TabsContent>
          </Tabs>
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
