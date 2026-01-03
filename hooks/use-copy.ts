import { useState, useCallback } from "react";

export function useCopy(timeout = 2000) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(
    (text: string) => {
      if (!text || text.startsWith("Error")) return;

      navigator.clipboard.writeText(text).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), timeout);
      });
    },
    [timeout]
  );

  return { isCopied, copy };
}
