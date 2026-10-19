import { JsonLd } from "@/components/shared/json-ld";
import { categorySchemas, getRouteMetadata } from "@/lib/seo";
import { CaseUpper, Binary, Search, Link as LinkIcon } from "lucide-react";

import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";
import Header from "@/components/shared/header";

const tools: Tool[] = [
  {
    title: "Case Converter",
    desc: "Seamlessly transform strings between camelCase, snake_case, UPPERCASE, and lowercase in one pass.",
    href: "/tools/text/case",
    icon: <CaseUpper size={18} />,
    status: "ready",
  },
  {
    title: "Encoder / Decoder",
    desc: "Perform secure, client-side Base64 and URL encoding/decoding for handling binary data and safe URI parameters.",
    href: "/tools/text/encode",
    icon: <Binary size={18} />,
    status: "ready",
  },
  {
    title: "Regex Tester",
    desc: "Debug and test regular expressions in real-time with live match highlighting, a match count, and flag toggles.",
    href: "/tools/text/regex",
    icon: <Search size={18} />,
    status: "ready",
  },
  {
    title: "Slug Generator",
    desc: "Convert titles and strings into clean, SEO-friendly URL slugs with customizable separators and character stripping.",
    href: "/tools/text/slug",
    icon: <LinkIcon size={18} />,
    status: "ready",
  },
];

const path = "/tools/text";

export const metadata = getRouteMetadata(path);

export default function TextStringHome() {
  return (
    <div className="p-8 space-y-12 text-zinc-900 dark:text-zinc-100">
      <JsonLd data={categorySchemas(path)} />
      <Header
        category="Text Tools"
        title="Text & String Tools"
        description="Test regular expressions, convert string case, generate URL slugs, and encode or decode Base64 and URL strings. Everything runs in your browser."
      />

      <ToolGrid tools={tools} columns={3} />
    </div>
  );
}
