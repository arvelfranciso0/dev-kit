"use client";

import { useState, useMemo, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Download,
  FileEdit,
  LayoutTemplate,
  Type,
  List,
  Code as CodeIcon,
  Eye,
  Sparkles,
  Code,
  Database,
  Minus,
  Shield,
  Terminal,
} from "lucide-react";

import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Block, BlockType } from "@/types/readme";
import { README_TEMPLATES } from "@/configs/templates";
import { SortableBlock } from "./_components/sortable-block";
import { InfoSection } from "@/components/shared/info-section";

export default function ReadmeBuilder() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));
  useEffect(() => {
    setBlocks(
      README_TEMPLATES.universal.map((b) => ({
        ...b,
        id: crypto.randomUUID(), // Use a more robust ID generator
        type: b.type as BlockType,
      }))
    );
  }, []);

  const markdownOutput = useMemo(() => {
    return blocks
      .map((b) => {
        // If the content is empty and it's not a Divider, maybe return empty string
        if (!b.content && b.type !== "Divider") return "";

        switch (b.type) {
          case "H1":
            return `# ${b.content}`;
          case "H2":
            return `## ${b.content}`;
          case "Shields":
            return `![Stars](https://img.shields.io/github/stars/${b.content}?style=for-the-badge) ![License](https://img.shields.io/github/license/${b.content}?style=for-the-badge)`;
          case "Code":
          case "SQL":
          case "Bash":
            const lang =
              b.type === "Code"
                ? b.language || "javascript"
                : b.type.toLowerCase();
            return `\`\`\`${lang}\n${b.content}\n\`\`\``;
          case "Divider":
            return `---`;
          case "Text":
            // Tiptap-markdown already provides the raw markdown (including bold, tables, etc.)
            return b.content;
          default:
            return b.content;
        }
      })
      .filter((content) => content !== "") // Remove empty blocks
      .join("\n\n");
  }, [blocks]);

  // --- DOWNLOAD FUNCTION ---
  const downloadReadme = () => {
    const element = document.createElement("a");
    const file = new Blob([markdownOutput], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = "README.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const addBlock = (type: BlockType, lang?: string) => {
    setBlocks([
      ...blocks,
      {
        id: Math.random().toString(36).substr(2, 9),
        type,
        content: "",
        language: lang,
      },
    ]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      <ToolHeader
        title="README Architect"
        subtitle="Standardize your docs."
        icon={<FileEdit />}
      />

      <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <LayoutTemplate size={18} />
          <Select
            onValueChange={(val) => {
              if (val === "blank") {
                setBlocks([]);
                return;
              }
              const templateKey = val as keyof typeof README_TEMPLATES;
              const selectedTemplate = README_TEMPLATES[templateKey];

              setBlocks(
                selectedTemplate.map((b) => ({
                  ...b,
                  id: Math.random().toString(36).substr(2, 9),
                  type: b.type as BlockType,
                }))
              );
            }}
          >
            <SelectTrigger className="w-45 border-none shadow-sm">
              <SelectValue placeholder="Template..." />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="blank" className="font-medium text-red-500">
                Start from Scratch
              </SelectItem>
              {Object.keys(README_TEMPLATES).map((key) => (
                <SelectItem key={key} value={key} className="capitalize">
                  {key.replace(/-/g, " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={downloadReadme} variant="default">
          <Download size={14} className="mr-2" /> Download .md
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-4">
          <DndContext
            id="readme-builder-context"
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={blocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              {blocks.map((block) => (
                <SortableBlock
                  key={block.id}
                  block={block}
                  onUpdate={(id, val, lang) =>
                    setBlocks(
                      blocks.map((b) =>
                        b.id === id
                          ? { ...b, content: val, language: lang ?? b.language }
                          : b
                      )
                    )
                  }
                  onRemove={(id) =>
                    setBlocks(blocks.filter((b) => b.id !== id))
                  }
                />
              ))}
            </SortableContext>
          </DndContext>

          <div className="p-6 border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-3xl mt-6 bg-zinc-50/30 dark:bg-zinc-900/10">
            <p className="text-[10px] font-bold text-zinc-400 uppercase mb-4 tracking-widest text-center">
              Add Custom Elements
            </p>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addBlock("H1")}
                className="rounded-xl"
              >
                <Type size={14} className="mr-2" /> H1
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addBlock("H2")}
                className="rounded-xl"
              >
                <Type size={14} className="mr-2" /> H2
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addBlock("Text")}
                className="rounded-xl"
              >
                <List size={14} className="mr-2" /> Text
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addBlock("Code")}
                className="rounded-xl"
              >
                <Code size={14} className="mr-2" /> Code
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addBlock("SQL")}
                className="rounded-xl"
              >
                <Database size={14} className="mr-2" /> SQL
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addBlock("Bash")}
                className="rounded-xl"
              >
                <Terminal size={14} className="mr-2" /> Bash
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addBlock("Shields")}
                className="rounded-xl"
              >
                <Shield size={14} className="mr-2" /> Badges
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addBlock("Divider")}
                className="rounded-xl"
              >
                <Minus size={14} className="mr-2" /> Divider
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 sticky top-8 h-fit">
          <ActionPanel
            label="Output"
            onReset={() => setBlocks([])}
            copyValue={markdownOutput}
          >
            <Tabs defaultValue="raw" className="w-full">
              <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/50">
                <TabsList className="grid w-50 grid-cols-2 h-8">
                  <TabsTrigger value="raw" className="text-xs">
                    <CodeIcon size={12} className="mr-2" /> Raw
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="text-xs">
                    <Eye size={12} className="mr-2" /> Preview
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="raw" className="m-0">
                <textarea
                  readOnly
                  value={markdownOutput}
                  className="min-h-[600px] font-mono text-[11px] bg-zinc-950 text-zinc-400 border-none p-6 leading-relaxed resize-none rounded-b-2xl"
                />
              </TabsContent>

              <TabsContent value="preview" className="m-0">
                <div className="min-h-150 max-h-150 overflow-y-auto p-6 prose prose-sm prose-zinc dark:prose-invert max-w-none rounded-b-2xl bg-white dark:bg-zinc-950 border-t dark:border-zinc-800">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {markdownOutput}
                  </ReactMarkdown>
                </div>
              </TabsContent>
            </Tabs>
          </ActionPanel>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t  pt-12">
        <InfoSection
          title="Block Architecture"
          icon={Sparkles}
          description="By abstracting Markdown into blocks, you ensure consistent formatting and syntax. This prevents common errors like broken code fences or malformed badge URLs."
        />
        <InfoSection
          title="Universal Compatibility"
          icon={LayoutTemplate}
          description="Templates are built on standard GFM (GitHub Flavored Markdown), making them compatible with VS Code, GitLab, Bitbucket, and Obsidian."
        />
      </div>
    </div>
  );
}
