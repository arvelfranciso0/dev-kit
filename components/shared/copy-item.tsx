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

          {/* Both labels share one grid cell so the width always fits "Copied";
              swapping them never resizes the item or shifts the layout. */}
          <div className="shrink-0 grid justify-items-end" aria-live="polite">
            <div
              aria-hidden={!isCopied}
              className={cn(
                "col-start-1 row-start-1 flex items-center uppercase gap-2 text-emerald-500",
                isCopied ? "animate-in fade-in zoom-in-95 duration-200" : "invisible"
              )}
            >
              <Check size={12} />
              <span className="text-xs">Copied</span>
            </div>
            <div
              aria-hidden={isCopied}
              className={cn(
                "col-start-1 row-start-1 flex items-center uppercase gap-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100",
                isCopied && "invisible"
              )}
            >
              <Copy size={12} />
              <span className="text-xs">Copy</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
