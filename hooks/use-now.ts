import { useEffect, useState } from "react";

// Current time, refreshed every `interval` ms. Null until mounted to avoid hydration mismatches.
export function useNow(interval = 100) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setNow(new Date()));
    const id = setInterval(() => setNow(new Date()), interval);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(id);
    };
  }, [interval]);

  return now;
}
