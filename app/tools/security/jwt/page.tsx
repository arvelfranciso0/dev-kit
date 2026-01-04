"use client";

import { useState, useMemo } from "react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import {
  ShieldCheck,
  Clock,
  Cpu,
  Layers,
  ShieldAlert,
  LockKeyhole,
  FileJson,
  Activity,
} from "lucide-react";
import { decodeJwt } from "@/lib/jwt-utils";
import { MetadataCard } from "@/components/shared/meta-card";
import { InfoSection } from "@/components/shared/info-section";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function JwtDebugger() {
  const [token, setToken] = useState("");

  const decoded = useMemo(() => {
    if (!token) return null;
    return decodeJwt(token);
  }, [token]);

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* HEADER & METRICS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <ToolHeader
          title="JWT Debugger"
          subtitle="Inspect, decode, and validate JSON Web Tokens instantly."
          icon={<ShieldCheck />}
        />

        <div className="flex justify-end">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full md:w-auto md:min-w-150">
            <MetadataCard
              icon={<Cpu size={14} className="text-zinc-400" />}
              label="Algorithm"
              value={decoded?.header?.alg || "---"}
            />
            <MetadataCard
              icon={
                <Clock
                  size={14}
                  className={cn(
                    decoded?.isExpired ? "text-destructive" : "text-emerald-500"
                  )}
                />
              }
              label="Expiration"
              value={
                decoded?.expiresAt
                  ? decoded.expiresAt.toLocaleTimeString()
                  : "---"
              }
              variant={decoded?.isExpired ? "error" : "success"}
            />
            <MetadataCard
              icon={<Activity size={14} className="text-blue-500" />}
              label="Status"
              value={
                decoded
                  ? decoded.isExpired
                    ? "Expired"
                    : "Valid Format"
                  : "Empty"
              }
            />
            <MetadataCard
              icon={<ShieldAlert size={14} className="text-amber-500" />}
              label="Signature"
              value="Unverified"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ENCODED INPUT (LEFT) */}
        <div className="lg:col-span-5">
          <ActionPanel
            label="Encoded Token"
            icon={<LockKeyhole size={14} />}
            onReset={() => setToken("")}
          >
            <Textarea
              className="h-151 p-4 "
              placeholder="Paste token (xxxxx.yyyyy.zzzzz)"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              spellCheck={false}
            />
          </ActionPanel>
        </div>

        {/* DECODED OUTPUT (RIGHT) */}
        <div className="lg:col-span-7 space-y-6">
          {/* HEADER SECTION */}
          <ActionPanel
            label="Header: Algorithm & Token Type"
            icon={<FileJson size={14} className="text-pink-500" />}
            variant="output"
          >
            <div className="p-6 bg-white dark:bg-zinc-950/50">
              <pre className="text-xs font-mono text-pink-600 dark:text-pink-400 leading-6">
                {decoded
                  ? JSON.stringify(decoded.header, null, 2)
                  : "// Waiting for header data..."}
              </pre>
            </div>
          </ActionPanel>

          {/* PAYLOAD SECTION */}
          <ActionPanel
            label="Payload: Data & Claims"
            icon={<Layers size={14} className="text-purple-500" />}
            variant="output"
          >
            <div className="p-6 bg-white dark:bg-zinc-950/50">
              <pre className="text-xs font-mono text-purple-600 dark:text-purple-400 leading-6">
                {decoded
                  ? JSON.stringify(decoded.payload, null, 2)
                  : "// Waiting for payload data..."}
              </pre>
            </div>
          </ActionPanel>

          {/* SIGNATURE SECTION (UI Placeholder for completeness) */}
          <ActionPanel
            label="Signature"
            icon={<ShieldCheck size={14} className="text-blue-500" />}
            variant="output"
          >
            <div className="p-6 bg-zinc-50/50 dark:bg-zinc-900/20 border-t border-zinc-100 dark:border-zinc-800">
              <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mb-2">
                HMACSHA256 (
              </div>
              <div className="text-xs font-mono text-blue-500 truncate">
                {token.split(".")[2] || "base64url_encode(signature)"}
              </div>
              <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mt-2">
                )
              </div>
            </div>
          </ActionPanel>
        </div>
      </div>

      {/* INFO FOOTER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t border-zinc-100 dark:border-zinc-800 pt-12">
        <InfoSection
          title="Three-Part Anatomy"
          icon={Layers}
          description="JSON Web Tokens consist of three parts: Header, Payload, and Signature. Our debugger decodes these segments instantly, allowing you to inspect claims and expiration dates without manual Base64 decoding."
        />
        <InfoSection
          title="Security Validation"
          icon={ShieldAlert}
          description="A JWT is only as reliable as its signature. While this tool decodes the data client-side, always ensure your server verifies the signature against a secret key to prevent token tampering."
        />
      </div>
    </div>
  );
}
