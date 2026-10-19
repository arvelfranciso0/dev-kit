"use client";

import { useCopy } from "@/hooks/use-copy";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils"; // Import your utility
import { ReactNode } from "react";

interface CopiedStatusProps {
  copyValue?: string;
  className?: string; // Add this
  children?: ReactNode;
}

export default function CopiedStatus({
  copyValue,
  className,
  children,
}: CopiedStatusProps) {
  const { isCopied, copy } = useCopy();

  return (
    <>
      {copyValue && (
        <button
          onClick={() => copy(copyValue)}
          className={cn(
            "flex w-full items-center justify-between gap-4 font-bold  tracking-widest transition-all cursor-pointer", // Added w-full and items-center
            className
          )}
        >
          {/* Both labels share one grid cell so the width always fits "Copied";
              swapping them never resizes the button or shifts the layout. */}
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
        </button>
      )}
    </>
  );
}
