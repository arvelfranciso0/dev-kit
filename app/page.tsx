import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, ImageIcon, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-6 py-20">
      {/* Hero */}
      <section className="max-w-4xl text-center space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/dev-logo.png"
            alt="DevKit logo"
            className="object-cover rounded-2xl"
            width={100}
            height={100}
            priority
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          All-in-One Developer Toolkit
        </h1>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A collection of simple, fast, and developer-friendly utilities for
          everyday tasks.
        </p>

        {/* <div className="flex justify-center gap-4">
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">
            View Documentation
          </Button>
        </div> */}
      </section>

      {/* Feature Cards */}
      <section className="mt-20 grid gap-6 md:grid-cols-3 max-w-5xl w-full">
        <Card>
          <CardContent className="p-6 space-y-3">
            <Sparkles className="h-6 w-6 text-primary" />
            <h3 className="font-semibold text-lg">Text & Regex Tools</h3>
            <p className="text-sm text-muted-foreground">
              Validate regex, transform strings, encode & decode text directly
              in the browser.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-3">
            <ImageIcon className="h-6 w-6 text-primary" />
            <h3 className="font-semibold text-lg">Image Utilities</h3>
            <p className="text-sm text-muted-foreground">
              Convert, compress, resize, and inspect images using native browser
              APIs.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-3">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h3 className="font-semibold text-lg">Crypto & Dev Tools</h3>
            <p className="text-sm text-muted-foreground">
              Hash generators, JWT decoding, UUIDs, timestamps, and frontend
              utilities.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
