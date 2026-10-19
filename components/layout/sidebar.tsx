"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Sun,
  Moon,
  ChevronRight,
  ChevronsDownUp,
  ChevronsUpDown,
  Github,
  History,
  Search,
} from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import { LogoMark } from "@/components/logo-mark";
import { menuGroups } from "@/configs/navigation";
import { useRecentTools } from "@/hooks/use-recent-tools";
import { version } from "@/package.json";

const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";
const GITHUB_URL = "https://github.com/arvelfranciso0/dev-kit";
const MAX_VISIBLE_RECENT_TOOLS = 5;

// Lookup of available (non-"soon") tool hrefs to their titles
const toolTitlesByHref = new Map(
  menuGroups.flatMap((group) =>
    group.items
      .filter((item) => item.status !== "soon")
      .map((item) => [`${group.href}${item.href}`, item.title] as const)
  )
);

export default function Sidebar({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const searchRef = React.useRef<HTMLInputElement>(null);

  // Ctrl/Cmd + K focuses the tool search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "k" || !(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();

      if (window.matchMedia(DESKTOP_MEDIA_QUERY).matches) {
        setIsCollapsed(false);
        searchRef.current?.focus();
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Full-width header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            {/* Mobile: burger opens a left-side sheet */}
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-72 p-0 border-r border-zinc-100 dark:border-zinc-800"
                >
                  <VisuallyHidden.Root>
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </VisuallyHidden.Root>
                  <div className="flex h-14 items-center border-b border-zinc-100 dark:border-zinc-800 px-6">
                    <Logo onClick={() => setIsOpen(false)} />
                  </div>
                  <div className="h-[calc(100%-3.5rem)]">
                    <SidebarContent onNavigate={() => setIsOpen(false)} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop: burger hides/shows the sidebar */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:inline-flex h-8 w-8"
              onClick={() => setIsCollapsed((prev) => !prev)}
              aria-label={isCollapsed ? "Show sidebar" : "Hide sidebar"}
              aria-expanded={!isCollapsed}
            >
              <Menu className="h-4 w-4" />
            </Button>

            <Logo />
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop sidebar: below the header, on the left */}
        <aside
          className={cn(
            "hidden lg:block sticky top-14 h-[calc(100vh-3.5rem)] shrink-0 overflow-hidden bg-white dark:bg-zinc-950 transition-[width] duration-200",
            isCollapsed
              ? "w-0"
              : "w-64 border-r border-zinc-100 dark:border-zinc-800"
          )}
        >
          <div className="h-full w-64">
            <SidebarContent searchRef={searchRef} />
          </div>
        </aside>

        <div className="flex flex-1 min-w-0 flex-col">{children}</div>
      </div>

      {/* Full-width footer */}
      {footer}
    </div>
  );
}

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-2 group">
      <LogoMark className="h-[30px] w-[30px]" />
      <span className="font-bold tracking-tighter text-lg uppercase italic">
        DevKit
      </span>
    </Link>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg text-zinc-900 hover:text-amber-500 dark:text-zinc-50 dark:hover:text-zinc-100 transition-colors relative"
    >
      <Sun className="h-4 w-4 scale-100 dark:scale-0 transition-all" />
      <Moon className="absolute h-4 w-4 scale-0 dark:scale-100 transition-all top-2 left-2" />
    </button>
  );
}

