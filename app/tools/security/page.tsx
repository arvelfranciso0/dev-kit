"use client";

import { Shield, Lock } from "lucide-react";
import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";
import Header from "@/components/shared/header";

const tools: Tool[] = [
  {
    title: "JWT Debugger",
    desc: "Locally decode, verify, and inspect JSON Web Token payloads and header signatures without sending data to a server.",
    href: "/tools/security/jwt",
    icon: <Shield size={18} />,
    status: "ready",
  },
  {
    title: "Bcrypt Hasher",
    desc: "Generate and verify cryptographically secure password hashes using adaptive salt rounds for industry-standard protection.",
    href: "/tools/security/bcrypt",
    icon: <Lock size={18} />,
    status: "ready",
  },
];

export default function SecurityHome() {
  return (
    <div className="p-8 space-y-12">
      <Header
        category="Security"
        title="Security Utilities"
        description="Inspect, hash, and verify sensitive data safely."
      />
      <ToolGrid tools={tools} columns={3} />
    </div>
  );
}
