export interface PreviewProps {
  previewRef?: React.RefObject<HTMLDivElement | null>;
  toggleFullscreen?: () => void;
  isFullscreen?: boolean;
  srcDoc: string;
  isMobile?: boolean;
  className?: string;
}

export interface PlaygroundProps extends PreviewProps {
  html: string;
  css: string;
  js: string;
  setHtml: (v: string) => void;
  setCss: (v: string) => void;
  setJs: (v: string) => void;
  handleReset: () => void;
}
