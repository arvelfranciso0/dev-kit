"use client";

import Link from "next/link";
import { Github, Heart } from "lucide-react";
import Image from "next/image";
import { menuGroups } from "@/configs/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const midPoint = Math.ceil(menuGroups.length / 2);
  const leftCol = menuGroups.slice(0, midPoint);
  const rightCol = menuGroups.slice(midPoint);

  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 mt-20 transition-colors">
      <div className="px-6 py-12">
        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-16">
          {/* BRAND & TAGLINE */}
          <div className="space-y-4 max-w-sm">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/dev-logo.png"
                alt="DevKit Logo"
                className="object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500"
                width={32}
                height={32}
              />
              <span className="font-bold tracking-tighter text-lg uppercase italic text-zinc-900 dark:text-zinc-100">
                DevKit
              </span>
            </Link>
            <p className="text-[11px] font-mono text-zinc-500 leading-relaxed uppercase tracking-tight">
              A high-performance toolkit for modern engineers. Local-first
              processing. Zero data persistence.
            </p>
          </div>

          {/* QUICK LINKS GRID - Two Columns */}
          <div className="flex-1 max-w-xl">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">
              Tool Categories
            </h4>
            <div className="grid grid-cols-2 gap-x-12 gap-y-10">
              {/* Column 1 */}
              <nav className="flex flex-col gap-3">
                {leftCol.map((group) => (
                  <FooterLink key={group.title} group={group} />
                ))}
              </nav>

              {/* Column 2 */}
              <nav className="flex flex-col gap-3">
                {rightCol.map((group) => (
                  <FooterLink key={group.title} group={group} />
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-16 pt-8 border-t border-zinc-50 dark:border-zinc-900/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              © {currentYear} DevKit
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
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
      </div>
    </footer>
  );
}
function FooterLink({ group }: { group: (typeof menuGroups)[0] }) {
  const isSoon = group.status === "soon";

  if (isSoon) {
    return (
      <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 dark:text-zinc-700 cursor-not-allowed flex items-center justify-between">
        {group.title}
        <span className="text-[7px] px-1 border border-zinc-200 dark:border-zinc-800 rounded">
          Soon
        </span>
      </div>
    );
  }

  return (
    <Link
      href={group.href}
      className="text-[11px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
    >
      {group.title}
    </Link>
  );
}
