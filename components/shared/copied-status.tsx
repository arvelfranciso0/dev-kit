"use client";

import { useCopy } from "@/hooks/use-copy";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils"; // Import your utility

interface CopiedStatusProps {
  copyValue?: string;
  className?: string; // Add this
}

export default function CopiedStatus({
  copyValue,
  className,
}: CopiedStatusProps) {
  const { isCopied, copy } = useCopy();

  return (
    <>
      {copyValue && (
        <button
          onClick={() => copy(copyValue)}
          // Merge default styles with passed className
          className={cn(
            "flex items-center gap-2 font-bold uppercase tracking-widest transition-all",
            className
          )}
        >
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
        </button>
      )}
    </>
  );
}
