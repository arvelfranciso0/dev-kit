import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex w-full text-sm leading-relaxed outline-none transition-[color,box-shadow]",
        "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        "bg-transparent border-none",
        "resize-none font-mono scrollbar-hide",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

        className
      )}
      {...props}
    />
  );
}

export { Textarea };
