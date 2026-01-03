"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Trash2,
  Bold,
  Italic,
  List,
  Quote,
  Table as TableIcon,
  Link2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Block } from "@/types/readme";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "@tiptap/extension-link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import ToolbarButton from "./toolbar-button";

interface SortableBlockProps {
  block: Block;
  onUpdate: (id: string, val: string, lang?: string) => void;
  onRemove: (id: string) => void;
}

export function SortableBlock({
  block,
  onUpdate,
  onRemove,
}: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown.configure({
        html: false,
        tightLists: true,
      }),
      Table.configure({
        resizable: true,
        allowTableNodeSelection: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({ placeholder: "Start writing your content..." }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline underline-offset-4 cursor-pointer",
        },
      }),
    ],
    content: block.content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const storage = editor.storage as any;
      const markdown = storage.markdown?.getMarkdown();

      if (markdown !== undefined) {
        onUpdate(block.id, markdown);
      }
    },
    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[120px] prose prose-sm dark:prose-invert max-w-none font-sans text-sm",
      },
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
    opacity: isDragging ? 0.8 : 1,
  };

  const handleSetLink = () => {
    if (linkUrl === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    }
    setIsLinkModalOpen(false);
    setLinkUrl("");
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex gap-3 group p-4 rounded-2xl border transition-all ${
        isDragging
          ? "border-amber-500 ring-2 ring-amber-500/10"
          : "border-zinc-200 dark:border-zinc-800"
      } shadow-sm mb-4 bg-white dark:bg-zinc-950`}
    >
      <button
        {...attributes}
        {...listeners}
        className="mt-2 text-zinc-300 hover:text-zinc-500 cursor-grab active:cursor-grabbing"
      >
        <GripVertical size={18} />
      </button>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              {block.type}
            </span>
            {block.type === "Code" && (
              <Select
                value={block.language || "javascript"}
                onValueChange={(val) => onUpdate(block.id, block.content, val)}
              >
                <SelectTrigger className="h-5 text-[9px] w-24 px-2 bg-zinc-100 dark:bg-zinc-900 border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JS / TS</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="bash">Bash</SelectItem>
                  <SelectItem value="text">Tree / Text</SelectItem>
                </SelectContent>
              </Select>
            )}
            {block.type === "Text" && editor && (
              <div className="flex items-center gap-1 bg-zinc-100/50 dark:bg-zinc-900/50 p-1 rounded-lg">
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  isActive={editor.isActive("bold")}
                  icon={<Bold size={14} />}
                  tooltip="Bold"
                />
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  isActive={editor.isActive("italic")}
                  icon={<Italic size={14} />}
                  tooltip="Italic"
                />
                <div className="w-[1px] h-4 bg-zinc-300 dark:bg-zinc-700 mx-1" />
                <ToolbarButton
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  isActive={editor.isActive("bulletList")}
                  icon={<List size={14} />}
                  tooltip="Bullet List"
                />
                <ToolbarButton
                  onClick={() => {
                    const previousUrl =
                      editor?.getAttributes("link").href || "";
                    setLinkUrl(previousUrl);
                    setIsLinkModalOpen(true);
                  }}
                  isActive={editor?.isActive("link")}
                  icon={<Link2Icon size={14} />}
                  tooltip="Insert Link"
                />
                <ToolbarButton
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .insertTable({ rows: 2, cols: 2, withHeaderRow: true })
                      .run()
                  }
                  icon={<TableIcon size={14} />}
                  tooltip="Insert Table"
                />
                {editor.isActive("table") && (
                  <>
                    <div className="w-[1px] h-4 bg-zinc-300 dark:bg-zinc-700 mx-1" />
                    <ToolbarButton
                      onClick={() =>
                        editor.chain().focus().addColumnAfter().run()
                      }
                      icon={<span className="text-[10px] font-bold">+Col</span>}
                      tooltip="Add Column"
                    />
                    {/* Delete Column */}
                    <ToolbarButton
                      onClick={() =>
                        editor.chain().focus().deleteColumn().run()
                      }
                      icon={
                        <span className="text-[10px] font-bold text-red-500">
                          -Col
                        </span>
                      }
                      tooltip="Delete Column"
                    />
                    <div className="w-[1px] h-2 bg-zinc-200 dark:bg-zinc-800 mx-0.5" />
                    {/* Add Row */}
                    <ToolbarButton
                      onClick={() => editor.chain().focus().addRowAfter().run()}
                      icon={<span className="text-[10px] font-bold">+Row</span>}
                      tooltip="Add Row"
                    />
                    {/* Delete Row */}
                    <ToolbarButton
                      onClick={() => editor.chain().focus().deleteRow().run()}
                      icon={
                        <span className="text-[10px] font-bold text-red-500">
                          -Row
                        </span>
                      }
                      tooltip="Delete Row"
                    />
                    {/* Delete Entire Table */}
                    <ToolbarButton
                      onClick={() => editor.chain().focus().deleteTable().run()}
                      icon={<Trash2 size={12} className="text-red-500" />}
                      tooltip="Delete Table"
                    />
                  </>
                )}
                <ToolbarButton
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  isActive={editor.isActive("blockquote")}
                  icon={<Quote size={14} />}
                  tooltip="Quote"
                />
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-red-50 dark:hover:bg-red-950/30 group/btn"
            onClick={() => onRemove(block.id)}
          >
            <Trash2
              size={14}
              className="text-zinc-400 group-hover/btn:text-red-500"
            />
          </Button>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-2 min-h-[40px] flex items-center">
          {block.type.startsWith("H") ? (
            <Input
              value={block.content}
              onChange={(e) => onUpdate(block.id, e.target.value)}
              className="border-none bg-transparent font-bold text-lg focus-visible:ring-0"
              placeholder={`Enter ${block.type} text...`}
            />
          ) : block.type === "Text" ? (
            <EditorContent editor={editor} className="p-2 w-full" />
          ) : block.type === "Divider" ? (
            /* New Divider Logic */
            <div className="w-full py-4 px-2">
              <div className="h-[2px] w-full bg-zinc-300 dark:bg-zinc-700 rounded-full" />
            </div>
          ) : (
            /* This remains for Code, SQL, Bash, and Shields */
            <textarea
              value={block.content}
              onChange={(e) => onUpdate(block.id, e.target.value)}
              className="w-full border-none bg-transparent font-mono text-xs min-h-[100px] focus:outline-none p-2 resize-none"
              placeholder="Enter content..."
            />
          )}
        </div>
      </div>

      <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="link">URL</Label>
              <Input
                id="link"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSetLink();
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLinkModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSetLink}>Save Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
