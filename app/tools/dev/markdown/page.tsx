"use client";

import { useState } from "react";
import { BookOpen, Download, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import { ToolHeader } from "@/components/shared/tool-header";
import { Button } from "@/components/ui/button";
import { ActionPanel } from "@/components/shared/action-panel";

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
    <div className="flex flex-col  p-4 lg:p-8 space-y-4 overflow-hidden">
      <div className="flex items-center justify-between shrink-0">
        <ToolHeader
          title="Markdown Preview"
          subtitle="Two-side GFM Editor"
          icon={<BookOpen />}
        />
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-2 overflow-hidden">
        {/* LEFT SIDE: Editor */}
        <ActionPanel label="Markdown Input" onReset={() => setContent("")}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full p-6 bg-transparent resize-none focus:outline-none font-mono text-sm leading-relaxed"
            placeholder="Paste your JSON or Markdown here..."
          />
        </ActionPanel>

        {/* RIGHT SIDE: Preview */}
        <div className="flex flex-col h-full overflow-hidden">
          <ActionPanel label="GitHub Preview">
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
    </div>
  );
}
