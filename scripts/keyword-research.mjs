// Keyword research from public autocomplete data (Google + DuckDuckGo).
//
//   npm run seo:keywords                 fetch fresh suggestions (a few minutes)
//   npm run seo:keywords -- --offline    re-score the last run after editing titles
//
// For every route in configs/seo-routes.ts it expands a few seed phrases with common
// modifiers, collects the suggestions, and scores each keyword by how often and how high
// it was suggested. Autocomplete order reflects popularity, but this is NOT search volume:
// use it to find the phrases people type, then confirm volume in Search Console or
// Google Keyword Planner.
//
// Output: seo/keywords.json (all data) and seo/keyword-report.md (readable summary).

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { categoryRoutes, toolRoutes } from "../configs/seo-routes.ts";

const OUT_DIR = new URL("../seo/", import.meta.url);
const OFFLINE = process.argv.includes("--offline");
const CONCURRENCY = 4;
const DELAY_MS = 120;

// Extra seed phrases people use for the same tool. The route's `name` is always included.
const EXTRA_SEEDS = {
  "/": ["developer tools online", "online dev tools", "developer toolbox"],
  "/tools/text": ["text tools online", "string tools"],
  "/tools/data": ["json tools", "json online tools"],
  "/tools/generate": ["developer generators"],
  "/tools/optimize": ["web optimization tools"],
  "/tools/design": ["css tools", "css generator tools"],
  "/tools/dev": ["developer utilities"],
  "/tools/security": ["security tools online"],
  "/tools/playgrounds": ["code playground", "online code editor"],
  "/tools/converter": ["online converter for developers"],
  "/tools/text/regex": ["regex tester", "regex checker", "regex online"],
  "/tools/text/case": ["case converter", "camelcase converter", "snake case converter"],
  "/tools/text/slug": ["slug generator", "slugify", "url slug generator"],
  "/tools/text/encode": ["base64 decode", "base64 encode", "url decode", "url encode"],
  "/tools/data/formatter": ["json formatter", "json beautifier", "json validator"],
  "/tools/data/diff": ["json diff", "json compare"],
  "/tools/data/viewer": ["json viewer", "json tree viewer"],
  "/tools/data/json-to-csv": ["json to csv", "json to excel"],
  "/tools/data/csv-to-json": ["csv to json"],
  "/tools/generate/password": ["password generator", "random password generator", "strong password generator"],
  "/tools/generate/readme": ["readme generator", "readme.md generator", "github readme generator"],
  "/tools/generate/shadow": ["box shadow generator", "css box shadow", "css shadow generator"],
  "/tools/generate/colors": ["color palette generator", "tailwind color generator", "color shades generator"],
  "/tools/optimize/svg": ["svg optimizer", "svg minify", "svgo online", "compress svg"],
  "/tools/optimize/html": ["html sanitizer", "sanitize html", "remove script tags from html"],
  "/tools/design/units": ["px to rem", "rem to px", "px to rem converter"],
  "/tools/design/contrast": ["contrast checker", "color contrast checker", "wcag contrast checker"],
  "/tools/design/typography": ["fluid typography calculator", "clamp calculator", "css clamp generator"],
  "/tools/design/aspect-ratio": ["aspect ratio calculator", "css aspect ratio"],
  "/tools/dev/markdown": ["markdown preview", "markdown editor online", "markdown viewer"],
  "/tools/dev/diff": ["diff checker", "text compare", "code diff online"],
  "/tools/dev/git": ["git cheat sheet", "git commands list"],
  "/tools/security/jwt": ["jwt decoder", "jwt decode", "jwt debugger"],
  "/tools/security/bcrypt": ["bcrypt generator", "bcrypt hash", "bcrypt online"],
  "/tools/playgrounds/web": ["html css js playground", "online html editor", "codepen alternative"],
  "/tools/converter/timestamp": ["unix timestamp converter", "epoch converter", "epoch to date", "timestamp to date"],
};

