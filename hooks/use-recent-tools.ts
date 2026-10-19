import { useEffect, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "devkit:recent-tools";
const CHANGE_EVENT = "devkit:recent-tools-change";
const MAX_RECENT_TOOLS = 6;

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function getServerSnapshot() {
  return "[]";
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function parseRecentTools(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((href): href is string => typeof href === "string")
      : [];
  } catch {
    return [];
  }
}

// Tracks recently visited tool hrefs in localStorage, most recent first
export function useRecentTools(currentHref?: string) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const recentTools = useMemo(() => parseRecentTools(raw), [raw]);

  useEffect(() => {
    if (!currentHref) return;

    const stored = parseRecentTools(getSnapshot());
    const next = JSON.stringify(
      [currentHref, ...stored.filter((href) => href !== currentHref)].slice(
        0,
        MAX_RECENT_TOOLS
      )
    );
    if (next === getSnapshot()) return;

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode, blocked site data)
      return;
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, [currentHref]);

  return recentTools;
}
