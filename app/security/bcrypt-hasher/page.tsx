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
  Check,
  Copy,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  Cpu,
} from "lucide-react";
import { hashText, verifyHash, BCRYPT_CONFIG } from "@/lib/crypto-utils";
import { cn } from "@/lib/utils";

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
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <ToolHeader
        title="Bcrypt Hasher"
        subtitle="Secure password hashing with adjustable cost factors"
        icon={<Lock />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: CONFIG */}
        <div className="space-y-6">
          <ActionPanel label="Hashing Parameters">
            <div className="p-6 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Salt Rounds (Cost)
                  </label>
                  <Badge variant="secondary" className="font-mono">
                    {rounds[0]}
                  </Badge>
                </div>
                <Slider
                  value={rounds}
                  onValueChange={setRounds}
                  min={BCRYPT_CONFIG.minRounds}
                  max={BCRYPT_CONFIG.maxRounds}
                  step={1}
                />
                <p className="text-[10px] text-zinc-500 italic leading-relaxed">
                  Higher rounds increase security but take longer to compute. 10
                  is industry standard.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  Plaintext Input
                </label>
                <Input
                  placeholder="String to hash..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                />
                <Button
                  className="w-full"
                  disabled={!input || isHashing}
                  onClick={handleHash}
                >
                  {isHashing ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Hash className="mr-2 h-4 w-4" />
                  )}
                  Generate Hash
                </Button>
              </div>
            </div>
          </ActionPanel>

          <div className="grid grid-cols-1 gap-4">
            <MetadataCard
              icon={<Cpu size={14} />}
              label="Complexity"
              value={`2^${rounds[0]} iterations`}
            />
          </div>
        </div>

        {/* RIGHT: RESULTS & VERIFICATION */}
        <div className="lg:col-span-2 space-y-6">
          {/* HASH OUTPUT */}
          <ActionPanel
            label="Generated Hash"
            variant="output"
            onReset={() => {
              setHash("");
              setInput("");
              setRounds([10]);
            }}
            copyValue={hash}
          >
            <div className="relative p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 min-h-25 flex items-center justify-between group">
              <p
                className={cn(
                  "font-mono text-sm break-all pr-12 text-zinc-700 dark:text-zinc-300",
                  !hash && "opacity-30 italic"
                )}
              >
                {hash || "Waiting for generation..."}
              </p>
              {/* {hash && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="text-emerald-500" size={18} />
                  ) : (
                    <Copy size={18} />
                  )}
                </Button>
              )} */}
            </div>
          </ActionPanel>

          {/* VERIFICATION SECTION */}
          <ActionPanel label="Verify Existing Hash">
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Plaintext to check..."
                  value={verifyInput}
                  onChange={(e) => setVerifyInput(e.target.value)}
                />
                <Input
                  placeholder="Bcrypt hash to compare..."
                  value={verifyTarget}
                  onChange={(e) => setVerifyTarget(e.target.value)}
                />
              </div>
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleVerify}
                disabled={!verifyInput || !verifyTarget}
              >
                Verify Authenticity
              </Button>

              {matchStatus !== "idle" && (
                <div
                  className={cn(
                    "p-4 rounded-xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-2",
                    matchStatus === "match"
                      ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600"
                      : "bg-rose-500/5 border-rose-500/20 text-rose-600"
                  )}
                >
                  {matchStatus === "match" ? (
                    <ShieldCheck size={18} />
                  ) : (
                    <ShieldAlert size={18} />
                  )}
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {matchStatus === "match"
                      ? "Hash Match Confirmed"
                      : "Hash Mismatch - Invalid"}
                  </span>
                </div>
              )}
            </div>
          </ActionPanel>
        </div>
      </div>
    </div>
  );
}
