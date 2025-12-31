"use client";

import { useState, useMemo } from "react";
import chroma from "chroma-js";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { Button } from "@/components/ui/button";
import { Palette, RotateCcw, Info, Sparkles } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

import { cn } from "@/lib/utils";
import { ConversionCard } from "@/components/shared/conversion-grid";
import CopiedStatus from "@/components/shared/copied-status";
import { ColorPicker } from "@/components/shared/color-picker";

export default function ColorPalette() {
  const [seedColor, setSeedColor] = useState("#3B82F6");
  const debouncedSeed = useDebounce(seedColor, 100);

  const palette = useMemo(() => {
    try {
      const scale = chroma
        .scale(["#fff", debouncedSeed, "#000"])
        .mode("lch")
        .colors(13);

      return [
        { name: "50", hex: scale[1] },
        { name: "100", hex: scale[2] },
        { name: "200", hex: scale[3] },
        { name: "300", hex: scale[4] },
        { name: "400", hex: scale[5] },
        { name: "500", hex: debouncedSeed },
        { name: "600", hex: scale[7] },
        { name: "700", hex: scale[8] },
        { name: "800", hex: scale[9] },
        { name: "900", hex: scale[10] },
        { name: "950", hex: scale[11] },
      ];
    } catch (e) {
      return [];
    }
  }, [debouncedSeed]);

  const mainConversions = useMemo(() => {
    const c = chroma(debouncedSeed);
    return [
      { label: "Hex", value: debouncedSeed.toUpperCase(), unit: "" },
      { label: "RGB", value: c.css(), unit: "" },
      {
        label: "HSL",
        value: `hsl(${c
          .hsl()
          .map((v) => Math.round(v || 0))
          .join(", ")})`,
        unit: "",
      },
    ];
  }, [debouncedSeed]);

  const fullPaletteString = useMemo(() => {
    return palette
      .map((s) => `--color-primary-${s.name}: ${s.hex.toUpperCase()};`)
      .join("\n");
  }, [palette]);

  const generateRandom = () => {
    setSeedColor(chroma.random().hex());
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <ToolHeader
        title="Color Palette Generator"
        subtitle="Generate a full design system color scale from a single seed."
        icon={<Palette />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <ActionPanel label="Seed Configuration">
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  Seed Color
                </label>
                <ColorPicker value={seedColor} onChange={setSeedColor} />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateRandom}
                  className="gap-2 text-[10px] font-bold uppercase tracking-widest py-5"
                >
                  <Sparkles size={14} /> Random
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSeedColor("#3B82F6")}
                  className="gap-2 text-[10px] font-bold uppercase tracking-widest py-5"
                >
                  <RotateCcw size={14} /> Reset
                </Button>
              </div>
            </div>
          </ActionPanel>

          <div className="space-y-3">
            {mainConversions.map((item) => (
              <ConversionCard key={item.label} item={item} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <ActionPanel
            label="Generated Scale (50 - 950)"
            copyValue={fullPaletteString}
          >
            <div className="p-2 space-y-1">
              {palette.map((swatch) => (
                <PaletteRow
                  key={swatch.name}
                  name={swatch.name}
                  hex={swatch.hex}
                  isSeed={swatch.hex.toLowerCase() === seedColor.toLowerCase()}
                />
              ))}
            </div>
          </ActionPanel>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 flex gap-3">
            <Info className="text-zinc-400 shrink-0" size={16} />
            <p className="text-[10px] text-zinc-500 leading-relaxed uppercase font-bold tracking-tight">
              Scale generated using LCH interpolation. Clicking "Copy" on the
              panel header will copy all CSS variables.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
function PaletteRow({
  name,
  hex,
  isSeed,
}: {
  name: string;
  hex: string;
  isSeed: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer group hover:scale-[1.01]",
        isSeed
          ? "bg-zinc-100/50 dark:bg-zinc-800/50 ring-1 ring-zinc-200 dark:ring-zinc-700"
          : "hover:bg-zinc-50 dark:hover:bg-zinc-900"
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-lg shadow-sm border border-black/5"
          style={{ backgroundColor: hex }}
        />
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-zinc-400 w-8">
              {name}
            </span>
            {isSeed && (
              <span className="text-[8px] font-bold uppercase bg-zinc-900 text-white px-1.5 rounded-full">
                Seed
              </span>
            )}
          </div>
          <span className="text-xs font-mono font-bold uppercase text-zinc-600 dark:text-zinc-400">
            {hex}
          </span>
        </div>
      </div>
      <CopiedStatus copyValue={hex} />
    </div>
  );
}
