"use client";

import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";
import { ReactNode } from "react";

interface CommandItemProps {
  copyValue?: string;
  className?: string; // Add this
  children?: ReactNode;
}

export function CopyItem({ copyValue, className, children }: CommandItemProps) {
  const { copy, isCopied } = useCopy();

  return (
    <>
      {copyValue && (
        <div
          onClick={() => copy(copyValue)}
          className={cn(
            "flex w-full items-center justify-between gap-4 font-bold  tracking-widest transition-all cursor-pointer", // Added w-full and items-center
            className
          )}
        >
          <div className="flex-1">{children}</div>

          <div className="shrink-0">
            {isCopied ? (
              <div className="flex items-center uppercase gap-2 text-emerald-500 animate-in fade-in zoom-in-95 duration-200">
                <Check size={12} />
                <span className="text-xs">Copied</span>
              </div>
            ) : (
              <div className="flex items-center uppercase gap-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
                <Copy size={12} />
                <span className="text-xs">Copy</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
