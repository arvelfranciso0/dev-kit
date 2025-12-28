import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function JsonDataHome() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">JSON & Data Tools</h1>
        <p className="text-muted-foreground max-w-2xl">
          Tools for formatting, validating, transforming, and analyzing JSON and
          structured data.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* JSON Formatter */}
        <Card className="hover:border-primary transition">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">JSON Formatter</h3>
            <p className="text-sm text-muted-foreground">
              Beautify or minify JSON with proper indentation and formatting.
            </p>
            {/* <Button asChild size="sm">
              <Link href="/tools/json-formatter">Open Tool</Link>
            </Button> */}
            <Button size="sm" variant="outline" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        {/* JSON Validator */}
        <Card className="hover:border-primary transition">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">JSON Validator</h3>
            <p className="text-sm text-muted-foreground">
              Validate JSON syntax and quickly find parsing errors.
            </p>
            {/* <Button asChild size="sm">
              <Link href="/tools/json-validator">Open Tool</Link>
            </Button> */}
            <Button size="sm" variant="outline" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        {/* JSON to CSV */}
        <Card className="hover:border-primary transition">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">JSON to CSV</h3>
            <p className="text-sm text-muted-foreground">
              Convert JSON arrays into downloadable CSV files.
            </p>
            <Button size="sm" variant="outline" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        {/* CSV to JSON */}
        <Card className="hover:border-primary transition">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">CSV to JSON</h3>
            <p className="text-sm text-muted-foreground">
              Transform CSV data into structured JSON objects.
            </p>
            <Button size="sm" variant="outline" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        {/* Diff Viewer */}
        <Card className="hover:border-primary transition">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">JSON Diff</h3>
            <p className="text-sm text-muted-foreground">
              Compare two JSON objects and highlight differences.
            </p>
            <Button size="sm" variant="outline" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        {/* Data Viewer */}
        <Card className="hover:border-primary transition">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">Data Viewer</h3>
            <p className="text-sm text-muted-foreground">
              View and explore structured data in tables or tree views.
            </p>
            <Button size="sm" variant="outline" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
