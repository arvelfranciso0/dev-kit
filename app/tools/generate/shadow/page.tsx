"use client";

import { useState, useMemo } from "react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Layers, Box, Move, Wind, Copy, ChevronDown } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CopiedStatus from "@/components/shared/copied-status";
import { PreviewContainer } from "@/components/shared/preview-container";
import { CodePanel } from "@/components/shared/code-panel";
import { InfoSection } from "@/components/shared/info-section";
import { PresetCard } from "@/components/shared/presets";

const SHADOW_PRESETS = [
  {
    id: "soft-ui",
    title: "Clean UI",
    desc: "Subtle depth for cards",
    layers: 3,
    blur: 20,
    elevation: 4,
    opacity: 0.08,
  },
  {
    id: "floating",
    title: "Floating",
    desc: "High elevation pop",
    layers: 6,
    blur: 80,
    elevation: 30,
    opacity: 0.15,
  },
  {
    id: "sharp-retro",
    title: "Sharp Retro",
    desc: "Hard defined edge",
    layers: 1,
    blur: 0,
    elevation: 8,
    opacity: 1,
  },
  {
    id: "ambient",
    title: "Ambient Light",
    desc: "Realistic soft spread",
    layers: 5,
    blur: 50,
    elevation: 20,
    opacity: 0.12,
  },
  {
    id: "glass",
    title: "Glassmorphism",
    desc: "Best for glass effects",
    layers: 4,
    blur: 40,
    elevation: 10,
    opacity: 0.05,
  },
  {
    id: "intense",
    title: "Dark Night",
    desc: "Heavy, dark focus",
    layers: 6,
    blur: 100,
    elevation: 40,
    opacity: 0.3,
  },
  {
    id: "inner-depth",
    title: "Pressed",
    desc: "Concave visual feel",
    layers: 4,
    blur: 15,
    elevation: 2,
    opacity: 0.2,
  },
  {
    id: "border-glow",
    title: "Border Glow",
    desc: "Subtle outer ring",
    layers: 2,
    blur: 4,
    elevation: 0,
    opacity: 0.1,
  },
];

export default function ShadowGenerator() {
  const [layers, setLayers] = useState([5]);
  const [opacity, setOpacity] = useState([0.15]);
  const [blur, setBlur] = useState([40]);
  const [verticalOffset, setVerticalOffset] = useState([20]);
  const [activePresetId, setactivePresetId] = useState("");

  const generateShadowString = (l: number, b: number, v: number, o: number) => {
    const shadowArray = [];
    for (let i = 1; i <= l; i++) {
      const ratio = i / l;
      const layerBlur = Math.round(b * Math.pow(ratio, 2));
      const layerOffset = Math.round(v * Math.pow(ratio, 2));
      const layerOpacity = (o * (1 - ratio + 0.2)).toFixed(3);
      shadowArray.push(
        `0px ${layerOffset}px ${layerBlur}px rgba(0, 0, 0, ${layerOpacity})`
      );
    }
    return shadowArray.join(", ");
  };

  const shadowStyles = useMemo(
    () =>
      generateShadowString(layers[0], blur[0], verticalOffset[0], opacity[0]),
    [layers, opacity, blur, verticalOffset]
  );

  const tailwindClass = `shadow-[${shadowStyles
    .replace(/,\s+/g, ",")
    .replace(/\s+/g, "_")}]`;

  const applyPreset = (preset: (typeof SHADOW_PRESETS)[0]) => {
    setLayers([preset.layers]);
    setBlur([preset.blur]);
    setVerticalOffset([preset.elevation]);
    setOpacity([preset.opacity]);
    setactivePresetId(preset.id);
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="p-4 md:p-8 space-y-8 grow ">
        <ToolHeader
          title="Shadow Generator"
          subtitle="Create realistic, layered ambient shadows using smoothing curves."
          icon={<Layers />}
        />

        {/* TOP SECTION: Controls & Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <ActionPanel label="Shadow Physics">
              <div className="p-6 space-y-8">
                <SliderGroup
                  label="Layers"
                  icon={<Layers size={12} />}
                  value={layers}
                  onChange={setLayers}
                  min={1}
                  max={10}
                  unit=""
                />
                <SliderGroup
                  label="Smoothness"
                  icon={<Wind size={12} />}
                  value={blur}
                  onChange={setBlur}
                  min={0}
                  max={200}
                  unit="px"
                />
                <SliderGroup
                  label="Elevation"
                  icon={<Move size={12} />}
                  value={verticalOffset}
                  onChange={setVerticalOffset}
                  min={0}
                  max={100}
                  unit="px"
                />
              </div>
            </ActionPanel>

            <div className="space-y-4">
              <CodePanel
                options={[
                  {
                    id: "css",
                    label: "CSS",
                    value: `box-shadow: ${shadowStyles};`,
                  },
                  {
                    id: "tailwind",
                    label: "Tailwind",
                    value: tailwindClass,
                  },
                ]}
              />
            </div>
          </div>

          <PreviewContainer
            statusLabel="Elevation Preview"
            // We remove the default center-alignment constraints to give shadow room
            className="items-center justify-center overflow-visible"
          >
            <div className="relative p-20">
              <div
                className="w-64 h-64 bg-white dark:bg-zinc-950 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all duration-500 ease-out border border-black/3 dark:border-white/3"
                style={{
                  boxShadow: shadowStyles,
                  zIndex: 10,
                }}
              >
                <Box className="text-zinc-100 dark:text-zinc-800" size={64} />
                <span className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em]">
                  Preview Object
                </span>
              </div>
            </div>
          </PreviewContainer>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px grow bg-zinc-100 dark:bg-zinc-800" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
              Library Presets
            </span>
            <div className="h-px grow bg-zinc-100 dark:bg-zinc-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHADOW_PRESETS.map((preset) => {
              const shadowString = generateShadowString(
                preset.layers,
                preset.blur,
                preset.elevation,
                preset.opacity
              );

              const isActive = activePresetId === preset.id;

              return (
                <PresetCard
                  key={preset.id}
                  label={preset.title}
                  sub={preset.desc}
                  isActive={isActive}
                  onSelect={() => applyPreset(preset)}
                  preview={
                    <div
                      className="w-30 h-30 bg-white dark:bg-zinc-950 rounded-2xl transition-all duration-500 shadow-sm border border-black/[0.03] dark:border-white/[0.03]"
                      style={{ boxShadow: shadowString }}
                    />
                  }
                />
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t pt-12">
          <InfoSection
            title="What is Box Shadow?"
            icon={Box}
            description="Box shadows add depth to your UI by simulating light hitting an object. It consists of horizontal/vertical offsets, blur radius, and spread."
          />
          <InfoSection
            title="Layering Technique"
            icon={Layers}
            description="Professional designers often layer 2-3 shadows with low opacity instead of one heavy shadow to create a more realistic, 'diffused' look."
          />
        </div>
      </div>
    </div>
  );
}

function SliderGroup({ label, icon, value, onChange, min, max, unit }: any) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-black uppercase text-zinc-400 flex items-center gap-2">
          {icon} {label}
        </span>
        <Badge variant="outline" className="font-mono text-xs">
          {value[0]}
          {unit}
        </Badge>
      </div>
      <Slider
        value={value}
        onValueChange={onChange}
        min={min}
        max={max}
        step={1}
      />
    </div>
  );
}