const MODIFIERS = [
  (s) => s,
  (s) => `${s} online`,
  (s) => `${s} free`,
  (s) => `${s} for`,
  (s) => `${s} with`,
  (s) => `${s} vs`,
  (s) => `best ${s}`,
  (s) => `free ${s}`,
  (s) => `online ${s}`,
];

const PLATFORM_WORDS = [
  "vscode", "vs code", "visual studio", "chrome", "extension", "firefox", "notepad", "intellij",
  "npm", "python", "java", "javascript", "js", "c#", "php", "golang", "go", "rust", "excel",
  "linux", "mac", "windows", "android", "iphone", "ios", "app", "download", "library", "package",
  "reddit", "github", "sql", "bash", "powershell", "react", "node",
];
const TOOL_WORDS = [
  "online", "free", "tool", "generator", "converter", "checker", "tester", "calculator",
  "validator", "viewer", "formatter", "decoder", "encoder", "editor", "maker", "beautifier",
];
const LEARN_WORDS = ["how to", "what is", "example", "tutorial", "meaning", "explained", "vs", "regex for", "syntax"];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const fetchJson = async (url) => {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 keyword-research" } });
      if (res.ok) return await res.json();
      if (res.status === 429) await sleep(2000 * (attempt + 1));
    } catch {
      await sleep(500);
    }
  }
  return null;
};

const SOURCES = {
  google: async (q) => {
    const data = await fetchJson(
      `https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=${encodeURIComponent(q)}`
    );
    return Array.isArray(data?.[1]) ? data[1] : [];
  },
  duckduckgo: async (q) => {
    const data = await fetchJson(`https://duckduckgo.com/ac/?type=list&q=${encodeURIComponent(q)}`);
    return Array.isArray(data?.[1]) ? data[1] : [];
  },
};

// Whole-word/phrase match, so "js" doesn't match inside "json"
const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const hasTerm = (keyword, term) =>
  new RegExp(`(^|\\s)${escapeRegExp(term)}(\\s|$)`).test(keyword);

const classify = (keyword) => {
  if (PLATFORM_WORDS.some((w) => hasTerm(keyword, w.trim()))) return "platform";
  if (LEARN_WORDS.some((w) => hasTerm(keyword, w))) return "learn";
  if (/\.(com|org|io|net|dev)\b/.test(keyword)) return "brand";
  if (TOOL_WORDS.some((w) => hasTerm(keyword, w))) return "tool";
  return "general";
};

const STOP_WORDS = new Set(["a", "an", "and", "the", "to", "for", "of", "in", "with", "&"]);

// Covered when every meaningful word of the keyword appears in the title or description
const isOnPage = (keyword, pageText) =>
  keyword
    .split(/\s+/)
    .filter((word) => !STOP_WORDS.has(word))
    .every((word) => hasTerm(pageText, word) || pageText.includes(word));

