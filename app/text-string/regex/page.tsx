"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { parseRegexInput } from "@/lib/string-utils";
import { useEffect, useState } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [text, setText] = useState("");
  const [flags, setFlags] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<RegExpMatchArray | null>(null);

  useEffect(() => {
    if (!pattern) {
      setMatches(null);
      setError(null);
      return;
    }

    try {
      const parsed = parseRegexInput(pattern);
      const regex = new RegExp(parsed.pattern, flags);
      setMatches(text.trim().match(regex));
      setError(null);
    } catch {
      setMatches(null);
      setError("Invalid regex pattern");
    }
  }, [pattern, flags, text]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Regex Tester</h1>

      <Input
        placeholder="Regex pattern"
        className="border p-2 w-full"
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
      />

      <Input
        placeholder="Flags (g, i, m)"
        className="border p-2 w-full"
        value={flags}
        onChange={(e) => setFlags(e.target.value)}
      />

      <Textarea
        placeholder="Test string"
        className="border p-2 w-full h-40"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {error && <p className="text-red-500">{error}</p>}

      {matches && (
        <div className="bg-gray-100 p-3 rounded">
          <strong>Matches:</strong>
          <pre>{JSON.stringify(matches, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
