"use client";

import { ShieldCheck, Key, Lock } from "lucide-react";

import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";

const tools: Tool[] = [
  {
    title: "Password Generator",
    desc: "Cryptographically secure entropy engine with real-time strength analysis.",
    href: "/security/password-generator",
    icon: <Key size={18} />,
    status: "ready",
  },
  {
    title: "JWT Debugger",
    desc: "Decode, verify, and inspect JSON Web Token payloads and headers.",
    href: "/security/jwt-debugger",
    icon: <ShieldCheck size={18} />,
    status: "ready",
  },
  {
    title: "Bcrypt Hasher",
    desc: "Generate and verify salt-rounded hashes for secure credential storage.",
    href: "/security/bcrypt-hasher",
    icon: <Lock size={18} />,
    status: "ready",
  },
];

export default function SecurityAuthHome() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 text-zinc-900 dark:text-zinc-100">
      {/* HEADER */}
      <div className="space-y-4 border-b border-zinc-100 dark:border-zinc-800 pb-10">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          <span>TOOLS</span>
          <span className="text-zinc-200 dark:text-zinc-800">/</span>
          <span className="text-zinc-900 dark:text-zinc-100">
            Security & Auth
          </span>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            Security & Identity
          </h1>
          <p className="text-zinc-500 max-w-xl text-sm leading-relaxed">
            A specialized collection of cryptographic and authentication
            utilities. All processing is performed client-side to ensure zero
            data exposure.
          </p>
        </div>
      </div>

      {/* TOOLS GRID */}
      <div className="p-8 max-w-5xl mx-auto">
        <ToolGrid tools={tools} columns={3} />
      </div>
    </div>
  );
}