// Runs tasks with a small concurrency limit so the endpoints aren't hammered
const runPool = async (tasks) => {
  const results = [];
  let index = 0;
  const worker = async () => {
    while (index < tasks.length) {
      const task = tasks[index++];
      results.push(await task());
      await sleep(DELAY_MS);
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return results;
};

const researchRoute = async (route) => {
  const seeds = [...new Set([route.name.toLowerCase(), ...(EXTRA_SEEDS[route.path] ?? [])])];
  const queries = seeds.flatMap((seed) => MODIFIERS.map((m) => m(seed)));
  const keywords = new Map();

  const tasks = queries.flatMap((query) =>
    Object.entries(SOURCES).map(([source, fetcher]) => async () => {
      const suggestions = await fetcher(query);
      suggestions.forEach((raw, position) => {
        const keyword = raw.toLowerCase().trim();
        const entry = keywords.get(keyword) ?? { keyword, score: 0, hits: 0, sources: new Set() };
        entry.score += Math.max(1, 10 - position);
        entry.hits += 1;
        entry.sources.add(source);
        keywords.set(keyword, entry);
      });
    })
  );
  await runPool(tasks);

  const entries = [...keywords.values()].map((entry) => ({
    ...entry,
    sources: [...entry.sources],
  }));
  return annotate(route, entries, { seeds, queries: queries.length });
};

// Adds intent and on-page coverage against the route's current title and description
const annotate = (route, entries, extra = {}) => {
  const pageText = `${route.title} ${route.description}`
    .toLowerCase()
    .replace(/[^a-z0-9.\s-]/g, " ");
  const keywords = entries
    .map(({ keyword, score, hits, sources }) => ({
      keyword,
      score,
      hits,
      sources,
      intent: classify(keyword),
      onPage: isOnPage(keyword, pageText),
    }))
    .sort((a, b) => b.score - a.score);

  return { path: route.path, name: route.name, title: route.title, ...extra, keywords };
};

const formatReport = (results) => {
  const lines = [
    "# Keyword Research",
    "",
    `Generated ${new Date().toISOString().slice(0, 10)} from Google and DuckDuckGo autocomplete (en-US).`,
    "",
    "**Score** = sum of autocomplete positions across all queries and both sources (higher = suggested more often and higher up).",
    "It shows what people type, not how many people search. Confirm volume in Search Console or Google Keyword Planner.",
    "",
    "**Intent**: `tool` = wants an online tool (Toolet's target) · `general` = unclear · `learn` = wants an explanation · `platform` = wants a specific app/language/extension · `brand` = looking for another site.",
    "",
    "✅ = keyword already appears in the page's title or description.",
    "",
  ];

  for (const result of results) {
    const targetable = result.keywords.filter((k) => k.intent === "tool" || k.intent === "general");
    const gaps = targetable.filter((k) => !k.onPage).slice(0, 5);
    const learn = result.keywords.filter((k) => k.intent === "learn").slice(0, 5);

    lines.push(`## ${result.name} — \`${result.path}\``, "");
    lines.push(`Current title: *${result.title}*`, "");
    lines.push("| # | Keyword | Score | Intent | Sources | On page |", "|---|---|---|---|---|---|");
    targetable.slice(0, 15).forEach((k, i) => {
      lines.push(`| ${i + 1} | ${k.keyword} | ${k.score} | ${k.intent} | ${k.sources.length} | ${k.onPage ? "✅" : ""} |`);
    });
    lines.push("");
    if (gaps.length) {
      lines.push(`**Top keywords not yet on the page:** ${gaps.map((k) => `\`${k.keyword}\``).join(", ")}`, "");
    }
    if (learn.length) {
      lines.push(`**Questions people ask (content ideas):** ${learn.map((k) => `\`${k.keyword}\``).join(", ")}`, "");
    }
  }
  return lines.join("\n");
};

const main = async () => {
  const routes = [
    { path: "/", name: "Developer Tools", title: "Toolet – Free Online Developer Tools in Your Browser", description: "" },
    ...categoryRoutes,
    ...toolRoutes,
  ];
  const results = [];

  if (OFFLINE) {
    // Re-score the last run against the current titles/descriptions without refetching
    const saved = JSON.parse(await readFile(new URL("keywords.json", OUT_DIR), "utf8"));
    for (const route of routes) {
      const previous = saved.find((item) => item.path === route.path);
      if (!previous) {
        console.log(`Skipping ${route.path}: not in the last run (run without --offline)`);
        continue;
      }
      results.push(
        annotate(route, previous.keywords, { seeds: previous.seeds, queries: previous.queries })
      );
    }
  } else {
    for (const [i, route] of routes.entries()) {
      process.stdout.write(`[${i + 1}/${routes.length}] ${route.path} ... `);
      const result = await researchRoute(route);
      results.push(result);
      console.log(`${result.keywords.length} keywords`);
    }
  }

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(new URL("keywords.json", OUT_DIR), JSON.stringify(results, null, 2));
  await writeFile(new URL("keyword-report.md", OUT_DIR), formatReport(results));

  const total = results.reduce((sum, r) => sum + r.keywords.length, 0);
  console.log(`\nDone: ${total} keywords across ${results.length} routes.`);
  console.log("Wrote seo/keywords.json and seo/keyword-report.md");
};

main();
