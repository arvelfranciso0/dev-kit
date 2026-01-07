"use client";

import { useState } from "react";
import { BookOpen, Download, Eye, FileText, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import { ToolHeader } from "@/components/shared/tool-header";
import { Button } from "@/components/ui/button";
import { ActionPanel } from "@/components/shared/action-panel";
import { InfoSection } from "@/components/shared/info-section";
import { Textarea } from "@/components/ui/textarea";
import { CodeEditor } from "@/components/shared/code-mirror";

export default function GitHubSplitPreview() {
  const [content, setContent] = useState(
    `# Welcome to the Previewer

- [x] GitHub task list
- [ ] Another task

## Code Example

\`\`\`ts
function hello(name: string) {
  return \`Hello \${name}\`;
}
\`\`\`

| Feature | Supported |
|--------|-----------|
| Tables | ✅ |
| GFM    | ✅ |
`
  );

  return (
    <div className="flex flex-col  p-4 lg:p-8 space-y-4 ">
      <div className="flex items-center justify-between shrink-0">
        <ToolHeader
          title="Markdown Preview"
          subtitle="Two-side GFM Editor"
          icon={<BookOpen />}
        />
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-2 ">
        {/* LEFT SIDE: Editor */}
        <ActionPanel
          label="Markdown Input"
          onReset={() => setContent("")}
          copyValue={content}
          headerBarClassname="sticky top-12 z-10  backdrop-blur-md "
        >
          <CodeEditor
            editable
            value={content}
            onChange={(value) => setContent(value)}
          />
        </ActionPanel>

        {/* RIGHT SIDE: Preview */}
        <div className="flex flex-col h-full">
          <ActionPanel label="GitHub Preview" variant={"output"}>
            <div className="min-h-25">
              <article
                className="p-6 prose prose-sm prose-zinc dark:prose-invert max-w-none 
              prose-details:border prose-details:border-zinc-200 dark:prose-details:border-zinc-800 prose-details:rounded-lg prose-details:p-4
              prose-summary:cursor-pointer prose-summary:font-semibold prose-summary:text-blue-600 dark:prose-summary:text-blue-400
              prose-pre:bg-zinc-900 prose-pre:border dark:prose-pre:border-zinc-800 
              prose-summary:cursor-pointer hover:prose-summary:text-blue-500 transition-colors
              "
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeHighlight]}
                >
                  {content}
                </ReactMarkdown>
              </article>
            </div>
          </ActionPanel>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t border-zinc-100 dark:border-zinc-800 pt-12">
        <InfoSection
          title="Real-time Rendering"
          icon={Eye}
          description="Instantly visualize your GitHub-flavored markdown as you type. Our parser converts raw syntax into semantic HTML, allowing you to check formatting, links, and media alignment without constant context switching."
        />
        <InfoSection
          title="GFM Compliance"
          icon={FileText}
          description="Full support for GitHub Flavored Markdown (GFM), including task lists, strikethroughs, and auto-linked URLs. Ensure your documentation looks exactly as it will appear on repository hosting services or project wikis."
        />
      </div>
    </div>
  );
}
