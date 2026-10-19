"use client";

import { Heart } from "lucide-react";
import { menuGroups } from "@/configs/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const midPoint = Math.ceil(menuGroups.length / 2);

  return (
    <footer className="border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors">
      {/* BOTTOM SECTION */}
        <div className=" py-12 px-6 border-t border-zinc-50 dark:border-zinc-900/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
              © {currentYear} DevKit
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            <span>Built with</span>
            <Heart
              size={10}
              className="text-zinc-300 dark:text-zinc-700 mx-0.5 fill-current"
            />
            <span>by</span>
            <span className="text-zinc-900 dark:text-zinc-100 italic">
              Arvel Francisco
            </span>
          </div>
        </div>
    </footer>
  );
}
