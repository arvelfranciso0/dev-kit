import CopiedStatus from "@/components/shared/copied-status";
import { CopyItem } from "@/components/shared/copy-item";
import { cn } from "@/lib/utils";

interface PaletteRowProps {
  name: string;
  hex: string;
  isSeed: boolean;
}

export function PaletteRow({ name, hex, isSeed }: PaletteRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer group hover:scale-[1.01]",
        isSeed
          ? "bg-zinc-100/50 dark:bg-zinc-800/50 ring-1 ring-zinc-200 dark:ring-zinc-700"
          : "hover:bg-zinc-50 dark:hover:bg-zinc-900"
      )}
    >
      <CopyItem copyValue={hex}>
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-lg shadow-sm border border-black/5"
            style={{ backgroundColor: hex }}
          />
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-zinc-400 w-8">
                {name}
              </span>
              {isSeed && (
                <span className="text-[8px] font-bold uppercase bg-zinc-900 text-white px-1.5 rounded-full">
                  Seed
                </span>
              )}
            </div>
            <span className="text-xs font-mono font-bold uppercase text-zinc-600 dark:text-zinc-400">
              {hex}
            </span>
          </div>
        </div>
      </CopyItem>
    </div>
  );
}
