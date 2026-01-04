"use client";

import ReactCodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { html } from "@codemirror/lang-html";
import { xml } from "@codemirror/lang-xml";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { Extension } from "@codemirror/state";
import { css } from "@codemirror/lang-css";

import { cn } from "@/lib/utils";
import { transparentThemeCodeViewer } from "@/configs/themes";
import { useTheme } from "next-themes";

type EditorMode = "json" | "html" | "xml" | "javascript" | "css" | "text";

interface CodeEditorProps
  extends Omit<ReactCodeMirrorProps, "theme" | "extensions"> {
  containerClassName?: string;
  fillLines?: boolean;
  mode?: EditorMode | "auto";
}

function detectLanguage(value?: string): EditorMode {
  if (!value) return "text";

  const v = value.trim();

  if (
    (v.startsWith("{") && v.endsWith("}")) ||
    (v.startsWith("[") && v.endsWith("]"))
  ) {
    try {
      JSON.parse(v);
      return "json";
    } catch {}
  }
  if (
    /import\s+React/.test(v) ||
    /from\s+["']react["']/.test(v) ||
    /export\s+default\s+function/.test(v) ||
    /<[A-Z][A-Za-z0-9]*[\s>]/.test(v)
  ) {
    return "javascript";
  }

  if (v.startsWith("<svg") || v.startsWith("<?xml")) {
    return "xml";
  }

  if (v.startsWith("<!DOCTYPE html") || /<\/?[a-z][\s\S]*>/i.test(v)) {
    return "html";
  }
  if (/{[^}]*}/.test(v) && /[.#]?[a-zA-Z0-9_-]+\s*\{/.test(v)) return "css";

  return "text";
}

const languageMap: Record<EditorMode, Extension[]> = {
  json: [json()],
  html: [html()],
  xml: [xml()],
  javascript: [
    javascript({
      jsx: true,
      typescript: true,
    }),
  ],
  css: [css()],
  text: [],
};

export function CodeEditor({
  value,
  onChange,
  containerClassName,
  fillLines = true,
  mode = "auto",
  ...props
}: CodeEditorProps) {
  const { resolvedTheme } = useTheme();
  const resolvedMode = mode === "auto" ? detectLanguage(value) : mode;

  const extensions: Extension[] = [
    ...languageMap[resolvedMode],
    transparentThemeCodeViewer,
  ];

  return (
    <div className={cn("w-full overflow-hidden", containerClassName)}>
      <ReactCodeMirror
        value={value}
        height="100%"
        className="h-full font-mono"
        extensions={extensions}
        theme={resolvedTheme === "dark" ? oneDark : "light"}
        onChange={onChange}
        editable={false}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: false,
          foldGutter: true,
        }}
        {...props}
      />
    </div>
  );
}
