"use client";

import { CopyItem } from "./copy-item";

interface ConversionItem {
  label: string;
  value: string | number;
  unit: string;
}

export function ConversionCard({ item }: { item: ConversionItem }) {
  const fullString = `${item.value}${item.unit}`;

  return (
    <div className="group flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:border-zinc-200 dark:hover:border-zinc-700 transition-all">
      <CopyItem copyValue={fullString}>
        <div className="space-y-1">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">
            {item.label}
          </span>
          <div className="text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-100 uppercase tabular-nums">
            {item.value}
            <span className="ml-1 text-zinc-300 dark:text-zinc-700">
              {item.unit}
            </span>
          </div>
        </div>
      </CopyItem>
    </div>
  );
}
