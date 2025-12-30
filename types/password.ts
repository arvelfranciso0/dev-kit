import { ZXCVBNFeedback } from "zxcvbn";
export interface StrengthResult {
  label: string;
  variant: "default" | "error" | "warning" | "success";
  score: number;
  feedback?: ZXCVBNFeedback; // Made optional so it exists on all members of the union
}

export interface PasswordOptions {
  length: number;
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeSimilar: boolean;
}
