"use client";

import { useState, useEffect, useRef } from "react";
import {
  Code2,
  Eye,
  Play,
  RotateCcw,
  Layout,
  FileCode,
  Type,
  Globe,
  Layers,
  ShieldCheck,
  Minimize2,
  Maximize2,
} from "lucide-react";

import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/shared/code-mirror";
import { PreviewContainer } from "@/components/shared/preview-container";
import { InfoSection } from "@/components/shared/info-section";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function WebPlayground() {
  const [html, setHtml] = useState(
    "<h1>Hello World</h1>\n<p>Start coding to see the magic!</p>"
  );
  const [css, setCss] = useState(
    "body {\n  font-family: sans-serif;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  background: #f4f4f5;\n}\n\nh1 {\n  color: #f59e0b;\n}"
  );
  const [js, setJs] = useState("console.log('Playground Ready!');");

  const [srcDoc, setSrcDoc] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <style>${css}</style>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `);
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!previewRef.current) return;

    if (!document.fullscreenElement) {
      previewRef.current.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  const handleReset = () => {
    setHtml("");
    setCss("");
    setJs("");
  };

  return (
    <div className="flex flex-col p-4 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <ToolHeader
          title="Web Playground"
          subtitle="Instant HTML, CSS, and JavaScript prototyping environment."
          icon={<Globe />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDE: Editor */}
        <div className="lg:col-span-4 space-y-6">
          <ActionPanel
            label="Editor"
            icon={<Code2 size={14} />}
            onReset={handleReset}
          >
            <div className="w-full h-160 flex flex-col rounded-b-2xl overflow-hidden ">
              <Tabs
                defaultValue="html"
                className="flex-1 flex flex-col overflow-hidden"
              >
                <div className="px-4 py-2 border-b  flex items-center justify-between shrink-0">
                  <TabsList className="bg-transparent border-none gap-4">
                    <TabsTrigger
                      value="html"
                      className="text-zinc-400 data-[state=active]:text-amber-500"
                    >
                      <FileCode size={14} className="mr-2" /> HTML
                    </TabsTrigger>
                    <TabsTrigger
                      value="css"
                      className="text-zinc-400 data-[state=active]:text-sky-500"
                    >
                      <Layout size={14} className="mr-2" /> CSS
                    </TabsTrigger>
                    <TabsTrigger
                      value="js"
                      className="text-zinc-400 data-[state=active]:text-yellow-400"
                    >
                      <Type size={14} className="mr-2" /> JS
                    </TabsTrigger>
                  </TabsList>
                </div>
                <div className="flex-1 overflow-hidden">
                  <TabsContent
                    value="html"
                    className="h-full m-0 data-[state=active]:flex flex-col overflow-hidden"
                  >
                    <CodeEditor
                      value={html}
                      onChange={(value) => setHtml(value)}
                      containerClassName="h-full flex-1"
                      editable
                      mode={"html"}
                    />
                  </TabsContent>
                  <TabsContent
                    value="css"
                    className="h-full m-0 data-[state=active]:flex flex-col overflow-hidden"
                  >
                    <CodeEditor
                      value={css}
                      onChange={(value) => setCss(value)}
                      containerClassName="h-full flex-1"
                      editable
                      mode={"css"}
                    />
                  </TabsContent>
                  <TabsContent
                    value="js"
                    className="h-full m-0 data-[state=active]:flex flex-col overflow-hidden"
                  >
                    <CodeEditor
                      value={js}
                      onChange={(value) => setJs(value)}
                      containerClassName="h-full flex-1"
                      editable
                      mode={"javascript"}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </ActionPanel>
        </div>

        {/* RIGHT SIDE: Preview */}
        <PreviewContainer statusLabel="Live Preview">
          <div
            className="w-full h-150 rounded-b-2xl overflow-hidden relative "
            ref={previewRef}
          >
            {/* MOVED BUTTON HERE */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleFullscreen}
                    className="absolute top-3 right-3 h-8 w-8 rounded-lg  backdrop-blur-md  text-zinc-900 hover:text-amber-500  transition-all duration-200 z-50"
                  >
                    {isFullscreen ? (
                      <Minimize2 size={16} />
                    ) : (
                      <Maximize2 size={16} />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  className="bg-zinc-900 border-zinc-800 text-xs text-white"
                >
                  {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <iframe
              srcDoc={srcDoc}
              title="output"
              sandbox="allow-scripts allow-modals"
              className="w-full h-full border-none"
            />
          </div>
        </PreviewContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t border-zinc-100 dark:border-zinc-800 pt-12">
        <InfoSection
          title="Isolated Sandbox"
          icon={ShieldCheck}
          description="Experiment safely in a secure, sandboxed environment. Your code runs within a protected iframe, preventing cross-scripting issues while allowing full access to browser APIs for modern web experimentation."
        />
        <InfoSection
          title="Unified Web Stack"
          icon={Layers}
          description="Seamlessly integrate HTML5, CSS3, and modern JavaScript in a single workspace. The playground intelligently merges your assets into a unified document, perfect for prototyping UI components or testing responsive layouts."
        />
      </div>
    </div>
  );
}