function SidebarContent({
  onNavigate,
  searchRef,
}: {
  onNavigate?: () => void;
  searchRef?: React.Ref<HTMLInputElement>;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  // Only the group containing the current page starts expanded
  const [openGroups, setOpenGroups] = React.useState<Set<string>>(
    () =>
      new Set(
        menuGroups
          .filter((group) => pathname.startsWith(group.href))
          .map((group) => group.title)
      )
  );

  // Auto-expand the active group when navigating to another section
  React.useEffect(() => {
    const activeGroup = menuGroups.find((group) =>
      pathname.startsWith(group.href)
    );
    if (!activeGroup) return;
    setOpenGroups((prev) =>
      prev.has(activeGroup.title)
        ? prev
        : new Set(prev).add(activeGroup.title)
    );
  }, [pathname]);

  // Recent tools, excluding the page currently open
  const recentHrefs = useRecentTools(
    toolTitlesByHref.has(pathname) ? pathname : undefined
  );
  const recentTools = recentHrefs
    .filter((href) => href !== pathname && toolTitlesByHref.has(href))
    .slice(0, MAX_VISIBLE_RECENT_TOOLS)
    .map((href) => ({ href, title: toolTitlesByHref.get(href)! }));

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;
  const isAllOpen = openGroups.size === menuGroups.length;

  // Match on group title, tool title, and description
  const filteredGroups = React.useMemo(() => {
    if (!normalizedQuery) return menuGroups;

    return menuGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          `${group.title} ${item.title} ${item.description}`
            .toLowerCase()
            .includes(normalizedQuery)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [normalizedQuery]);

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  const toggleAllGroups = () => {
    setOpenGroups(
      isAllOpen ? new Set() : new Set(menuGroups.map((group) => group.title))
    );
  };

  const handleNavigate = () => {
    setQuery("");
    onNavigate?.();
  };

  // Enter opens the first available match, Escape clears the search
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      for (const group of filteredGroups) {
        const firstItem = group.items.find((item) => item.status !== "soon");
        if (firstItem) {
          router.push(`${group.href}${firstItem.href}`);
          e.currentTarget.blur();
          handleNavigate();
          return;
        }
      }
    }

    if (e.key === "Escape") {
      if (query) setQuery("");
      else e.currentTarget.blur();
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Tool search */}
      <div className="shrink-0 px-4 pt-4 pb-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
          <Input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search tools..."
            aria-label="Search tools"
            className="h-8 pl-8 pr-14 text-xs md:text-xs font-mono border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 placeholder:text-zinc-400"
          />
          {!isSearching && (
            <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-zinc-200 dark:border-zinc-700 px-1.5 font-mono text-[10px] text-zinc-400 lg:inline-block">
              Ctrl K
            </kbd>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 min-h-0 px-4 py-2">
        <nav className="space-y-2">
          {filteredGroups.map((group) => {
            const isGroupActive = pathname.startsWith(group.href);
            // Every matching group is expanded while searching
            const isGroupOpen = isSearching || openGroups.has(group.title);

            return (
              <div key={group.title} className="space-y-1">
                <button
                  type="button"
                  onClick={() => toggleGroup(group.title)}
                  aria-expanded={isGroupOpen}
                  disabled={isSearching}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-black uppercase tracking-widest transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:cursor-default disabled:hover:bg-transparent",
                    isGroupActive
                      ? "text-amber-500 dark:text-amber-400"
                      : "text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  )}
                >
                  {group.title}
                  <ChevronRight
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      isGroupOpen && "rotate-90"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "flex-col gap-1 ml-4 border-l border-zinc-100 dark:border-zinc-800 pl-3",
                    isGroupOpen ? "flex" : "hidden"
                  )}
                >
                  {group.items.map((item) => {
                    const fullHref = `${group.href}${item.href}`;
                    const isActive = pathname === fullHref;
                    const isSoon = item.status === "soon";

                    return (
                      <Link
                        key={item.title}
                        href={isSoon ? "#" : fullHref}
                        aria-disabled={isSoon}
                        onClick={(e) => {
                          if (isSoon) e.preventDefault();
                          else handleNavigate();
                        }}
                        className={cn(
                          "text-sm font-medium rounded-md px-2 py-1.5 transition-colors flex items-center justify-between",
                          isSoon
                            ? "text-zinc-300 dark:text-zinc-700 cursor-not-allowed"
                            : isActive
                            ? "text-amber-500 font-bold bg-amber-500/5 dark:bg-amber-500/10"
                            : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 dark:hover:text-zinc-100 dark:hover:bg-zinc-900"
                        )}
                      >
                        {item.title}
                        {/* Descriptions are no longer shown in the sidebar */}
                        {/* <span className="text-xs text-zinc-400">{item.description}</span> */}
                        {isSoon && (
                          <Badge
                            variant="outline"
                            className="text-[7px] h-4 px-1.5 font-black border-zinc-200 dark:border-zinc-700"
                          >
                            Soon
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {isSearching && filteredGroups.length === 0 && (
            <p className="px-2 py-6 text-center text-xs font-mono text-zinc-400">
              No tools match &quot;{query.trim()}&quot;
            </p>
          )}
        </nav>
      </ScrollArea>

      <SidebarFooter
        recentTools={recentTools}
        isAllOpen={isAllOpen}
        isSearching={isSearching}
        onToggleAll={toggleAllGroups}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

function SidebarFooter({
  recentTools,
  isAllOpen,
  isSearching,
  onToggleAll,
  onNavigate,
}: {
  recentTools: { href: string; title: string }[];
  isAllOpen: boolean;
  isSearching: boolean;
  onToggleAll: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="shrink-0 border-t border-zinc-100 dark:border-zinc-800">
      {/* Recently used tools */}
      {!isSearching && recentTools.length > 0 && (
        <div className="space-y-1 px-4 pt-4">
          <h4 className="px-2 text-xs font-black uppercase tracking-widest text-zinc-400">
            Recent
          </h4>
          <div className="flex flex-col gap-0.5">
            {recentTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={onNavigate}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
              >
                <History className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                <span className="truncate">{tool.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            onClick={onToggleAll}
            disabled={isSearching}
            aria-label={isAllOpen ? "Collapse all groups" : "Expand all groups"}
            title={isAllOpen ? "Collapse all" : "Expand all"}
          >
            {isAllOpen ? (
              <ChevronsDownUp className="h-4 w-4" />
            ) : (
              <ChevronsUpDown className="h-4 w-4" />
            )}
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              title="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
        </div>
        <span className="font-mono text-[10px] text-zinc-400">v{version}</span>
      </div>
    </div>
  );
}
