import { Button } from "@/components/ui/button";

interface ToolbarButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  tooltip: string;
  isActive?: boolean;
}

export default function ToolbarButton({
  onClick,
  icon,
  tooltip,
  isActive = false,
}: ToolbarButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`h-8 w-8 transition-all ${
        isActive
          ? "bg-white dark:bg-zinc-800 text-amber-600 shadow-sm border border-zinc-200 dark:border-zinc-700"
          : "hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500"
      }`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={tooltip}
    >
      {icon}
    </Button>
  );
}
