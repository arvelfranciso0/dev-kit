import { cn } from "@/lib/utils";

interface MetadataCardProps {
  icon?: React.ReactNode;
  label: string;
  value: string;
  variant?: "default" | "success" | "error" | "warning";
}

export function MetadataCard({
  icon,
  label,
  value,
  variant = "default",
}: MetadataCardProps) {
  const variantStyles = {
    default: "text-zinc-600 dark:text-zinc-400",
    success: "text-emerald-600 dark:text-emerald-400",
    error: "text-rose-600 dark:text-rose-400",
    warning: "text-amber-600 dark:text-amber-400",
  };

  return (
    <div className="p-4 rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm transition-all hover:border-zinc-200 dark:hover:border-zinc-800">
      <div className="flex items-center gap-2 mb-2 opacity-40">
        <div className="shrink-0">{icon}</div>
        <span className="text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
          {label}
        </span>
      </div>
      <p className={cn("text-xs font-bold font-mono ", variantStyles[variant])}>
        {value}
      </p>
    </div>
  );
}
