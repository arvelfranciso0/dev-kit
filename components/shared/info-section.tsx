import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface InfoSectionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
}

export function InfoSection({
  title,
  description,
  icon: Icon,
  iconColor = "text-zinc-500",
}: InfoSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className={iconColor} size={18} />
        <h4 className="text-sm font-bold uppercase tracking-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </h4>
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
