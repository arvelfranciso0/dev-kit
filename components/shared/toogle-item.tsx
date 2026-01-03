import { Switch } from "@/components/ui/switch";

interface ToggleItemProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}
export default function ToggleItem({
  id,
  label,
  description,
  checked,
  onCheckedChange,
}: ToggleItemProps) {
  return (
    <div className="flex items-center justify-between space-x-2 py-1">
      <div className="flex flex-col space-y-0.5">
        <label
          htmlFor={id}
          className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 cursor-pointer"
        >
          {label}
        </label>
        {description && (
          <span className="text-[9px] text-zinc-400 leading-none">
            {description}
          </span>
        )}
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
