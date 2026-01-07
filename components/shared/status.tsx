import { cn } from "@/lib/utils";

export default function Status({
  label,
  value,
  color = "text-zinc-900 dark:text-zinc-100",
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div>
      <p className="text-xs font-black uppercase text-zinc-400 mb-1">{label}</p>
      <p className={cn("text-sm font-mono font-bold", color)}>{value}</p>
    </div>
  );
}
