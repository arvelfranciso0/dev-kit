"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Sun, Moon, Lock } from "lucide-react";
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
              <NavigationMenuList className=" flex-wrap  ">
                {menuGroups.map((group) => (
                  <NavigationMenuItem key={group.title}>
                    <NavigationMenuTrigger className="h-9  px-4 text-[11px] font-bold uppercase  hover:bg-zinc-50 dark:hover:bg-zinc-900 focus:bg-transparent data-[state=open]:bg-zinc-50 dark:data-[state=open]:bg-zinc-900 transition-colors border-none">
                      {group.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-100 gap-1 p-2 md:w-125 md:grid-cols-2 lg:w-150">
                        {group.items.map((item) => (
                          <ListItem
                            key={item.title}
                            title={item.title}
                            status={item.status}
                            href={
                              item.status === "soon"
                                ? undefined
                                : `${group.href}${item.href}`
                            }
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

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors relative"
          >
            <Sun className="h-4 w-4 scale-100 dark:scale-0 transition-all" />
            <Moon className="absolute h-4 w-4 scale-0 dark:scale-100 transition-all top-2 left-2" />
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

                <ScrollArea className="h-full py-6 px-3">
                  <div className="space-y-4">
                    {menuGroups.map((group) => (
                      <div key={group.title} className="space-y-2">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                          {group.title}
                        </h4>
                        <div className="flex flex-col gap-2 ml-2 border-l border-zinc-100 dark:border-zinc-800 pl-4">
                          {group.items.map((item) => (
                            <Link
                              key={item.title}
                              href={
                                item.status === "soon"
                                  ? "#"
                                  : `${group.href}${item.href}`
                              }
                              onClick={(e) => {
                                if (item.status === "soon") e.preventDefault();
                                else setIsOpen(false);
                              }}
                              className={cn(
                                "text-sm font-medium transition-colors flex items-center justify-between",
                                item.status === "soon"
                                  ? "text-zinc-300 cursor-not-allowed"
                                  : "hover:text-zinc-500"
                              )}
                            >
                              {item.title}
                              {item.status === "soon" && (
                                <span className="text-[8px] opacity-50 uppercase">
                                  Soon
                                </span>
                              )}
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
  React.ComponentPropsWithoutRef<"a"> & { status?: string }
>(({ className, title, children, status, href, ...props }, ref) => {
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
              : "hover:bg-zinc-50 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800",
            className
          )}
          {...props}
        >
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-bold uppercase tracking-tight text-zinc-900 dark:text-zinc-100 italic">
              {title}
            </div>
            {isSoon && (
              <Badge
                variant="outline"
                className="text-[7px] h-4 px-1.5 font-black uppercase tracking-tighter border-zinc-200 dark:border-zinc-700"
              >
                Soon
              </Badge>
            )}
          </div>
          <p className="line-clamp-1 text-[10px] font-mono leading-snug text-zinc-400">
            {isSoon ? "Module currently in development..." : children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
