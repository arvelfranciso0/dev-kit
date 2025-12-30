import { PasswordOptions, StrengthResult } from "@/types/password";
import zxcvbn from "zxcvbn";

export const CHAR_SETS = {
  upper: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  lower: "abcdefghijkmnopqrstuvwxyz",
  numbers: "23456789",
  symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
};

function getSecureRandomInt(max: number): number {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
}

export function generateSecurePassword(options: PasswordOptions): string {
  let pool = "";
  let mandatory = "";

  const sets = {
    upper: options.excludeSimilar
      ? CHAR_SETS.upper
      : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: options.excludeSimilar
      ? CHAR_SETS.lower
      : "abcdefghijklmnopqrstuvwxyz",
    numbers: options.excludeSimilar ? CHAR_SETS.numbers : "0123456789",
    symbols: options.symbols ? CHAR_SETS.symbols : "",
  };

  if (options.upper) {
    pool += sets.upper;
    mandatory += sets.upper[getSecureRandomInt(sets.upper.length)];
  }
  if (options.lower) {
    pool += sets.lower;
    mandatory += sets.lower[getSecureRandomInt(sets.lower.length)];
  }
  if (options.numbers) {
    pool += sets.numbers;
    mandatory += sets.numbers[getSecureRandomInt(sets.numbers.length)];
  }
  if (options.symbols) {
    pool += sets.symbols;
    mandatory += sets.symbols[getSecureRandomInt(sets.symbols.length)];
  }

  if (!pool) return "";

  let result = mandatory;
  for (let i = mandatory.length; i < options.length; i++) {
    result += pool[getSecureRandomInt(pool.length)];
  }

  const array = result.split("");
  for (let i = array.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array.join("");
}

export function checkPasswordStrength(password: string): StrengthResult {
  if (!password) {
    return {
      score: 0,
      label: "Empty",
      variant: "default",
      feedback: undefined, // Explicitly define it as undefined
    };
  }

  const result = zxcvbn(password);

  const map = [
    { label: "Risky", variant: "error" as const },
    { label: "Weak", variant: "error" as const },
    { label: "Fair", variant: "warning" as const },
    { label: "Good", variant: "success" as const },
    { label: "Strong", variant: "success" as const },
  ];

  const selected = map[result.score];

  return {
    score: result.score,
    label: selected.label,
    variant: selected.variant,
    feedback: result.feedback,
  };
}
