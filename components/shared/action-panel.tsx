import { Hash, RotateCcw, Copy, Check, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionPanelProps {
  label: string;
  count?: number;
  onReset?: () => void;
  onCopy?: () => void;
  isCopied?: boolean;
  icon?: React.ReactNode;
  variant?: "input" | "output";
  children: React.ReactNode;
}

export function ActionPanel({
  label,
  count,
  onReset,
  onCopy,
  isCopied,
  icon,
  variant = "input",
  children,
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
      <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
          {icon} {label}
        </span>

        <div className="flex items-center gap-4 text-xs font-mono">
          {typeof count === "number" && (
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Hash size={14} /> {count}
            </span>
          )}
          {onReset && (
            <button
              onClick={onReset}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 text-zinc-400 transition-colors flex items-center gap-1.5 font-bold uppercase"
            >
              <RotateCcw size={14} />{" "}
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
          {onCopy && (
            <button
              onClick={onCopy}
              className="flex items-center gap-2 font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all"
            >
              {isCopied ? (
                <>
                  <Check size={14} className="text-emerald-500" />
                  <span className="text-emerald-500">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
