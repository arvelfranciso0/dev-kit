"use client";

import { useState, useMemo } from "react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Type,
  Smartphone,
  Monitor,
  Zap,
  Maximize,
  Calculator,
} from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PreviewContainer } from "@/components/shared/preview-container";
import { CodePanel } from "@/components/shared/code-panel";
import { InfoSection } from "@/components/shared/info-section";
import { PresetButton } from "@/components/shared/presets";

const GLOBAL_PRESETS = [
  {
    id: "sm",
    label: "Compact",
    minVW: 320,
    maxVW: 1024,
    minSize: 14,
    maxSize: 32,
  },
  {
    id: "md",
    label: "Standard",
    minVW: 375,
    maxVW: 1280,
    minSize: 16,
    maxSize: 48,
  },
  {
    id: "lg",
    label: "Hero",
    minVW: 400,
    maxVW: 1536,
    minSize: 20,
    maxSize: 80,
  },
];

export default function FluidTypeScale() {
  const [minVW, setMinVW] = useState(375);
  const [maxVW, setMaxVW] = useState(1280);
  const [minSize, setMinSize] = useState(16);
  const [maxSize, setMaxSize] = useState(48);
  const [activeTab, setActiveTab] = useState("css");

  const debouncedValues = useDebounce({ minVW, maxVW, minSize, maxSize }, 50);

  const { clampValue, tailwindValue } = useMemo(() => {
    const {
      minVW: miW,
      maxVW: maW,
      minSize: miS,
      maxSize: maS,
    } = debouncedValues;
    const miSrem = miS / 16;
    const maSrem = maS / 16;
    const miWrem = miW / 16;
    const maWrem = maW / 16;

    const slope = (maSrem - miSrem) / (maWrem - miWrem);
    const intersection = -miWrem * slope + miSrem;
    const preferred = `${intersection.toFixed(4)}rem + ${(slope * 100).toFixed(
      4
    )}vw`;

    const clamp = `clamp(${miSrem}rem, ${preferred}, ${maSrem}rem)`;
    // Tailwind arbitrary value requires no spaces
    const tailwind = `text-[clamp(${miSrem}rem,${preferred.replace(
      /\s+/g,
      ""
    )},${maSrem}rem)]`;

    return { clampValue: clamp, tailwindValue: tailwind };
  }, [debouncedValues]);

  const applyPreset = (p: (typeof GLOBAL_PRESETS)[0]) => {
    setMinVW(p.minVW);
    setMaxVW(p.maxVW);
    setMinSize(p.minSize);
    setMaxSize(p.maxSize);
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      <ToolHeader
        title="Fluid Typography"
        subtitle="Create responsive clamp() typography that scales smoothly between mobile and desktop."
        icon={<Type />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <ActionPanel label="Quick Presets">
            <div className="p-4 grid grid-cols-3 gap-2">
              {GLOBAL_PRESETS.map((p) => {
                const isActive =
                  minVW === p.minVW &&
                  maxVW === p.maxVW &&
                  minSize === p.minSize;

                return (
                  <PresetButton
                    icon={Zap}
                    key={p.label}
                    label={p.label}
                    isActive={isActive}
                    onSelect={() => {
                      applyPreset(p);
                    }}
                  />
                );
              })}
            </div>
          </ActionPanel>

          <ActionPanel label="Manual Configuration">
            <div className="p-6 space-y-8">
              <ViewportPair
                min={minVW}
                setMin={setMinVW}
                max={maxVW}
                setMax={setMaxVW}
              />
              <div className="h-px bg-zinc-100 dark:bg-zinc-800" />
              <SliderControl
                label="Min Font"
                value={minSize}
                onChange={setMinSize}
                max={100}
              />
              <SliderControl
                label="Max Font"
                value={maxSize}
                onChange={setMaxSize}
                max={200}
              />
            </div>
          </ActionPanel>

          {/* DUAL OUTPUT */}
          <CodePanel
            options={[
              { id: "css", label: "CSS", value: `font-size: ${clampValue};` },
              { id: "tailwind", label: "Tailwind", value: tailwindValue },
            ]}
          />
        </div>

        {/* PREVIEW CONTAINER */}
        <PreviewContainer showDevices statusLabel="Fluid Scaling">
          <h2
            className="wrap-break-words font-bold tracking-tight text-zinc-900 leading-[1.1] dark:text-zinc-50"
            style={{ fontSize: clampValue }}
          >
            The quick brown fox jumps over the lazy dog.
          </h2>
          <p className="mt-6 max-w-md text-sm text-zinc-500 leading-relaxed">
            Interpolating between{" "}
            <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
              {minSize}px
            </span>{" "}
            and{" "}
            <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
              {maxSize}px
            </span>
            .
          </p>
        </PreviewContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t pt-12">
        <InfoSection
          title="Why Fluid Type?"
          icon={Maximize}
          description="Fluid typography uses the CSS clamp() function to create text that scales smoothly between a minimum and maximum size based on the viewport, eliminating the need for dozens of jarring media query breakpoints."
        />
        <InfoSection
          title="The Math Factor"
          icon={Calculator}
          description="The 'slope' in a clamp function calculates the rate of change between your mobile and desktop sizes. This ensures that a heading doesn't look too overwhelming on a tablet while still remaining legible on a phone."
        />
      </div>
    </div>
  );
}

function ViewportPair({ min, setMin, max, setMax }: any) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-xs font-black uppercase text-zinc-400">
          Min Viewport
        </label>
        <Input
          type="number"
          value={min}
          onChange={(e) => setMin(Number(e.target.value))}
          className="h-10 text-xs font-mono rounded-xl"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-black uppercase text-zinc-400">
          Max Viewport
        </label>
        <Input
          type="number"
          value={max}
          onChange={(e) => setMax(Number(e.target.value))}
          className="h-10 text-xs font-mono rounded-xl"
        />
      </div>
    </div>
  );
}

function SliderControl({ label, value, onChange, max }: any) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
          {label}
        </label>
        <span className="text-xs font-mono font-bold">{value}px</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(v) => onChange(v[0])}
        min={8}
        max={max}
        step={1}
      />
    </div>
  );
}
