"use client";

import { useState } from "react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { MetadataCard } from "@/components/shared/meta-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  Hash,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  Cpu,
  Fingerprint,
  Activity,
  Shield,
} from "lucide-react";
import { hashText, verifyHash, BCRYPT_CONFIG } from "@/lib/crypto-utils";
import { cn } from "@/lib/utils";
import { InfoSection } from "@/components/shared/info-section";

export default function BcryptHasher() {
  const [input, setInput] = useState("");
  const [rounds, setRounds] = useState([10]);
  const [hash, setHash] = useState("");
  const [isHashing, setIsHashing] = useState(false);

  // Verification State
  const [verifyInput, setVerifyInput] = useState("");
  const [verifyTarget, setVerifyTarget] = useState("");
  const [matchStatus, setMatchStatus] = useState<"idle" | "match" | "mismatch">(
    "idle"
  );

  const getSecurityLevel = (r: number) => {
    if (r < 8) return { label: "Low", color: "text-rose-500" };
    if (r < 12) return { label: "Standard", color: "text-emerald-500" };
    return { label: "High", color: "text-blue-500" };
  };

  const security = getSecurityLevel(rounds[0]);

  const handleHash = async () => {
    if (!input) return;
    setIsHashing(true);
    try {
      const result = await hashText(input, rounds[0]);
      setHash(result);
    } finally {
      setIsHashing(false);
    }
  };

  const handleVerify = async () => {
    if (!verifyInput || !verifyTarget) return;
    const isMatch = await verifyHash(verifyInput, verifyTarget);
    setMatchStatus(isMatch ? "match" : "mismatch");
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header & Dynamic Metrics */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <ToolHeader
          title="Bcrypt Hasher"
          subtitle="Secure password hashing with adaptive cost factors."
          icon={<Lock />}
        />

        <div className="flex justify-end">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto md:min-w-112.5">
            <MetadataCard
              icon={<Cpu size={14} className="text-zinc-400" />}
              label="Complexity"
              value={`2^${rounds[0]}`}
            />
            <MetadataCard
              icon={<Shield size={14} className={security.color} />}
              label="Security"
              value={security.label}
            />
            <MetadataCard
              icon={<Activity size={14} className="text-amber-500" />}
              label="Status"
              value={isHashing ? "Hashing..." : "Idle"}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: CONFIGURATION (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          <ActionPanel
            label="Hasher Configuration"
            icon={<Fingerprint size={14} />}
          >
            <div className="p-6 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Cost Factor (Salt Rounds)
                  </label>
                  <Badge
                    variant="outline"
                    className="font-mono px-3 py-1 rounded-lg"
                  >
                    {rounds[0]} Rounds
                  </Badge>
                </div>
                <Slider
                  value={rounds}
                  onValueChange={setRounds}
                  min={BCRYPT_CONFIG.minRounds}
                  max={BCRYPT_CONFIG.maxRounds}
                  step={1}
                  className="py-4"
                />
                <p className="text-[10px] text-zinc-500 italic leading-relaxed">
                  Recommended: 10-12. Each increment doubles the time required
                  to verify.
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Plaintext String
                  </label>
                  <Input
                    placeholder="Enter password or secret..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="h-12 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rounded-xl"
                  />
                </div>
                <Button
                  className="w-full h-12 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md hover:opacity-90"
                  disabled={!input || isHashing}
                  onClick={handleHash}
                >
                  {isHashing ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Hash className="mr-2 h-4 w-4" />
                  )}
                  Generate Bcrypt Hash
                </Button>
              </div>
            </div>
          </ActionPanel>
        </div>

        {/* RIGHT: OUTPUT & VERIFICATION (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          <ActionPanel
            label="Resulting Hash"
            variant="output"
            onReset={() => {
              setHash("");
              setInput("");
            }}
            copyValue={hash}
          >
            <div className="p-6 bg-white dark:bg-zinc-950/50 min-h-24 flex items-center">
              <p
                className={cn(
                  "font-mono text-sm break-all leading-relaxed",
                  hash
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-zinc-400 italic"
                )}
              >
                {hash || "Awaiting generation..."}
              </p>
            </div>
          </ActionPanel>

          <ActionPanel
            label="Verify Authenticity"
            icon={<ShieldCheck size={14} />}
          >
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Plaintext to Check
                  </label>
                  <Input
                    placeholder="Secret string..."
                    value={verifyInput}
                    onChange={(e) => setVerifyInput(e.target.value)}
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Existing Hash
                  </label>
                  <Input
                    placeholder="$2b$10$..."
                    value={verifyTarget}
                    onChange={(e) => setVerifyTarget(e.target.value)}
                    className="h-11 rounded-xl font-mono text-xs"
                  />
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full h-11 rounded-xl border-zinc-200 dark:border-zinc-800"
                onClick={handleVerify}
                disabled={!verifyInput || !verifyTarget}
              >
                Compare Hash & String
              </Button>

              {matchStatus !== "idle" && (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <MetadataCard
                    variant={matchStatus === "match" ? "success" : "error"}
                    icon={
                      matchStatus === "match" ? (
                        <ShieldCheck size={16} className="text-emerald-500" />
                      ) : (
                        <ShieldAlert size={16} className="text-rose-500" />
                      )
                    }
                    label="Verification Result"
                    value={
                      matchStatus === "match"
                        ? "Signature Verified"
                        : "Mismatched Signatures"
                    }
                  />
                </div>
              )}
            </div>
          </ActionPanel>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t border-zinc-100 dark:border-zinc-800 pt-12">
        <InfoSection
          title="Cryptographic Salting"
          icon={Fingerprint}
          description="Bcrypt automatically incorporates a random salt. This ensures identical passwords produce unique hashes, neutralizing rainbow table attacks."
        />
        <InfoSection
          title="Adaptive Work Factor"
          icon={ShieldCheck}
          description="The cost factor doubles the hashing time with every increment. This 'slowness' is intentional, making brute-force attacks computationally expensive."
        />
      </div>
    </div>
  );
}
