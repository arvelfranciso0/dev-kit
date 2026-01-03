"use client";

import { Hash, RotateCcw, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";
import CopiedStatus from "./copied-status";

interface ActionPanelProps {
  label: string;
  count?: number;
  onReset?: () => void;
  copyValue?: string; // Passing this enables the copy button
  icon?: React.ReactNode;
  variant?: "input" | "output";
  children: React.ReactNode;
  headers?: React.ReactNode;
}

export function ActionPanel({
  label,
  count,
  onReset,
  copyValue,
  icon,
  variant = "input",
  children,
  headers,
}: ActionPanelProps) {
  return (
    <div
      className={cn(
        "group flex flex-col rounded-2xl border transition-all shadow-sm overflow-hidden",
        variant === "input"
          ? "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus-within:ring-2 focus-within:ring-zinc-400/20"
          : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/10"
      )}
    >
      {/* HEADER BAR */}
      <div className="flex items-center justify-between px-5 py-3 bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
          {icon} {label}
        </span>

        <div className="flex items-center gap-4 text-[10px] font-mono">
          {typeof count === "number" && (
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Hash size={12} /> {count}
            </span>
          )}

          {onReset && (
            <button
              onClick={onReset}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 text-zinc-400 transition-colors flex items-center gap-1.5 font-bold uppercase tracking-widest"
            >
              <RotateCcw size={12} />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          <CopiedStatus copyValue={copyValue} />

          {headers}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
