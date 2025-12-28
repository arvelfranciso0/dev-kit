"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Sun, Moon, Terminal, Box } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import Image from "next/image";

const menuGroups = [
  {
    title: "Text & String",
    icon: <Terminal size={14} />,
    items: [
      {
        title: "Regex Validator",
        href: "/text-string/regex",
        description: "Pattern matching engine.",
      },
      {
        title: "Case Converter",
        href: "/text-string/case-converter",
        description: "String casing utility.",
      },
      {
        title: "Encoder/Decoder",
        href: "/text-string/encoder",
        description: "Base64 & URL processing.",
      },
    ],
  },
  {
    title: "JSON & Data",
    icon: <Box size={14} />,
    items: [
      {
        title: "JSON Formatter",
        href: "/json-data/formatter",
        description: "Beautify structured data.",
      },
      {
        title: "JSON to CSV",
        href: "/json-data/json-csv",
        description: "Flatten data structures.",
      },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/dev-logo.png"
              alt="DevKit Logo"
              className="object-cover rounded-4xl"
              width={30}
              height={30}
            />
            <span className="font-bold tracking-tighter text-lg uppercase italic">
              DevKit
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {menuGroups.map((group) => (
                  <NavigationMenuItem key={group.title}>
                    {/* TRIGGER: Removed standard shadcn hover styles to prevent gradients */}
                    <NavigationMenuTrigger className="h-9 px-4 text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-900 focus:bg-transparent data-[state=open]:bg-zinc-50 dark:data-[state=open]:bg-zinc-900 transition-colors border-none">
                      {group.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-100 gap-1 p-2 md:w-125 md:grid-cols-2 lg:w-150">
                        {group.items.map((item) => (
                          <ListItem
                            key={item.title}
                            title={item.title}
                            href={item.href}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* ... (Theme Toggle & Mobile Menu remains the same) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <Sun className="h-4 w-4 scale-100 dark:scale-0 transition-all" />
            <Moon className="absolute h-4 w-4 scale-0 dark:scale-100 transition-all top-5" />
            <span className="sr-only">Toggle theme</span>
          </button>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="border-l border-zinc-100 dark:border-zinc-800"
              >
                <VisuallyHidden.Root>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </VisuallyHidden.Root>

                <ScrollArea className="h-full py-6">
                  <div className="space-y-4">
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className="text-xl font-bold tracking-tighter"
                    >
                      Home
                    </Link>
                    {menuGroups.map((group) => (
                      <div key={group.title} className="space-y-2">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                          {group.title}
                        </h4>
                        <div className="flex flex-col gap-2 ml-2 border-l border-zinc-100 dark:border-zinc-800 pl-4">
                          {group.items.map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="text-sm font-medium hover:text-zinc-500"
                            >
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all",
            "hover:bg-zinc-50 dark:hover:bg-zinc-900", // Solid hover background (No Gradient)
            "border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800", // Subtle border on hover
            className
          )}
          {...props}
        >
          <div className="text-[11px] font-bold uppercase tracking-tight text-zinc-900 dark:text-zinc-100 italic">
            {title}
          </div>
          <p className="line-clamp-1 text-[10px] font-mono leading-snug text-zinc-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
