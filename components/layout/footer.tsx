import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Top */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Logo + name */}
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8">
              <Image
                src="/dev-logo.png"
                alt="DevKit Logo"
                fill
                className="object-cover rounded"
              />
            </div>
            <span className="font-semibold text-lg tracking-tight">DevKit</span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition">
              Home
            </Link>
            <Link
              href="/text-string"
              className="hover:text-foreground transition"
            >
              Text & String
            </Link>
            <Link
              href="/json-data"
              className="hover:text-foreground transition"
            >
              JSON & Data
            </Link>
          </nav>
        </div>

        <Separator className="my-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} DevKit. All rights reserved.</p>

          <p>
            Built with{" "}
            <span className="font-medium text-foreground">Next.js</span> &{" "}
            <span className="font-medium text-foreground">shadcn/ui</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
