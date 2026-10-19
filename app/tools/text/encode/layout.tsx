import { JsonLd } from "@/components/shared/json-ld";
import { getRouteMetadata, toolSchemas } from "@/lib/seo";

const path = "/tools/text/encode";

export const metadata = getRouteMetadata(path);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={toolSchemas(path)} />
      {children}
    </>
  );
}
