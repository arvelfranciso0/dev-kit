"use client";

import { useState } from "react";
import {
  base64Encode,
  base64Decode,
  urlEncode,
  urlDecode,
} from "@/lib/string-utils";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EncoderTool() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<
    "Base64 Encode" | "Base64 Decode" | "URL Encode" | "URL Decode"
  >("Base64 Encode");

  const getResult = () => {
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
      return "Invalid input for decoding";
    }
  };

  const result = getResult();

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSelectMode = (value: any) => {
    setText("");
    setMode(value);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl font-semibold">Encoder / Decoder</h1>

      {/* Mode selection with ShadCN Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Select Mode:
        </label>
        <Select
          value={mode}
          onValueChange={(value) => handleSelectMode(value as any)}
        >
          <SelectTrigger className="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <SelectValue placeholder="Select Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Base64 Encode">Base64 Encode</SelectItem>
            <SelectItem value="Base64 Decode">Base64 Decode</SelectItem>
            <SelectItem value="URL Encode">URL Encode</SelectItem>
            <SelectItem value="URL Decode">URL Decode</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Input */}
      <Textarea
        className="border p-2 w-full h-32"
        placeholder="Type here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Output */}
      <div className="relative border rounded p-4 bg-gray-50 dark:bg-gray-800">
        <span className="absolute -top-3 left-3 bg-gray-50 dark:bg-gray-800 px-2 text-sm font-medium text-gray-600 dark:text-gray-300">
          Result
        </span>
        <pre className="whitespace-pre-wrap break-words p-2">{result}</pre>
        <div
          onClick={handleCopy}
          className="absolute top-2 right-2 cursor-pointer text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 select-none"
          title="Copy"
        >
          {copied ? "✓ Copied" : <Copy className="w-4 h-4 inline" />}
        </div>
      </div>
    </div>
  );
}
