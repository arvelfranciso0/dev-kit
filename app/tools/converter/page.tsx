"use client"

import Header from "@/components/shared/header";
import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";
import { TimerIcon } from "lucide-react";

const converterTool: Tool[] = [
    {
        title:"Timestamp ",
        desc:"Unix time to and from readable dates, with time zones",
        href:"/converter/timestamp",
        icon:<TimerIcon size={18}/>,
        status:"ready"
    }
]

export default function ConverterHome() {
  return (
    <div className="p-8 space-y-12">
      <Header
        category="Design Utilities"
        title="Design Utilities"
        description="Precise tools for modern UI engineering."
      />
      <ToolGrid tools={converterTool} columns={3} />
    </div>
  );
}