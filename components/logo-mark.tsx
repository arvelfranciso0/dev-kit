import { cn } from "@/lib/utils";

// DevKit "Bracket Slash" mark: [/] on a rounded tile.
// Colors come from theme tokens so it flips with light/dark mode.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-label="DevKit logo"
      className={cn("h-8 w-8", className)}
    >
      <rect width="32" height="32" rx="8" className="fill-foreground" />
      <path
        d="M11.5 8.5H8.5v15h3M20.5 8.5h3v15h-3"
        fill="none"
        strokeWidth={2.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-background"
      />
      <path
        d="M18.6 9.5L13.4 22.5"
        fill="none"
        strokeWidth={3}
        strokeLinecap="round"
        className="stroke-primary"
      />
    </svg>
  );
}
