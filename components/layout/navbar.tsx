"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 1. Import usePathname
import { Menu, Sun, Moon } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import Image from "next/image";
import { menuGroups } from "@/configs/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const pathname = usePathname(); // 2. Initialize pathname

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-8">
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

          <div className="hidden md:flex">
            <NavigationMenu viewport={isMobile}>
              <NavigationMenuList className="flex-wrap">
                {menuGroups.map((group) => {
                  // Check if any child item in this group is currently active
                  const isGroupActive = pathname.startsWith(group.href);

                  return (
                    <NavigationMenuItem key={group.title}>
                      <NavigationMenuTrigger
                        className={cn(
                          "h-9 px-4 text-xs font-bold uppercase transition-colors border-none bg-transparent",
                          "hover:bg-zinc-50 dark:hover:bg-zinc-900 focus:bg-transparent",
                          "data-[state=open]:bg-zinc-50 dark:data-[state=open]:bg-zinc-900",
                          // Active state for the Trigger
                          isGroupActive &&
                            "text-amber-500 dark:text-amber-400 bg-zinc-50/50 dark:bg-zinc-900/50"
                        )}
                      >
                        {group.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-100 gap-1 p-2 md:w-125 md:grid-cols-2 lg:w-150">
                          {group.items.map((item) => {
                            const fullHref = `${group.href}${item.href}`;
                            const isActive = pathname === fullHref;

                            return (
                              <ListItem
                                key={item.title}
                                title={item.title}
                                status={item.status}
                                isActive={isActive} // Pass active state
                                href={
                                  item.status === "soon" ? undefined : fullHref
                                }
                              >
                                {item.description}
                              </ListItem>
                            );
                          })}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* ... (Theme Toggle Button remains same) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg text-zinc-900 hover:text-amber-500 dark:text-zinc-50 dark:hover:text-zinc-100 transition-colors relative"
          >
            <Sun className="h-4 w-4 scale-100 dark:scale-0 transition-all" />
            <Moon className="absolute h-4 w-4 scale-0 dark:scale-100 transition-all top-2 left-2" />
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

                <ScrollArea className="h-full py-6 px-3">
                  <div className="space-y-4">
                    {menuGroups.map((group) => (
                      <div key={group.title} className="space-y-2">
                        <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">
                          {group.title}
                        </h4>
                        <div className="flex flex-col gap-2 ml-2 border-l border-zinc-100 dark:border-zinc-800 pl-4">
                          {group.items.map((item) => {
                            const fullHref = `${group.href}${item.href}`;
                            const isActive = pathname === fullHref;

                            return (
                              <Link
                                key={item.title}
                                href={item.status === "soon" ? "#" : fullHref}
                                onClick={(e) => {
                                  if (item.status === "soon")
                                    e.preventDefault();
                                  else setIsOpen(false);
                                }}
                                className={cn(
                                  "text-sm font-medium transition-colors flex items-center justify-between",
                                  item.status === "soon"
                                    ? "text-zinc-300 cursor-not-allowed"
                                    : isActive
                                    ? "text-amber-500 font-bold" // Mobile active state
                                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                                )}
                              >
                                {item.title}
                                {item.status === "soon" && (
                                  <span className="text-xs opacity-50 uppercase">
                                    Soon
                                  </span>
                                )}
                              </Link>
                            );
                          })}
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

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  status?: string;
  isActive?: boolean;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, status, href, isActive, ...props }, ref) => {
    const isSoon = status === "soon";

    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            href={href}
            className={cn(
              "group block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all",
              isSoon
                ? "opacity-50 cursor-not-allowed grayscale"
                : isActive
                ? "bg-amber-500/5 border-amber-500/20 dark:bg-amber-500/10 dark:border-amber-500/30" // Desktop Active State
                : "hover:bg-zinc-50 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800",
              className
            )}
            {...props}
          >
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "text-xs font-bold uppercase tracking-tight italic",
                  isActive
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-zinc-900 dark:text-zinc-100"
                )}
              >
                {title}
              </div>
              {isSoon && (
                <Badge
                  variant="outline"
                  className="text-[7px] h-4 px-1.5 font-black border-zinc-200 dark:border-zinc-700"
                >
                  Soon
                </Badge>
              )}
            </div>
            <p
              className={cn(
                "line-clamp-1 text-xs font-mono leading-snug",
                isActive
                  ? "text-amber-600/70 dark:text-amber-400/60"
                  : "text-zinc-400"
              )}
            >
              {isSoon ? "Module currently in development..." : children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
