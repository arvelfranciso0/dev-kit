import { JsonLd } from "@/components/shared/json-ld";
import { categorySchemas, getRouteMetadata } from "@/lib/seo";
import Header from "@/components/shared/header";
import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";
import { TimerIcon } from "lucide-react";

const converterTool: Tool[] = [
    {
        title:"Timestamp Converter",
        desc:"Unix time to and from readable dates, with time zones",
        href:"/tools/converter/timestamp",
        icon:<TimerIcon size={18}/>,
        status:"ready"
    }
]

const path = "/tools/converter";

export const metadata = getRouteMetadata(path);

export default function ConverterHome() {
  return (
    <div className="p-8 space-y-12">
      <JsonLd data={categorySchemas(path)} />
      <Header
        category="Converters"
        title="Converters"
        description="Convert values between formats, starting with Unix timestamps and human-readable dates."
      />
      <ToolGrid tools={converterTool} columns={3} />
    </div>
  );
}