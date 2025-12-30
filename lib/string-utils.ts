import { SlugOptions } from "@/types/string";

export const toUpper = (text: string) => text.toUpperCase();
export const toLower = (text: string) => text.toLowerCase();

export const toCamelCase = (text: string) => {
  const words = text
    .replace(/([a-z])([A-Z])/g, "$1 $2") // separate camel case words
    .replace(/[_\s]+/g, " ") // replace _ or multiple spaces with single space
    .toLowerCase()
    .split(" ");

  return words
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
};

export const toSnakeCase = (text: string) => {
  const words = text
    .replace(/([a-z])([A-Z])/g, "$1 $2") // separate camel case words
    .replace(/[\s]+/g, "_") // replace spaces with _
    .toLowerCase();

  return words;
};

export const base64Encode = (text: string) =>
  typeof window !== "undefined" ? btoa(text) : "";

export const base64Decode = (text: string) =>
  typeof window !== "undefined" ? atob(text) : "";

export const urlEncode = (text: string) => encodeURIComponent(text);
export const urlDecode = (text: string) => decodeURIComponent(text);

export const parseRegexInput = (input: string) => {
  const match = input.match(/^\/(.+)\/([gimsuy]*)$/);

  if (match) {
    return {
      pattern: match[1],
    };
  }

  return {
    pattern: input,
  };
};

export function generateSlug(text: string, options: SlugOptions = {}): string {
  const { separator = "-", keepCase = false, encoding = "ascii" } = options;

  let result = text.toString().trim();

  if (!keepCase) result = result.toLowerCase();

  if (encoding === "ascii") {
    // Normalization + Strip non-ASCII
    result = result
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "");
  } else if (encoding === "unicode") {
    // Keep international characters but remove punctuation
    result = result.replace(/[^\p{L}\p{N}\s-]/gu, "");
  } else if (encoding === "percent") {
    // URL-style encoding
    return encodeURIComponent(result.replace(/\s+/g, separator));
  }

  return result
    .replace(/\s+/g, separator)
    .replace(new RegExp(`${separator}${separator}+`, "g"), separator)
    .replace(new RegExp(`^${separator}+`), "")
    .replace(new RegExp(`${separator}+$`), "");
}
