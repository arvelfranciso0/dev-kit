import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCrowFootMarker(relation?: string) {
  switch (relation) {
    case "*":
      // 0..*
      return "zero-or-many";

    case "1":
      // 1..1
      return "one-only";

    case "?":
      // 0..1
      return "zero-or-one";

    default:
      // fallback (treat as 1)
      return "one-only";
  }
}
