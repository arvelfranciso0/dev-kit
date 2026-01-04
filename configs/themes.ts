import { EditorView } from "@codemirror/view";

export const transparentThemeCodeViewer = EditorView.theme({
  "&": { backgroundColor: "transparent !important", height: "100%" },
  ".cm-scroller": { overflow: "auto !important" }, // Force internal scroll
  ".cm-gutters": { backgroundColor: "transparent !important", border: "none" },
});
