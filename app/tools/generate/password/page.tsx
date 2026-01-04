"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { MetadataCard } from "@/components/shared/meta-card";
import {
  Key,
  RefreshCw,
  Ruler,
  AlertCircle,
  ShieldCheck,
  Lock,
} from "lucide-react";
import {
  generateSecurePassword,
  checkPasswordStrength,
} from "@/lib/password-utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { PasswordOptions } from "@/types/password";
import ToggleItem from "@/components/shared/toogle-item";
import { InfoSection } from "@/components/shared/info-section";

export default function PasswordGenerator() {
  const [length, setLength] = useState<number[]>([16]);
  const [options, setOptions] = useState<Omit<PasswordOptions, "length">>({
    upper: true,
    lower: true,
    numbers: true,
    symbols: true,
    excludeSimilar: true,
  });

  const [password, setPassword] = useState("");

  const handleGenerate = useCallback(() => {
    const newPassword = generateSecurePassword({
      length: length[0],
      ...options,
    });
    setPassword(newPassword);
  }, [length, options]);

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  const strength = useMemo(() => checkPasswordStrength(password), [password]);

  return (
    <div className="p-4 md:p-8 space-y-8">
      <ToolHeader
        title="Password Generator"
        subtitle="Cryptographically secure entropy engine"
        icon={<Key />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SETTINGS PANEL */}
        <div className="lg:col-span-1 space-y-6">
          <ActionPanel label="Configuration">
            <div className="p-6 space-y-8">
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                    Key Length
                  </label>
                  <Badge variant="secondary" className="font-mono">
                    {length[0]}
                  </Badge>
                </div>
                <Slider
                  value={length}
                  onValueChange={setLength}
                  min={8}
                  max={64}
                  step={1}
                  className="py-4"
                />
              </div>

              <div className="space-y-4">
                <div className="grid gap-4">
                  <ToggleItem
                    id="upper"
                    label="Uppercase"
                    checked={options.upper}
                    onCheckedChange={(v) =>
                      setOptions((prev) => ({ ...prev, upper: v }))
                    }
                  />
                  <ToggleItem
                    id="lower"
                    label="Lowercase"
                    checked={options.lower}
                    onCheckedChange={(v) =>
                      setOptions((prev) => ({ ...prev, lower: v }))
                    }
                  />
                  <ToggleItem
                    id="numbers"
                    label="Numbers"
                    checked={options.numbers}
                    onCheckedChange={(v) =>
                      setOptions((prev) => ({ ...prev, numbers: v }))
                    }
                  />
                  <ToggleItem
                    id="symbols"
                    label="Symbols"
                    checked={options.symbols}
                    onCheckedChange={(v) =>
                      setOptions((prev) => ({ ...prev, symbols: v }))
                    }
                  />
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <ToggleItem
                    id="similar"
                    label="Exclude Similar"
                    description="Avoids ambiguous chars (Il1O0)"
                    checked={options.excludeSimilar}
                    onCheckedChange={(v) =>
                      setOptions((prev) => ({ ...prev, excludeSimilar: v }))
                    }
                  />
                </div>
              </div>
            </div>
          </ActionPanel>
        </div>

        {/* OUTPUT PANEL */}
        <div className="lg:col-span-2 space-y-6">
          <ActionPanel
            label="Secure Result"
            variant="output"
            onReset={() => {
              setPassword("");
              setLength([16]);
            }}
            copyValue={password}
          >
            <div className="relative p-8 flex items-center min-h-40 bg-zinc-50 dark:bg-zinc-900/30 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800">
              <div className="flex-1 overflow-x-auto scrollbar-hide mr-4">
                <p
                  className={cn(
                    "text-2xl md:text-3xl font-mono font-black tracking-tighter text-zinc-800 dark:text-zinc-100 break-all",
                    password === "" && "opacity-20"
                  )}
                >
                  {password || "Configure options..."}
                </p>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleGenerate}
                  className="rounded-xl border-zinc-200 dark:border-zinc-800"
                >
                  <RefreshCw size={18} className="text-zinc-500" />
                </Button>
              </div>
            </div>
          </ActionPanel>

          <div className="grid grid-cols-2 gap-4">
            <MetadataCard
              icon={<Ruler size={14} />}
              label="Entropy"
              value={`${length[0]} bits`}
            />
            <MetadataCard
              icon={<ShieldCheck size={14} />}
              label="Security"
              value={strength.label}
              variant={strength.variant}
            />
          </div>

          {strength.feedback?.warning && (
            <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle
                size={16}
                className="text-rose-500 shrink-0 mt-0.5"
              />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">
                  Vulnerability Alert
                </p>
                <p className="text-xs text-zinc-500 mt-1 italic">
                  {strength.feedback.warning}.{" "}
                  {strength.feedback.suggestions?.[0]}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t border-zinc-100 dark:border-zinc-800 pt-12">
        <InfoSection
          title="Cryptographic Entropy"
          icon={ShieldCheck}
          description="True security relies on high entropy. Our generator uses cryptographically strong pseudo-random number generators (CSPRNG) to ensure that every character is unpredictable and resistant to brute-force dictionary attacks."
        />
        <InfoSection
          title="Zero-Knowledge Generation"
          icon={Lock}
          description="Your security is our priority. Passwords are generated entirely within your browser's local environment. No data is ever transmitted to a server or stored in a database, ensuring your credentials remain private and offline."
        />
      </div>
    </div>
  );
}
