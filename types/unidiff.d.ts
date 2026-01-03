declare module "unidiff" {
  export interface DiffLine {
    type: "add" | "del" | "common";
    ln1?: number;
    ln2?: number;
    content: string;
  }

  export interface DiffOptions {
    context?: number;
  }

  /**
   * Compares two strings and returns an array of changes.
   */
  export function diffLines(oldText: string, newText: string): DiffLine[];

  /**
   * Formats an array of DiffLines into a unified diff string format.
   */
  export function formatLines(diff: DiffLine[], options?: DiffOptions): string;
}
