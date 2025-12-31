"use client";

import { useState, useMemo } from "react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { Slider } from "@/components/ui/slider";
import { Eye, Palette, ShieldCheck } from "lucide-react";
import convert from "color-convert";
import CopiedStatus from "@/components/shared/copied-status";
import { getContrast } from "@/lib/contrast-utils";
import { ColorPicker } from "@/components/shared/color-picker";
import { useDebounce } from "@/hooks/use-debounce";
import { PreviewContainer } from "@/components/shared/preview-container";
import { InfoSection } from "@/components/shared/info-section";

export default function ContrastChecker() {
  const [foreground, setForeground] = useState("#FFFFFF");
  const [background, setBackground] = useState("#09090B");

  const debouncedFG = useDebounce(foreground, 50);
  const debouncedBG = useDebounce(background, 50);

  const ratio = useMemo(() => {
    return getContrast(foreground, background);
  }, [foreground, background]);

  const safeSuggestions = useMemo(() => {
    const [h, s] = convert.hex.hsl(debouncedFG);

    const findSafe = (target: number) => {
      // Heaviest part of the tool
      for (let i = 0; i <= 100; i++) {
        const testHex = `#${convert.hsl.hex([h, s, i])}`;
        if (getContrast(testHex, debouncedBG) >= target) return testHex;
      }
      return null;
    };

    return {
      aa: findSafe(4.5),
      aaa: findSafe(7),
    };
  }, [debouncedFG, debouncedBG]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 grow w-full">
        <ToolHeader
          title="Contrast Checker"
          subtitle="Validate WCAG 2.1 compliance with real-time contrast ratios and accessibility scoring."
          icon={<Palette />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <ActionPanel label="Color Configuration">
              <div className="p-6 space-y-10">
                <ColorController
                  label="Foreground"
                  value={foreground}
                  onChange={setForeground}
                />
                <ColorController
                  label="Background"
                  value={background}
                  onChange={setBackground}
                />
              </div>
            </ActionPanel>

            <ActionPanel label="Safe Palette Suggestions">
              <div className="p-6 space-y-3">
                <p className="text-[10px] text-zinc-400 uppercase font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck size={12} /> Adjusted Foreground to Pass
                </p>
                <SafeColorCard
                  label="AA Compliance"
                  hex={safeSuggestions.aa}
                  currentBg={background}
                  onApply={setForeground}
                  target="4.5:1"
                />
                <SafeColorCard
                  label="AAA Compliance"
                  hex={safeSuggestions.aaa}
                  currentBg={background}
                  onApply={setForeground}
                  target="7.0:1"
                />
              </div>
            </ActionPanel>
          </div>

          <PreviewContainer
            statusLabel="Contrast Ratio"
            style={{ backgroundColor: background }} // Passing the dynamic background
          >
            <div style={{ color: foreground }}>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">
                Ratio
              </span>
              <h2 className="text-8xl font-black tracking-tighter">
                {ratio.toFixed(2)}:1
              </h2>
              <p className="mt-8 text-4xl font-bold leading-tight max-w-lg">
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          </PreviewContainer>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t pt-12">
          <InfoSection
            title="WCAG Standards"
            icon={ShieldCheck}
            description="The Web Content Accessibility Guidelines (WCAG) recommend a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text to ensure content is readable for users with visual impairments."
          />
          <InfoSection
            title="Perceived Brightness"
            icon={Eye}
            description="Contrast is calculated based on relative luminance. Colors like yellow and green appear much brighter to the human eye than blue or violet, which is why color math is essential for true accessibility."
          />
        </div>
      </div>
    </div>
  );
}

function SafeColorCard({ label, hex, currentBg, onApply, target }: any) {
  if (!hex) return null;
  return (
    <div className="group flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 transition-all">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl border border-white/10 shadow-sm"
          style={{ backgroundColor: hex }}
        />
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100 uppercase">
            {label}
          </span>
          <span className="text-[9px] font-mono text-zinc-500 uppercase">
            {hex} ({target})
          </span>
        </div>
      </div>
      <button
        onClick={() => onApply(hex)}
        className="px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-50 dark:hover:text-zinc-900 transition-all"
      >
        Apply
      </button>
    </div>
  );
}

function ColorController({ label, value, onChange }: any) {
  const [h, s, l] = convert.hex.hsl(value);

  const updateLightness = (newL: number) => {
    onChange(`#${convert.hsl.hex([h, s, newL])}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
          {label}
        </label>
        <CopiedStatus copyValue={value} className="text-[10px]" />
      </div>

      <ColorPicker value={value} onChange={onChange} />

      {/* Lightness Slider */}
      <div className="space-y-2">
        <div className="flex justify-between text-[8px] font-bold text-zinc-400 uppercase tracking-tighter px-1">
          <span>Dark</span>
          <span>Light</span>
        </div>
        <Slider
          value={[l]}
          onValueChange={(v) => updateLightness(v[0])}
          min={0}
          max={100}
          step={1}
        />
      </div>
    </div>
  );
}
