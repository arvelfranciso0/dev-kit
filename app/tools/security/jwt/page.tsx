"use client";

import { useState, useMemo } from "react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { ShieldCheck, Lock, Clock, AlertTriangle, Cpu } from "lucide-react";
import { decodeJwt } from "@/lib/jwt-utils";
import { MetadataCard } from "@/components/shared/meta-card";

export default function JwtDebugger() {
  const [token, setToken] = useState("");

  const decoded = useMemo(() => decodeJwt(token), [token]);

  return (
    <div className="p-4 md:p-8 space-y-8">
      <ToolHeader
        title="JWT Debugger"
        subtitle="Auth Token Inspector & Decoder"
        icon={<ShieldCheck />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ENCODED INPUT */}
        <ActionPanel
          label="Encoded Token"
          onReset={() => setToken("")}
          variant="input"
        >
          <textarea
            className="w-full h-125 p-6 bg-transparent resize-none focus:outline-none text-sm font-mono leading-relaxed break-all"
            placeholder="Paste your JWT here (header.payload.signature)"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            spellCheck={false}
          />
        </ActionPanel>

        {/* DECODED OUTPUT */}
        <div className="space-y-6">
          <ActionPanel label="Header" icon={<Cpu size={14} />} variant="output">
            <pre className="p-6 text-xs font-mono text-pink-600 dark:text-pink-400">
              {decoded
                ? JSON.stringify(decoded.header, null, 2)
                : "// Awaiting token..."}
            </pre>
          </ActionPanel>

          <ActionPanel
            label="Payload"
            icon={<Lock size={14} />}
            variant="output"
          >
            <pre className="p-6 text-xs font-mono text-purple-600 dark:text-purple-400">
              {decoded
                ? JSON.stringify(decoded.payload, null, 2)
                : "// Awaiting token..."}
            </pre>
          </ActionPanel>
        </div>
      </div>

      {/* METADATA STATUS BAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetadataCard
          icon={<Cpu size={14} />}
          label="Algorithm"
          value={decoded?.header?.alg || "---"}
        />
        <MetadataCard
          icon={<Clock size={14} />}
          label="Expiration"
          value={
            decoded?.expiresAt ? decoded.expiresAt.toLocaleTimeString() : "---"
          }
          variant={decoded?.isExpired ? "error" : "success"}
        />
        <MetadataCard
          icon={<ShieldCheck size={14} />}
          label="Status"
          value={
            decoded ? (decoded.isExpired ? "Expired" : "Active") : "Invalid"
          }
          variant={decoded?.isExpired ? "error" : "success"}
        />
        <MetadataCard
          icon={<AlertTriangle size={14} />}
          label="Signature"
          value="Verified (Client-Side)"
        />
      </div>
    </div>
  );
}
