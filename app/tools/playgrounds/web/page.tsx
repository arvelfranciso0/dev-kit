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
import DesktopViewPlayground from "./_components/desktop-view";
import MobileViewPlayground from "./_components/mobile-view";
import PreviewArea from "./_components/preview-area";

type PlaygroundProps = {
  html: string;
  css: string;
  js: string;
  setHtml: (v: string) => void;
  setCss: (v: string) => void;
  setJs: (v: string) => void;
  handleReset: () => void;
};

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
      <DesktopViewPlayground
        html={html}
        css={css}
        js={js}
        setHtml={setHtml}
        setCss={setCss}
        setJs={setJs}
        handleReset={handleReset}
        srcDoc={srcDoc}
        previewRef={previewRef}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      />

      <MobileViewPlayground
        html={html}
        css={css}
        js={js}
        setHtml={setHtml}
        setCss={setCss}
        setJs={setJs}
        handleReset={handleReset}
        srcDoc={srcDoc}
      />
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
