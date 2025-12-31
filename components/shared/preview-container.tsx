"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Smartphone, Monitor } from "lucide-react";

interface PreviewContainerProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  showDevices?: boolean;
  statusLabel?: string;
  style?: React.CSSProperties;
}

export function PreviewContainer({
  children,
  className,
  containerClassName,
  showDevices = false,
  statusLabel = "Live Preview",
  style,
}: PreviewContainerProps) {
  return (
    <div className={cn("lg:col-span-8 h-full min-h-125", containerClassName)}>
      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-[3rem] border border-zinc-200 p-6 transition-all duration-500 flex flex-col items-center justify-center text-center md:p-12 dark:border-zinc-800",
          !style?.backgroundColor && "bg-zinc-50 dark:bg-zinc-900/50",
          className
        )}
        style={style}
      >
        {/* Top Decoration: Status Pulse */}
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            {statusLabel}
          </span>
        </div>

        {/* The Content Area */}
        <div className="w-full max-w-full overflow-hidden px-4 flex flex-col items-center justify-center">
          {children}
        </div>

        {/* Bottom Decoration: Device Interpolation */}
        {showDevices && (
          <div className="absolute bottom-8 flex gap-4 text-zinc-300 dark:text-zinc-700">
            <Smartphone size={16} />
            <div className="h-px w-24 self-center bg-current" />
            <Monitor size={16} />
          </div>
        )}
      </div>
    </div>
  );
}
