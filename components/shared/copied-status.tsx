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
        </div>
      )}
    </>
  );
}
