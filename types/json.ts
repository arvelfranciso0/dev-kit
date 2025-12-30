import { Change } from "diff";
export interface DiffResult {
  changes: Change[];
  error?: string;
}
