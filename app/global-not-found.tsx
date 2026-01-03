import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Sorry, the page you are looking for does not exist.
          </p>

          <a
            href="/"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Go back home
          </a>
        </div>
      </body>
    </html>
  );
}
