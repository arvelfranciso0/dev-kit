"use client";

import Link from "next/link";
import { Github, Cpu, ExternalLink } from "lucide-react";
import Image from "next/image";
import { menuGroups } from "@/configs/navigation";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 mt-20 transition-colors">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          {/* BRAND & TAGLINE */}
          <div className="space-y-4 max-w-sm">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/dev-logo.png"
                alt="DevKit Logo"
                className="object-cover rounded-4xl"
                width={40}
                height={40}
              />
              <span className="font-bold tracking-tighter text-md uppercase italic">
                DevKit
              </span>
            </Link>
            <p className="text-[11px] font-mono text-zinc-500 leading-relaxed uppercase tracking-tight">
              A high-performance toolkit for modern engineers. Local-first
              processing. Zero data persistence.
            </p>
          </div>

          {/* QUICK LINKS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                Tool Categories
              </h4>
              <nav className="flex flex-col gap-2.5">
                {menuGroups.map((group) => {
                  const isSoon = group.status === "soon";
                  return isSoon ? (
                    <div
                      key={group.title}
                      className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 dark:text-zinc-700 cursor-not-allowed flex items-center gap-2"
                    >
                      {group.title}
                      <span className="text-[8px] px-1 border border-zinc-200 dark:border-zinc-800 rounded">
                        Soon
                      </span>
                    </div>
                  ) : (
                    <Link
                      key={group.title}
                      href={group.href}
                      className="text-[11px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                      {group.title}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                Popular Tools
              </h4>
              <nav className="flex flex-col gap-2.5">
                {menuGroups[3].items.slice(0, 4).map((item) => {
                  const isSoon = item.status === "soon";

                  return isSoon ? (
                    <div
                      key={item.title}
                      className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 dark:text-zinc-700 cursor-not-allowed flex items-center gap-2"
                    >
                      {item.title}
                      <span className="text-[8px] px-1 border border-zinc-200 dark:border-zinc-800 rounded">
                        Soon
                      </span>
                    </div>
                  ) : (
                    <Link
                      key={item.title}
                      href={`${menuGroups[3].href}${item.href}`}
                      className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
