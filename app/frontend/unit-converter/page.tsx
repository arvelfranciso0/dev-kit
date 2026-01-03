"use client";

import { useState, useMemo } from "react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ruler, Settings2, Monitor, Info, Smartphone } from "lucide-react";
import { ConversionCard } from "@/components/shared/conversion-grid";

export default function MultiUnitConverter() {
  const [baseSize, setBaseSize] = useState([16]);
  const [viewportWidth, setViewportWidth] = useState([1920]);
  const [val, setVal] = useState<string>("16");
  const [sourceUnit, setSourceUnit] = useState<string>("px");

  // Logic to convert any input into Pixels first (the "Pivot" unit)
  const toPx = (value: number, unit: string) => {
    switch (unit) {
      case "rem":
        return value * baseSize[0];
      case "em":
        return value * baseSize[0]; // Simplified for tool context
      case "vw":
        return (value * viewportWidth[0]) / 100;
      case "vh":
        return (value * 1080) / 100; // Standard HD height
      case "pt":
        return value * (96 / 72);
      default:
        return value;
    }
  };

  const conversions = useMemo(() => {
    const num = parseFloat(val) || 0;
    const px = toPx(num, sourceUnit);

    return [
      { label: "Absolute", unit: "px", value: px.toFixed(1) },
      { label: "Relative", unit: "rem", value: (px / baseSize[0]).toFixed(3) },
      { label: "Relative", unit: "em", value: (px / baseSize[0]).toFixed(3) },
      {
        label: "Character",
        unit: "ch",
        value: (px / (baseSize[0] * 0.5)).toFixed(2),
      }, // Approx 0 width
      {
        label: "Viewport",
        unit: "vw",
        value: ((px / viewportWidth[0]) * 100).toFixed(2),
      },
      { label: "Print", unit: "pt", value: (px * (72 / 96)).toFixed(1) },
    ];
  }, [val, sourceUnit, baseSize, viewportWidth]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <ToolHeader
        title="Universal Unit Converter"
        subtitle="Translate between PX, REM, Viewport, and Character units."
        icon={<Ruler />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CONFIGURATION PANEL */}
        <div className="space-y-6">
          <ActionPanel
            label="Environment Settings"
            icon={<Settings2 size={12} />}
          >
            <div className="p-6 space-y-8">
              {/* Base Font Size */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase text-zinc-400">
                  <span>Root Font Size</span>
                  <Badge variant="outline">{baseSize[0]}px</Badge>
                </div>
                <Slider
                  value={baseSize}
                  onValueChange={setBaseSize}
                  min={8}
                  max={32}
                  step={1}
                />
              </div>

              {/* Viewport Width */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase text-zinc-400">
                  <span>Simulated Viewport</span>
                  <Badge variant="outline">{viewportWidth[0]}w</Badge>
                </div>
                <Slider
                  value={viewportWidth}
                  onValueChange={setViewportWidth}
                  min={320}
                  max={2560}
                  step={10}
                />
              </div>
            </div>
          </ActionPanel>

          <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 flex gap-3">
            <Info className="text-blue-500 shrink-0" size={16} />
            <p className="text-[10px] text-blue-700 dark:text-blue-300 leading-tight">
              <strong>Viewport Units (vw)</strong> depend on screen width. We've
              set yours to <strong>{viewportWidth[0]}px</strong> for this
              calculation.
            </p>
          </div>
        </div>

        {/* INPUT & RESULTS */}
        <div className="lg:col-span-2 space-y-6">
          {/* MAIN INPUT */}
          <ActionPanel label="Input Value" icon={<Monitor size={12} />}>
            <div className="p-8 flex items-center gap-6">
              <Input
                type="number"
                value={val}
                onChange={(e) => setVal(e.target.value)}
                className="text-5xl h-20 font-mono font-bold border-none bg-transparent focus-visible:ring-0 p-0 shadow-none"
              />
              <Select value={sourceUnit} onValueChange={setSourceUnit}>
                <SelectTrigger className="w-32 h-12 rounded-xl font-bold uppercase tracking-widest text-xs border-zinc-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="px">Pixels</SelectItem>
                  <SelectItem value="rem">REM</SelectItem>
                  <SelectItem value="vw">VW</SelectItem>
                  <SelectItem value="pt">Points</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </ActionPanel>

          {/* ALL RESULTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conversions.map((item) => (
              <ConversionCard key={item.unit} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
