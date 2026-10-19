import { JsonLd } from "@/components/shared/json-ld";
import { categorySchemas, getRouteMetadata } from "@/lib/seo";
import { Shield, Lock } from "lucide-react";
import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";
import Header from "@/components/shared/header";

const tools: Tool[] = [
  {
    title: "JWT Decoder",
    desc: "Locally decode and inspect JSON Web Token headers, payload claims, and expiry without sending data to a server.",
    href: "/tools/security/jwt",
    icon: <Shield size={18} />,
    status: "ready",
  },
  {
    title: "Bcrypt Hasher",
    desc: "Generate and verify cryptographically secure password hashes using adaptive salt rounds for industry-standard protection.",
    href: "/tools/security/bcrypt",
    icon: <Lock size={18} />,
    status: "ready",
  },
];

const path = "/tools/security";

export const metadata = getRouteMetadata(path);

export default function SecurityHome() {
  return (
    <div className="p-8 space-y-12">
      <JsonLd data={categorySchemas(path)} />
      <Header
        category="Security"
        title="Security Tools"
        description="Decode JWTs and generate or verify bcrypt hashes without sending anything to a server."
      />
      <ToolGrid tools={tools} columns={3} />
    </div>
  );
}
