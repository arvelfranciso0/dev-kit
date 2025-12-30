export type SlugEncoding = "ascii" | "unicode" | "percent";

export interface SlugOptions {
  separator?: "-" | "_";
  keepCase?: boolean;
  encoding?: SlugEncoding;
}
