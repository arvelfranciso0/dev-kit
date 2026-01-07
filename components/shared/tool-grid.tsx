"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Tool } from "@/types/tools";

interface ToolGridProps {
  tools: Tool[];
  columns?: 2 | 3 | 4;
}

export function ToolGrid({ tools, columns = 3 }: ToolGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid grid-cols-1 gap-4", gridCols[columns])}>
      {tools.map((tool) => (
        <ToolCard key={tool.title} tool={tool} />
      ))}
    </div>
  );
}

export function ToolCard({ tool }: { tool: Tool }) {
  const isReady = tool.status === "ready";

  return (
    <Link
      href={isReady ? tool.href : "#"}
      className={cn("group block h-full", !isReady && "cursor-not-allowed")}
    >
      <Card
        className={cn(
          "relative flex flex-col justify-between p-6 h-48 rounded-2xl border transition-all duration-300",
          isReady
            ? "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-900 dark:hover:border-zinc-100 hover:shadow-md"
            : "border-dashed border-zinc-200 dark:border-zinc-800 opacity-60"
        )}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:scale-105 transition-transform">
              {tool.icon}
            </div>

            {isReady ? (
              <ArrowUpRight
                size={16}
                className="text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            ) : (
              <span className="text-xs font-black uppercase tracking-widest text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded-md">
                Soon
              </span>
            )}
          </div>

          <div>
            <h3 className="font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-50">
              {tool.title}
            </h3>
            <p className="text-xs text-zinc-500 leading-normal mt-1.5 line-clamp-2">
              {tool.desc}
            </p>
          </div>
        </div>

        {isReady && (
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
            Open Tool{" "}
            <ArrowRight
              size={10}
              className="group-hover:translate-x-1 transition-transform"
            />
          </div>
        )}
      </Card>
    </Link>
  );
}
