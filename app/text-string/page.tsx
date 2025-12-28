import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TextStringHome() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Text & String Tools
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Utilities for transforming, encoding, validating, and working with
          text and strings—built for developers.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Case Converter */}
        <Card className="hover:border-primary transition">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">Case Converter</h3>
            <p className="text-sm text-muted-foreground">
              Convert text to UPPERCASE, lowercase, camelCase, snake_case, and
              more—live as you type.
            </p>
            <Button asChild size="sm">
              <Link href="/text-string/case-converter">Open Tool</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Encoder / Decoder */}
        <Card className="hover:border-primary transition">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">Encoder / Decoder</h3>
            <p className="text-sm text-muted-foreground">
              Encode and decode Base64 and URL strings instantly with copy
              support.
            </p>
            <Button asChild size="sm">
              <Link href="/text-string/encoder">Open Tool</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Regex Tester */}
        <Card className="hover:border-primary transition">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">Regex Tester</h3>
            <p className="text-sm text-muted-foreground">
              Validate regex patterns and test matches in real time.
            </p>
            <Button asChild size="sm">
              <Link href="/text-string/regex">Open Tool</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Slug Generator */}
        <Card className="hover:border-primary transition">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">Slug Generator</h3>
            <p className="text-sm text-muted-foreground">
              Generate clean, SEO-friendly URL slugs from any text.
            </p>
            <Button size="sm" variant="outline" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        {/* String Length */}
        <Card className="hover:border-primary transition">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">String Analyzer</h3>
            <p className="text-sm text-muted-foreground">
              Count characters, words, and lines in your text.
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
