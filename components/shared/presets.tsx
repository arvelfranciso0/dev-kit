"use client";

import { useCopy } from "@/hooks/use-copy";
import { Button } from "@/components/ui/button";
import { Copy, Check, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BasePresetProps {
  label: string;
  sub?: string;
  isActive: boolean;
  onSelect: () => void;
}

interface PresetButtonProps extends BasePresetProps {
  icon?: LucideIcon;
}

interface PresetCardProps extends BasePresetProps {
  preview: React.ReactNode;
  copyValue?: string;
}

export function PresetButton({
  label,
  sub,
  icon: Icon,
  isActive,
  onSelect,
}: PresetButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={onSelect}
      className={cn(
        "h-auto flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 group gap-1",
        isActive
          ? "bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-900 shadow-md"
          : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
      )}
    >
      {Icon && (
        <Icon
          size={14}
          className={cn(
            "transition-colors",
            isActive
              ? "text-amber-400"
              : "text-zinc-400 group-hover:text-amber-500"
          )}
        />
      )}
      <div className="text-[10px] font-black uppercase tracking-tight leading-none">
        {label}
      </div>
      {sub && (
        <div
          className={cn(
            "text-[8px] uppercase font-bold transition-opacity",
            isActive ? "opacity-70" : "opacity-40 group-hover:opacity-60"
          )}
        >
          {sub}
        </div>
      )}
    </Button>
  );
}

export function PresetCard({
  label,
  sub,
  preview,
  isActive,
  onSelect,
  copyValue,
}: PresetCardProps) {
  const { copy, isCopied } = useCopy();

  return (
    <div
      className={cn(
        "group relative bg-white h-70 dark:bg-zinc-950 border rounded-[2rem] p-4 transition-all duration-300",
        isActive
          ? "border-zinc-900 dark:border-zinc-100 ring-1 ring-zinc-900 dark:ring-zinc-100 shadow-xl"
          : "border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600"
      )}
    >
      {/* Visual Preview Area */}
      <div
        className="w-full h-45 rounded-2xl mb-4 cursor-pointer flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-900 transition-colors group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800"
        onClick={onSelect}
      >
        <div className="transition-transform duration-500 group-hover:scale-110">
          {preview}
        </div>
      </div>

      {/* Info Area */}
      <div className="space-y-1 px-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-black uppercase tracking-tight text-zinc-900 dark:text-zinc-100 truncate">
            {label}
          </span>
          {copyValue && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                copy(copyValue);
              }}
            >
              {isCopied ? (
                <Check size={12} className="text-emerald-500" />
              ) : (
                <Copy
                  size={12}
                  className="text-zinc-400 group-hover:text-zinc-600"
                />
              )}
            </Button>
          )}
        </div>
        {sub && (
          <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-black leading-none">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}
