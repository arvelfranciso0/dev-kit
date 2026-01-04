"use client";

import { useState } from "react";
import {
  base64Encode,
  base64Decode,
  urlEncode,
  urlDecode,
} from "@/lib/string-utils";
import { ArrowRightLeft, Sparkles, Terminal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { InfoSection } from "@/components/shared/info-section";
import { Textarea } from "@/components/ui/textarea";

type Mode = "Base64 Encode" | "Base64 Decode" | "URL Encode" | "URL Decode";

export default function EncoderTool() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<Mode>("Base64 Encode");

  const getResult = () => {
    if (!text) return "";
    try {
      switch (mode) {
        case "Base64 Encode":
          return base64Encode(text);
        case "Base64 Decode":
          return base64Decode(text);
        case "URL Encode":
          return urlEncode(text);
        case "URL Decode":
          return urlDecode(text);
        default:
          return text;
      }
    } catch {
      return "Error: Invalid input for decoding";
    }
  };

  const result = getResult();

  const toggleDirection = () => {
    setMode((prev) => {
      if (prev === "Base64 Encode") return "Base64 Decode";
      if (prev === "Base64 Decode") return "Base64 Encode";
      if (prev === "URL Encode") return "URL Decode";
      return "URL Encode";
    });
  };

  return (
    <div className="p-4 md:p-8 space-y-8 text-zinc-900 dark:text-zinc-100">
      {/* REUSABLE HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <ToolHeader
          title="Encoder / Decoder"
          subtitle="Protocol Transformation Engine"
          icon={<Terminal />}
        />

        <div className="flex flex-col gap-2.5">
          <Label className="text-xs uppercase font-black tracking-[0.15em] text-zinc-400">
            Transformation Method
          </Label>
          <div className="flex gap-2">
            <Select
              value={mode}
              onValueChange={(value) => setMode(value as Mode)}
            >
              <SelectTrigger className="w-50 h-11 rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm font-bold text-xs uppercase tracking-wider">
                <SelectValue placeholder="Select Mode" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-zinc-200 dark:border-zinc-800">
                <SelectItem
                  value="Base64 Encode"
                  className="text-xs font-bold uppercase"
                >
                  Base64 Encode
                </SelectItem>
                <SelectItem
                  value="Base64 Decode"
                  className="text-xs font-bold uppercase"
                >
                  Base64 Decode
                </SelectItem>
                <SelectItem
                  value="URL Encode"
                  className="text-xs font-bold uppercase"
                >
                  URL Encode
                </SelectItem>
                <SelectItem
                  value="URL Decode"
                  className="text-xs font-bold uppercase"
                >
                  URL Decode
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDirection}
              className="h-11 w-11 rounded-lg border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all active:scale-95"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* WORKSPACE AREA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* REUSABLE INPUT PANEL */}
        <ActionPanel
          label="Raw Input"
          count={text.length}
          onReset={() => setText("")}
          variant="input"
        >
          <Textarea
            className="h-80 p-4"
            placeholder="Enter raw text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </ActionPanel>

        {/* REUSABLE OUTPUT PANEL */}
        <ActionPanel
          label="Output Result"
          icon={<Sparkles size={14} />}
          copyValue={result}
          variant="output"
        >
          <div
            className={cn(
              "h-80 md:h-112.5 p-6 font-mono text-base break-all overflow-auto leading-relaxed",
              result.startsWith("Error")
                ? "text-destructive/80"
                : "text-zinc-700 dark:text-zinc-300"
            )}
          >
            {result || (
              <span className="text-zinc-400 dark:text-zinc-800 italic font-sans select-none">
                Waiting for input...
              </span>
            )}
          </div>
        </ActionPanel>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 border-t border-zinc-100 dark:border-zinc-800 pt-12">
        <InfoSection
          title="Base64 vs. URL Encoding"
          icon={ArrowRightLeft}
          description="Base64 converts binary data or complex strings into safe ASCII text for reliable transmission, while URL encoding targets reserved characters such as '&', '?', and '=' to ensure web addresses remain valid and functional."
        />
        <InfoSection
          title="Data Integrity & Safety"
          icon={Sparkles}
          description="Client-side transformations ensure that sensitive strings such as API keys or session fragments remain within the local environment. This protocol transformation engine preserves data integrity without requiring server-side processing."
        />
      </div>
    </div>
  );
}
