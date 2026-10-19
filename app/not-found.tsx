import type { Metadata } from "next";
import Link from "next/link";

// Next.js serves this with a 404 status and adds noindex automatically.
export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 space-y-4">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        404
      </p>
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-zinc-500 max-w-md">
        Sorry, the page you are looking for does not exist. Pick a tool from
        the sidebar or head back to the homepage.
      </p>
      <Link
        href="/"
        className="text-sm font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500 hover:underline underline-offset-4"
      >
        Go back home
      </Link>
    </div>
  );
}
