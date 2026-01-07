"use client";

import { useState } from "react";
import { ActionPanel } from "@/components/shared/action-panel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface CodeOption {
  id: string;
  label: string;
  value: string;
}

interface CodePanelProps {
  title?: string;
  options: CodeOption[];
  className?: string;
}

export function CodePanel({
  title = "Code Output",
  options,
  className,
}: CodePanelProps) {
  const [activeTab, setActiveTab] = useState(options[0]?.id);
  const activeValue = options.find((opt) => opt.id === activeTab)?.value || "";

  return (
    <ActionPanel
      label={title}
      copyValue={activeValue}
      //   className={cn("overflow-hidden", className)}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6 pt-4">
          <TabsList className="bg-zinc-100 dark:bg-zinc-900 h-8 p-1">
            {options.map((opt) => (
              <TabsTrigger
                key={opt.id}
                value={opt.id}
                className="text-xs font-bold uppercase px-3"
              >
                {opt.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="p-6 pt-4">
          {options.map((opt) => (
            <TabsContent key={opt.id} value={opt.id} className="mt-0">
              <div className="group relative">
                <code className="block p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl text-xs font-mono text-zinc-500 dark:text-zinc-400 break-all leading-relaxed border border-zinc-100 dark:border-zinc-800 max-h-40 overflow-y-auto scrollbar-hide">
                  {opt.value}
                </code>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </ActionPanel>
  );
}
