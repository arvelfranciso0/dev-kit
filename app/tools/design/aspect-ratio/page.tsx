"use client";

import { useState, useMemo } from "react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { CodePanel } from "@/components/shared/code-panel";
import { PreviewContainer } from "@/components/shared/preview-container";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Box,
  UnfoldHorizontal,
  UnfoldVertical,
  Ratio,
  Layers,
  History,
} from "lucide-react";
import { InfoSection } from "@/components/shared/info-section";
import { PresetButton } from "@/components/shared/presets";

const RATIO_PRESETS = [
  { label: "1:1", w: 1, h: 1, sub: "Square" },
  { label: "4:3", w: 4, h: 3, sub: "Classic TV" },
  { label: "16:9", w: 16, h: 9, sub: "HD Video" },
  { label: "21:9", w: 21, h: 9, sub: "Ultrawide" },
  { label: "9:16", w: 9, h: 16, sub: "TikTok/Reel" },
];

export default function AspectRatioTool() {
  const [width, setWidth] = useState(16);
  const [height, setHeight] = useState(9);

  const legacyPercentage = useMemo(() => {
    return ((height / width) * 100).toFixed(2);
  }, [width, height]);

  const cssOptions = [
    {
      id: "modern",
      label: "Modern CSS",
      value: `aspect-ratio: ${width} / ${height};`,
    },
    {
      id: "legacy",
      label: "Legacy Hack",
      value: `.container {\n  position: relative;\n  width: 100%;\n  padding-top: ${legacyPercentage}%;\n}\n\n.content {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n}`,
    },
    { id: "tailwind", label: "Tailwind", value: `aspect-[${width}/${height}]` },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8">
      <ToolHeader
        title="Aspect Ratio"
        subtitle="Calculate modern CSS aspect-ratio properties and legacy padding-top container hacks."
        icon={<Ratio />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <ActionPanel label="Ratio Configuration">
            <div className="p-6 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                    <UnfoldHorizontal size={12} /> Width
                  </label>
                  <Input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="h-12 font-mono text-xs rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                    <UnfoldVertical size={12} /> Height
                  </label>
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="h-12 font-mono text-xs rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
                  Presets
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {RATIO_PRESETS.map((p) => {
                    const isActive = width === p.w && height === p.h;

                    return (
                      <PresetButton
                        key={p.label}
                        label={p.label}
                        sub={p.sub}
                        isActive={isActive}
                        onSelect={() => {
                          setWidth(p.w);
                          setHeight(p.h);
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </ActionPanel>

          <CodePanel options={cssOptions} />
        </div>

        {/* PREVIEW */}
        <PreviewContainer statusLabel="Ratio Preview">
          <div className="w-full max-w-md mx-auto">
            <div
              className="bg-white dark:bg-zinc-950 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center transition-all duration-500 shadow-sm relative overflow-hidden group"
              style={{ aspectRatio: `${width} / ${height}` }}
            >
              <Box
                className="text-zinc-100 dark:text-zinc-900 group-hover:scale-110 transition-transform duration-500"
                size={48}
              />

              {/* Overlay info */}
              <div className="absolute inset-0 flex items-end justify-center p-4">
                <span className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-500">
                  {width} : {height} ({legacyPercentage}%)
                </span>
              </div>
            </div>
          </div>
        </PreviewContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t pt-12">
        <InfoSection
          title="Understanding Ratio"
          icon={Ratio}
          description="Aspect ratio represents the proportional relationship between width and height. A 16:9 ratio means for every 16 units of width, there are 9 units of height, ensuring the shape stays consistent regardless of the screen size."
        />
        <InfoSection
          title="Modern vs Legacy"
          icon={History}
          description="While modern browsers support the 'aspect-ratio' CSS property, legacy support often requires the 'padding-top' hack. This technique uses a percentage-based padding on a container to reserve space before content (like a video) loads."
        />
      </div>
    </div>
  );
}
