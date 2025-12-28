"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
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

const menuGroups = [
  {
    title: "Text & String",
    items: [
      {
        title: "Regex Validator",
        href: "/text-string/regex",
        description: "Test patterns against text.",
      },
      {
        title: "Case Converter",
        href: "/text-string/case-converter",
        description: "Convert to UPPER, lower, etc.",
      },
      {
        title: "Encoder/Decoder",
        href: "/text-string/encoder",
        description: "Base64, URL, and HTML.",
      },
    ],
  },
  {
    title: "JSON & Data",
    items: [
      {
        title: "JSON Validator",
        href: "/json-data/json-validator",
        description: "Validate JSON structure.",
      },
      {
        title: "JSON to CSV",
        href: "/json-data/json-csv",
        description: "Convert data formats.",
      },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold text-xl px-4">
            DevKit
          </Link>

          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {menuGroups.map((group) => (
                  <NavigationMenuItem key={group.title}>
                    <NavigationMenuTrigger>{group.title}</NavigationMenuTrigger>
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

        <div className="md:hidden px-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-75 sm:w-100">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
                <div className="flex flex-col space-y-3">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium px-2"
                  >
                    Home
                  </Link>

                  {/* Mobile Accordion Dropdowns */}
                  <Accordion type="single" collapsible className="w-full">
                    {menuGroups.map((group) => (
                      <AccordionItem
                        value={group.title}
                        key={group.title}
                        className="border-none"
                      >
                        <AccordionTrigger className="p-2 hover:no-underline">
                          {group.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col space-y-1 ml-4 ">
                            {group.items.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-2 text-sm  transition-colors"
                              >
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
