"use client";

import React from "react";
import { AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorErrorProps {
  message?: string;
  onDismiss?: () => void;
  className?: string;
}

export function EditorError({
  message,
  onDismiss,
  className,
}: EditorErrorProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "absolute bottom-2 right-4 p-4 rounded-xl",
        "bg-rose-500 text-white shadow-2xl z-30",
        "animate-in fade-in slide-in-from-bottom-2 duration-300 w-100",
        className
      )}
    >
      <div className="flex items-start gap-3">
        {/* Error Icon */}
        <div className="bg-white/20 p-1 rounded-md shrink-0">
          <AlertCircle size={16} className="text-white" />
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">
            Syntax Error
          </p>
          <p className="text-xs font-mono leading-tight wrap-break-words">
            {message}
          </p>
        </div>

        {/* Optional Dismiss Button */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="shrink-0 opacity-60 hover:opacity-100 transition-opacity p-1"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
