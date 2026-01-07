import { PreviewContainer } from "@/components/shared/preview-container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PreviewProps } from "@/types/playground";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { Minimize2, Maximize2 } from "lucide-react";

export default function PreviewArea({
  srcDoc,
  isFullscreen,
  toggleFullscreen,
  isMobile,
  previewRef,
  className,
}: PreviewProps) {
  return (
    <div
      className={(cn("w-full  overflow-hidden "), className)}
      ref={previewRef}
    >
      {!isMobile && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="absolute top-3 right-3 h-8 w-8 rounded-lg backdrop-blur-md text-zinc-900 hover:text-amber-500 transition-all duration-200 z-50"
              >
                {isFullscreen ? (
                  <Minimize2 size={16} />
                ) : (
                  <Maximize2 size={16} />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="bg-zinc-900 border-zinc-800 text-xs text-white"
            >
              {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts allow-modals"
        className="w-full h-full border-none"
      />
    </div>
  );
}
