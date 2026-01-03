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

  const tailwindClass = `shadow-[${shadowStyles.replace(/\s/g, "_")}]`;

  const applyPreset = (preset: (typeof SHADOW_PRESETS)[0]) => {
    setLayers([preset.layers]);
    setBlur([preset.blur]);
    setVerticalOffset([preset.elevation]);
    setOpacity([preset.opacity]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12 grow w-full">
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
              <ResultArea
                label="CSS Property"
                value={`box-shadow: ${shadowStyles};`}
              />
              <ResultArea label="Tailwind Class" value={tailwindClass} />
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="h-full min-h-100 lg:min-h-full rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center relative overflow-hidden p-12">
              <div
                className="w-64 h-64 bg-white dark:bg-zinc-950 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-500 ease-out"
                style={{ boxShadow: shadowStyles }}
              >
                <Box className="text-zinc-200 dark:text-zinc-800" size={64} />
                <span className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest">
                  Preview Area
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Large Presets */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px grow bg-zinc-100 dark:bg-zinc-800" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
              Library Presets
            </span>
            <div className="h-px grow bg-zinc-100 dark:bg-zinc-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHADOW_PRESETS.map((preset) => (
              <PresetCard
                key={preset.id}
                preset={preset}
                onApply={() => applyPreset(preset)}
                generateString={generateShadowString}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PresetCard({
  preset,
  onApply,
  generateString,
}: {
  preset: any;
  onApply: () => void;
  generateString: any;
}) {
  const { copy } = useCopy();
  const shadow = generateString(
    preset.layers,
    preset.blur,
    preset.elevation,
    preset.opacity
  );

  return (
    <div className="group relative bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-5 transition-all hover:border-zinc-300 dark:hover:border-zinc-500 hover:shadow-xl dark:hover:shadow-none">
      <div
        className="w-full h-32 rounded-2xl mb-4 cursor-pointer flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-900 transition-colors group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800"
        onClick={onApply}
      >
        <div
          className="w-16 h-16 bg-white dark:bg-zinc-950 rounded-xl transition-all duration-500"
          style={{ boxShadow: shadow }}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-100">
            {preset.title}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                <ChevronDown size={16} className="text-zinc-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="text-[10px] font-bold uppercase p-2 min-w-35"
            >
              <DropdownMenuItem
                onClick={() => copy(`box-shadow: ${shadow};`)}
                className="flex items-center justify-between gap-2 cursor-pointer"
              >
                Copy CSS <Copy size={12} className="opacity-50" />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => copy(`shadow-[${shadow.replace(/\s/g, "_")}]`)}
                className="flex items-center justify-between gap-2 cursor-pointer"
              >
                Copy Tailwind <Copy size={12} className="opacity-50" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-[9px] text-zinc-500 uppercase tracking-widest leading-relaxed font-medium">
          {preset.desc}
        </p>
      </div>
    </div>
  );
}

function ResultArea({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
          {label}
        </span>
        <CopiedStatus copyValue={value} className="text-[10px]" />
      </div>
      <div className="w-full p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 max-h-32 overflow-y-auto scrollbar-hide">
        <code className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap break-all leading-relaxed">
          {value}
        </code>
      </div>
    </div>
  );
}

function SliderGroup({ label, icon, value, onChange, min, max, unit }: any) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-black uppercase text-zinc-400 flex items-center gap-2">
          {icon} {label}
        </span>
        <Badge variant="outline" className="font-mono text-[10px]">
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
