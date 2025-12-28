import { LucideIcon } from "lucide-react";

interface ToolHeaderProps {
  title: string;
  subtitle: string;
  icon?: LucideIcon;
}

export function ToolHeader({ title, subtitle, icon: Icon }: ToolHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="text-xs text-zinc-500 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
        {Icon && <Icon size={14} className="text-zinc-400" />} {subtitle}
      </p>
    </div>
  );
}
