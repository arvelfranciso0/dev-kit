"use client";

import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";

interface CommandItemProps {
  value: string;
  desc: string;
  className?: string;
}

export function CopyItem({ value, desc, className }: CommandItemProps) {
  const { copy, isCopied } = useCopy();

  return (
    <div
      className={cn(
        "group p-4  transition-colors cursor-pointer border-zinc-100 dark:border-zinc-800",
        className
      )}
      onClick={() => copy(value)}
    >
      <div className="flex items-center justify-between mb-1">
        <code className="text-xs font-bold  font-mono">{value}</code>
        {isCopied ? (
          <div className="flex items-center gap-2 text-emerald-500 animate-in fade-in zoom-in-95 duration-200">
            <Check size={12} />
            <span className="text-[10px]">Copied</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
            <Copy size={12} />
            <span className="text-[10px]">Copy</span>
          </div>
        )}
      </div>
      <p className="text-[11px] text-zinc-500 leading-tight">{desc}</p>
    </div>
  );
}
