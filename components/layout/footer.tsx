"use client";

import Link from "next/link";
import { Terminal, Github, Cpu } from "lucide-react";
import Image from "next/image";

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
                width={50}
                height={50}
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
                Tools
              </h4>
              <nav className="flex flex-col gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                <Link
                  href="/text-string"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  Text Processing
                </Link>
                <Link
                  href="/json-data"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  Data Formats
                </Link>
                <Link href="#" className="opacity-30 cursor-not-allowed">
                  Network Utils
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
