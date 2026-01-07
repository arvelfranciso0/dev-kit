"use client";

import { ToolHeader } from "@/components/shared/tool-header";
import { Construction, LayoutPanelLeft, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ComingSoonProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function ComingSoon({
  title = "Feature in Development",
  subtitle = "Module Reserved",
  description = "This utility is currently being engineered. We're focusing on browser-native performance and minimalist design.",
}: ComingSoonProps) {
  return (
    <div className="relative min-h-[75vh] w-full flex flex-col items-center justify-center overflow-hidden">
      {/* BACKGROUND DECORATION: Blueprint Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="max-w-2xl px-6 flex flex-col items-center text-center space-y-8">
        {/* ICON LOGIC */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 animate-pulse bg-zinc-100 dark:bg-zinc-900 rounded-full blur-2xl opacity-50" />
          <div className="relative p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl">
            <Construction
              className="w-10 h-10 text-zinc-400"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* REUSABLE HEADER LOGIC */}
        <div className="space-y-4">
          <ToolHeader
            title={title}
            subtitle={subtitle}
            icon={<LayoutPanelLeft />}
          />
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-md mx-auto font-medium">
            {description}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Button
            asChild
            variant="outline"
            className="rounded-xl px-6 h-11 font-bold uppercase tracking-widest text-xs border-zinc-200 dark:border-zinc-800"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft size={14} /> Return to Dashboard
            </Link>
          </Button>

          {/* Status Badge */}
          <div className="px-4 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
              Priority: High
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
