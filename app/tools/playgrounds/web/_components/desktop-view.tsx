"use client";

import { CodeEditor } from "@/components/shared/code-mirror";
import { PlaygroundProps } from "@/types/playground";
import { FileCode, Layout, Type } from "lucide-react";
import PreviewArea from "./preview-area";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function DesktopViewPlayground({
  html,
  css,
  js,
  srcDoc,
  setHtml,
  setCss,
  setJs,
  previewRef,
  isFullscreen,
  toggleFullscreen,
}: PlaygroundProps) {
  return (
    <div className="">
      <ResizablePanelGroup
        orientation="vertical"
        className="hidden md:block h-screen w-full border border-zinc-800 overflow-hidden"
      >
        <ResizablePanel defaultSize={100} minSize={20}>
          <ResizablePanelGroup orientation="horizontal">
            {/* HTML */}
            <ResizablePanel defaultSize={50}>
              <div className="flex flex-col h-full bg-zinc-50/50">
                <div className="flex items-center gap-2 px-4 py-2 text-amber-500 font-medium text-xs border-b border-zinc-200">
                  <FileCode size={14} /> HTML
                </div>
                <CodeEditor
                  value={html}
                  onChange={setHtml}
                  containerClassName="flex-1"
                  editable
                  mode="html"
                />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle className="border border-l-zinc-800" />

            {/* CSS */}
            <ResizablePanel defaultSize={50}>
              <div className="flex flex-col h-full bg-zinc-50/50">
                <div className="flex items-center gap-2 px-4 py-2 text-sky-500 font-medium text-xs border-b border-zinc-200">
                  <Layout size={14} /> CSS
                </div>
                <CodeEditor
                  value={css}
                  onChange={setCss}
                  containerClassName="flex-1"
                  editable
                  mode="css"
                />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle className="border border-l-zinc-800" />

            {/* JS */}
            <ResizablePanel defaultSize={50}>
              <div className="flex flex-col h-full bg-zinc-50/50">
                <div className="flex items-center gap-2 px-4 py-2 text-yellow-400 font-medium text-xs border-b border-zinc-200">
                  <Type size={14} /> JavaScript
                </div>
                <CodeEditor
                  value={js}
                  onChange={setJs}
                  containerClassName="flex-1"
                  editable
                  mode="javascript"
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>

        {/* This handle allows vertical resizing between the editor block and preview */}
        <ResizableHandle
          withHandle
          className="flex items-center justify-center w-full h-0"
        />

        {/* BOTTOM PANEL: Preview Area */}
        <ResizablePanel defaultSize={50} minSize={20}>
          <PreviewArea
            srcDoc={srcDoc}
            previewRef={previewRef}
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
            isMobile={false}
            className="h-full border border-t-zinc-800 "
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
