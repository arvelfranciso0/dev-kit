export type BlockType =
  | "H1"
  | "H2"
  | "H3"
  | "H4"
  | "Text"
  | "Code"
  | "SQL"
  | "Bash"
  | "Shields"
  | "Divider";

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  language?: string;
}
