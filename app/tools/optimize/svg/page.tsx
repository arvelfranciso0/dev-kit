"use client";

import { useState, useMemo } from "react";
import { optimize } from "svgo/browser";
import { ToolHeader } from "@/components/shared/tool-header";
import { PreviewContainer } from "@/components/shared/preview-container";
import { CodePanel } from "@/components/shared/code-panel";
import { ActionPanel } from "@/components/shared/action-panel";
import { InfoSection } from "@/components/shared/info-section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  FileCode,
  Sparkles,
  Zap,
  Loader2,
  Download,
  Minimize2,
  TrendingDown,
} from "lucide-react";
import { MetadataCard } from "@/components/shared/meta-card";

export default function SvgOptimizer() {
  const [rawSvg, setRawSvg] = useState("");
  const [optimizedSvg, setOptimizedSvg] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Instant Raw Preview
  const rawPreview = useMemo(() => {
    if (!rawSvg || !rawSvg.trim().startsWith("<svg")) return null;
    return rawSvg.replace(
      "<svg",
      '<svg width="100%" height="100%" class="text-zinc-900 dark:text-zinc-100"'
    );
  }, [rawSvg]);

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

  const calculateSaving = () => {
    if (!rawSvg || !optimizedSvg) return 0;
    const saving =
      ((rawSvg.length - optimizedSvg.length) / rawSvg.length) * 100;
    return Math.max(0, parseFloat(saving.toFixed(1)));
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      <ToolHeader
        title="SVG Optimizer"
        subtitle="Professional-grade SVGO tool with multiple encoding exports."
        icon={<FileCode />}
      />

      {/* TOP METRICS SECTION */}
      <div className="flex justify-end w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto md:min-w-150">
          <MetadataCard
            icon={<FileCode size={14} />}
            label="Original"
            value={
              optimizedSvg ? `${(rawSvg.length / 1024).toFixed(2)} KB` : "---"
            }
          />
          <MetadataCard
            icon={<Sparkles size={14} className="text-emerald-500" />}
            label="Optimized"
            value={
              optimizedSvg
                ? `${(optimizedSvg.length / 1024).toFixed(2)} KB`
                : "---"
            }
          />
          <MetadataCard
            icon={<TrendingDown size={14} className="text-amber-500" />}
            label="Reduction"
            value={optimizedSvg ? `-${calculateSaving()}%` : "---"}
          />
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
          >
            <div className="p-4 space-y-4">
              <textarea
                placeholder="Paste <svg> code..."
                className="min-h-100 font-mono text-[10px] bg-zinc-50 dark:bg-zinc-950 rounded-2xl border-none focus-visible:ring-1"
                value={rawSvg}
                onChange={(e) => {
                  setRawSvg(e.target.value);
                  if (optimizedSvg) setOptimizedSvg("");
                }}
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleOptimize}
                  disabled={isProcessing || !rawSvg}
                  className="flex-1 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                >
                  {isProcessing ? (
                    <Loader2 size={16} className="animate-spin mr-2" />
                  ) : (
                    <Sparkles size={16} className="mr-2" />
                  )}
                  Optimize
                </Button>
                {optimizedSvg && (
                  <Button
                    variant="outline"
                    onClick={handleDownload}
                    className="rounded-xl"
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
              title="Optimized Results"
              options={[
                { id: "clean", label: "Clean SVG", value: optimizedSvg },
                { id: "uri", label: "Data URI", value: exports.dataUri },
                { id: "base64", label: "Base64", value: exports.base64 },
                {
                  id: "encode",
                  label: "encodeURIComponent",
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
                ? "Optimized"
                : rawSvg
                ? "Live Raw Preview"
                : "Waiting"
            }
          >
            <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
              {optimizedSvg || rawPreview ? (
                <div
                  className="w-64 h-64 flex items-center justify-center transition-all duration-500"
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
                  <p className="text-xs font-black uppercase tracking-widest">
                    Awaiting Input
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
          description="Vector files often contain redundant coordinate data and overly precise decimals. Our optimizer rounds these values and simplifies path commands, significantly reducing file size."
        />
        <InfoSection
          title="Bloat Removal"
          icon={Zap}
          description="Design software embeds hidden metadata and unused groups. We strip these unnecessary elements and minify the XML structure to ensure your assets load instantly."
        />
      </div>
    </div>
  );
}
