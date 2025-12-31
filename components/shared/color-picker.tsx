"use client";

import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    if (val === "" || val.startsWith("#")) {
      onChange(val);
    }
  };

  return (
    <div className={cn("flex gap-3", className)}>
      <div className="relative group shrink-0">
        <input
          type="color"
          value={
            value.startsWith("#") && value.length === 7 ? value : "#000000"
          }
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        {/* Visual Swatch */}
        <div
          className="w-12 h-12 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all group-hover:scale-105 group-active:scale-95 shadow-sm flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: value }}
        ></div>
      </div>

      <input
        type="text"
        value={value}
        maxLength={7}
        onChange={(e) => handleHexInput(e)}
        placeholder="#000000"
        className="grow bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs font-mono focus:ring-2 focus:ring-zinc-500/10 focus:outline-none transition-all uppercase"
      />
    </div>
  );
}
