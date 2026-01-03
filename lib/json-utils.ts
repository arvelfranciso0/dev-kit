import Papa from "papaparse";
import { diffJson } from "diff";
import { DiffResult } from "@/types/json";
import { Parser } from "@json2csv/plainjs";
import { flatten } from "@json2csv/transforms";

export function formatJSON(val: string, indent: number = 2): string {
  if (!val) return "";
  try {
    const obj = JSON.parse(val);
    return JSON.stringify(obj, null, indent);
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export function minifyJSON(val: string): string {
  if (!val) return "";
  try {
    const obj = JSON.parse(val);
    return JSON.stringify(obj);
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export function jsonToCsv(jsonString: string): string {
  try {
    const jsonData = JSON.parse(jsonString);
    const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];

    // Create the parser with the flatten transform
    const parser = new Parser({
      transforms: [
        flatten({
          objects: true,
          arrays: false,
          separator: ".",
        }),
      ],
    });

    return parser.parse(dataArray);
  } catch (error: any) {
    throw new Error(error.message || "Failed to convert JSON to CSV");
  }
}

export function csvToJson(csvInput: string) {
  const result = Papa.parse(csvInput, {
    header: true, // Use the first row as keys for the objects
    skipEmptyLines: true, // Ignore trailing newlines
    dynamicTyping: true, // Convert "123" to 123 (number) and "true" to true (boolean)
  });

  if (result.errors.length > 0) {
    throw new Error(result.errors[0].message);
  }

  return JSON.stringify(result.data, null, 2);
}

export function parseCsvFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        resolve(JSON.stringify(results.data, null, 2));
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

export function compareJson(oldStr: string, newStr: string): DiffResult {
  try {
    // We parse and re-stringify to ensure the comparison is based on
    // structural content, not just whitespace/formatting.
    const obj1 = JSON.parse(oldStr);
    const obj2 = JSON.parse(newStr);

    const changes = diffJson(obj1, obj2);
    return { changes };
  } catch (e) {
    return { changes: [], error: "Invalid JSON format in one of the inputs." };
  }
}
