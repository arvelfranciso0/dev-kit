"use client";

import { useState, useMemo } from "react";
import { optimize } from "svgo/browser";
import { ToolHeader } from "@/components/shared/tool-header";
import { PreviewContainer } from "@/components/shared/preview-container";
import { CodePanel } from "@/components/shared/code-panel";
import { ActionPanel } from "@/components/shared/action-panel";
import { InfoSection } from "@/components/shared/info-section";
import { Button } from "@/components/ui/button";
import {
  FileCode,
  Sparkles,
  Zap,
  Loader2,
  Download,
  Minimize2,
  TrendingDown,
  Scale,
} from "lucide-react";
import { MetadataCard } from "@/components/shared/meta-card";
import { Textarea } from "@/components/ui/textarea";
import { CodeEditor } from "@/components/shared/code-mirror";

export default function SvgOptimizer() {
  const [rawSvg, setRawSvg] = useState("");
  const [optimizedSvg, setOptimizedSvg] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Helper to format bytes to KB
  const formatSize = (str: string) => {
    if (!str) return "0 KB";
    const kb = str.length / 1024;
    return kb < 1 ? `${str.length} B` : `${kb.toFixed(2)} KB`;
  };

  // Instant Raw Preview
  const rawPreview = useMemo(() => {
    if (!rawSvg || !rawSvg.trim().startsWith("<svg")) return null;
    return rawSvg.replace(
      "<svg",
      '<svg width="100%" height="100%" class="text-zinc-900 dark:text-zinc-100"'
    );
  }, [rawSvg]);

  const savings = useMemo(() => {
    if (!rawSvg || !optimizedSvg) return 0;
    const diff = rawSvg.length - optimizedSvg.length;
    const percentage = (diff / rawSvg.length) * 100;
    return Math.max(0, parseFloat(percentage.toFixed(1)));
  }, [rawSvg, optimizedSvg]);

  const exports = useMemo(() => {
    if (!optimizedSvg) return null;
    const base64 = window.btoa(unescape(encodeURIComponent(optimizedSvg)));
    const dataUri = `data:image/svg+xml,${optimizedSvg
      .replace(/"/g, "'")
      .replace(/>\s+</g, "><")
      .replace(/\s{2,}/g, " ")
      .replace(/[\r\n%#()<>?\[\\\]^`{|}]/g, encodeURIComponent)}`;
    const rawEncoded = `data:image/svg+xml,${encodeURIComponent(optimizedSvg)}`;

    return {
      base64: `data:image/svg+xml;base64,${base64}`,
      dataUri,
      rawEncoded,
    };
  }, [optimizedSvg]);

  const handleOptimize = async () => {
    if (!rawSvg) return;
    setIsProcessing(true);
    try {
      const result = optimize(rawSvg, {
        multipass: true,
        plugins: [
          "preset-default",
          "removeDimensions",
          "sortAttrs",
          { name: "cleanupNumericValues", params: { floatPrecision: 2 } },
        ],
      });
      setOptimizedSvg(result.data);
    } catch (error) {
      setOptimizedSvg(rawSvg.replace(/<!--[\s\S]*?-->/g, "").trim());
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([optimizedSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "optimized.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <ToolHeader
          title="SVG Optimizer"
          subtitle="Professional-grade SVGO tool with multiple encoding exports."
          icon={<FileCode />}
        />

        {/* DYNAMIC METRICS ROW */}
        <div className="flex justify-end">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto md:min-w-125">
            <MetadataCard
              icon={<Scale size={14} className="text-zinc-400" />}
              label="Original"
              value={rawSvg ? formatSize(rawSvg) : "---"}
            />
            <MetadataCard
              icon={<Sparkles size={14} className="text-emerald-500" />}
              label="Optimized"
              value={optimizedSvg ? formatSize(optimizedSvg) : "---"}
            />
            <MetadataCard
              icon={
                <TrendingDown
                  size={14}
                  className={savings > 0 ? "text-blue-500" : "text-zinc-400"}
                />
              }
              label="Reduction"
              value={optimizedSvg ? `${savings}%` : "---"}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <ActionPanel
            label="Input SVG Code"
            onReset={() => {
              setRawSvg("");
              setOptimizedSvg("");
            }}
            count={rawSvg.length}
          >
            <div className="p-4 space-y-4">
              <CodeEditor
                value={rawSvg}
                onChange={(value) => {
                  setRawSvg(value);
                  if (optimizedSvg) setOptimizedSvg("");
                }}
                editable
                containerClassName="h-162.5"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleOptimize}
                  variant="default"
                  disabled={isProcessing || !rawSvg}
                  className="flex-1 rounded-xl "
                >
                  {isProcessing ? (
                    <Loader2 size={16} className="animate-spin mr-2" />
                  ) : (
                    <Zap size={16} className="mr-2" />
                  )}
                  {optimizedSvg ? "Optimized" : "Optimize SVG"}
                </Button>
                {optimizedSvg && (
                  <Button
                    variant="outline"
                    onClick={handleDownload}
                    className="rounded-xl border-zinc-200 dark:border-zinc-800"
                  >
                    <Download size={16} className="mr-2" />
                    Download
                  </Button>
                )}
              </div>
            </div>
          </ActionPanel>

          {optimizedSvg && exports && (
            <CodePanel
              title="Export Options"
              options={[
                { id: "clean", label: "Clean SVG", value: optimizedSvg },
                { id: "uri", label: "Data URI", value: exports.dataUri },
                { id: "base64", label: "Base64", value: exports.base64 },
                {
                  id: "encode",
                  label: "Encoded",
                  value: exports.rawEncoded,
                },
              ]}
            />
          )}
        </div>

        <div className="lg:col-span-7 space-y-6">
          <PreviewContainer
            statusLabel={
              optimizedSvg
                ? "Optimized Preview"
                : rawSvg
                ? "Original Preview"
                : "Empty"
            }
          >
            <div className="flex flex-col items-center justify-center p-12 min-h-125 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-b-3xl">
              {optimizedSvg || rawPreview ? (
                <div
                  className="w-full max-w-[320px] aspect-square flex items-center justify-center transition-all duration-500 animate-in fade-in zoom-in-95"
                  dangerouslySetInnerHTML={{
                    __html: (optimizedSvg || rawPreview || "").replace(
                      "<svg",
                      '<svg width="100%" height="100%" class="text-zinc-900 dark:text-zinc-100"'
                    ),
                  }}
                />
              ) : (
                <div className="text-center space-y-4 opacity-20">
                  <FileCode size={80} className="mx-auto" />
                  <p className="text-xs font-black uppercase tracking-widest italic">
                    Drop SVG code to begin
                  </p>
                </div>
              )}
            </div>
          </PreviewContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t border-zinc-100 dark:border-zinc-800 pt-12">
        <InfoSection
          title="Path Minification"
          icon={Minimize2}
          description="Vector files often contain redundant coordinate data. Our optimizer rounds decimals and simplifies path commands to reduce file size without losing quality."
        />
        <InfoSection
          title="Metadata Stripping"
          icon={Zap}
          description="Design tools like Figma or Illustrator embed hidden bloat. We strip namespaces, comments, and unused groups to ensure assets load instantly."
        />
      </div>
    </div>
  );
}
