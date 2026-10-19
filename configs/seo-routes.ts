// Single source of truth for per-route SEO: titles, descriptions, sitemap entries,
// Open Graph images and structured data are all generated from these lists.
// `title` is the page-specific part; the root layout appends " | Toolet".
// `name` is the short label used in breadcrumbs and social images.

export interface RouteSeo {
  path: string;
  name: string;
  title: string;
  description: string;
  ogTitle?: string;
}

export const categoryRoutes: RouteSeo[] = [
  {
    path: "/tools/text",
    name: "Text Tools",
    title: "Text Tools: Regex, Case, Slug & Encoding",
    description:
      "Free browser-based text utilities for developers: test regular expressions, convert string case, generate URL slugs, and encode or decode Base64 and URLs.",
  },
  {
    path: "/tools/data",
    name: "Data Tools",
    title: "JSON & CSV Data Tools: Format, Diff, Convert",
    description:
      "Format and validate JSON, compare two JSON documents, explore data as a tree or table, and convert between JSON and CSV. Processing happens in your browser.",
  },
  {
    path: "/tools/generate",
    name: "Generators",
    title: "Developer Generators: Passwords, README, CSS",
    description:
      "Generate secure random passwords, build a README.md from reusable blocks, design layered CSS box shadows, and create a 50–950 color scale from one hex color.",
  },
  {
    path: "/tools/optimize",
    name: "Optimization",
    title: "Optimization Tools: SVG Optimizer & HTML Sanitizer",
    description:
      "Free in-browser tools to shrink SVG files with SVGO and sanitize untrusted HTML with DOMPurify, with before/after size stats and copy-ready output.",
  },
  {
    path: "/tools/design",
    name: "Design Utilities",
    title: "CSS Design Utilities: Units, Contrast & Type",
    description:
      "Convert px, rem and vw units, check WCAG color contrast, generate fluid clamp() font sizes and calculate CSS aspect ratios. Free and runs in your browser.",
  },
  {
    path: "/tools/dev",
    name: "Developer Tools",
    title: "Developer Tools: Markdown, Diff & Git Reference",
    description:
      "Preview GitHub-flavored Markdown as you type, compare two code snippets in split or unified view, and search a Git command cheat sheet. Free, in your browser.",
  },
  {
    path: "/tools/security",
    name: "Security",
    title: "Security Tools: JWT Decoder & Bcrypt Hasher",
    description:
      "Decode JSON Web Tokens and generate or verify bcrypt password hashes entirely in your browser. Tokens and passwords are processed locally, never uploaded.",
  },
  {
    path: "/tools/playgrounds",
    name: "Playgrounds",
    title: "Code Playgrounds: HTML, CSS & JavaScript",
    description:
      "Prototype in a free browser-based HTML, CSS and JavaScript sandbox. Your code runs in an isolated iframe with a live preview that updates as you type.",
  },
  {
    path: "/tools/converter",
    name: "Converters",
    title: "Converters: Unix Timestamp to Date & Back",
    description:
      "Free in-browser converters for developers. Turn Unix timestamps in seconds or milliseconds into readable dates in any time zone, or dates back into epoch time.",
  },
];

export const toolRoutes: RouteSeo[] = [
  // Text
  {
    path: "/tools/text/regex",
    name: "Regex Tester",
    title: "Regex Tester: Test Regular Expressions Online",
    description:
      "Test JavaScript regular expressions with live match highlighting, a match count and g, i, m, s and u flag toggles. Runs entirely in your browser, free.",
  },
  {
    path: "/tools/text/case",
    name: "Case Converter",
    title: "Case Converter: camelCase, snake_case, UPPER",
    description:
      "Convert text to camelCase, snake_case, UPPERCASE and lowercase at once, with character and word counts and one-click copy. Free and runs in your browser.",
  },
  {
    path: "/tools/text/slug",
    name: "Slug Generator",
    title: "Slug Generator: Turn Text into URL Slugs",
    description:
      "Turn titles into URL slugs with hyphen or underscore separators, ASCII, Unicode or percent-encoded output, and an option to keep case. Runs in your browser.",
  },
  {
    path: "/tools/text/encode",
    name: "Base64 & URL Encoder",
    title: "Base64 & URL Encoder and Decoder Online",
    description:
      "Encode or decode Base64 and URL (percent-encoded) strings and swap direction in one click. Conversion runs locally in your browser; nothing is sent to a server.",
  },
  // Data
  {
    path: "/tools/data/formatter",
    name: "JSON Formatter",
    title: "JSON Formatter, Validator & Minifier",
    description:
      "Paste JSON to pretty-print it with 2-space indentation, see validation errors with line and column, or minify it to one line. Free and runs in your browser.",
  },
  {
    path: "/tools/data/diff",
    name: "JSON Diff",
    title: "JSON Diff: Compare Two JSON Documents",
    description:
      "Compare two JSON documents in a split or unified diff view. Inputs are re-indented first, so whitespace differences are ignored. Runs in your browser, free.",
  },
  {
    path: "/tools/data/viewer",
    name: "JSON Viewer",
    title: "JSON Viewer: Explore Data as Tree or Table",
    description:
      "Paste JSON to explore it as a collapsible, color-coded tree, or view an array of objects as a table with a column per key. Free and runs in your browser.",
  },
  {
    path: "/tools/data/json-to-csv",
    name: "JSON to CSV",
    title: "JSON to CSV Converter with Nested Flattening",
    description:
      "Convert a JSON array or object to CSV, flattening nested objects into dot-notation columns. Copy the result or download a .csv file. Runs in your browser.",
  },
  {
    path: "/tools/data/csv-to-json",
    name: "CSV to JSON",
    title: "CSV to JSON Converter with Type Detection",
    description:
      "Paste or upload a CSV file and convert it to a JSON array using the header row as keys, with numbers and booleans detected automatically. Runs in your browser.",
  },
  // Generators
  {
    path: "/tools/generate/password",
    name: "Password Generator",
    title: "Random Password Generator with Strength Check",
    description:
      "Generate random 8–64 character passwords in your browser with the Web Crypto API. Pick character sets, skip look-alike characters and check password strength.",
  },
  {
    path: "/tools/generate/readme",
    name: "README Generator",
    title: "README Generator: Build a README.md Online",
    description:
      "Build a GitHub-flavored README.md from reorderable heading, text, code and badge blocks. Start from a template, preview it live and download the file.",
  },
  {
    path: "/tools/generate/shadow",
    name: "Box Shadow Generator",
    title: "CSS Box Shadow Generator: Layered Shadows",
    description:
      "Create smooth multi-layer CSS box shadows by adjusting layers, blur, elevation and opacity, start from presets, and copy the box-shadow CSS or a Tailwind class.",
  },
  {
    path: "/tools/generate/colors",
    name: "Color Palette Generator",
    title: "Color Palette Generator: 50–950 Color Scale",
    description:
      "Generate an 11-step 50–950 color scale from one hex seed color, see its HEX, RGB and HSL values, and copy the shades as CSS custom properties. Runs in your browser.",
  },
  // Optimization
  {
    path: "/tools/optimize/svg",
    name: "SVG Optimizer",
    title: "SVG Optimizer: Minify SVG Files with SVGO",
    description:
      "Paste SVG code to minify it with SVGO in your browser. See the size reduction, preview the result, and export clean SVG, a data URI or Base64, or download it.",
  },
  {
    path: "/tools/optimize/html",
    name: "HTML Sanitizer",
    title: "HTML Sanitizer: Strip Scripts & Unsafe Markup",
    description:
      "Clean untrusted HTML with DOMPurify in your browser. Removes scripts, event handlers and non-allowlisted tags, then shows the safe source and a live preview.",
  },
  // Design
  {
    path: "/tools/design/units",
    name: "PX to REM Converter",
    title: "PX to REM Converter: px, rem, em, vw & pt",
    description:
      "Convert a value in px, rem, vw or pt to px, rem, em, ch, vw and pt at once. Set the root font size and viewport width to match your project, in your browser.",
  },
  {
    path: "/tools/design/contrast",
    name: "Contrast Checker",
    title: "Color Contrast Checker for WCAG AA & AAA",
    description:
      "Check the WCAG contrast ratio between text and background colors, preview the pair live, and get adjusted foreground colors that meet AA (4.5:1) or AAA (7:1).",
  },
  {
    path: "/tools/design/typography",
    name: "Fluid Typography Calculator",
    title: "Fluid Typography Calculator: CSS clamp()",
    description:
      "Generate a fluid font-size with CSS clamp() from min and max font sizes and viewport widths. Copy it as CSS or a Tailwind class and preview the scaling live.",
  },
  {
    path: "/tools/design/aspect-ratio",
    name: "Aspect Ratio Calculator",
    title: "Aspect Ratio Calculator for CSS & Tailwind",
    description:
      "Enter a width and height or pick a preset like 16:9 to get the CSS aspect-ratio property, the padding-top fallback percentage and a Tailwind aspect class.",
  },
  // Developer
  {
    path: "/tools/dev/markdown",
    name: "Markdown Preview",
    title: "Markdown Preview: Live GitHub-Flavored Editor",
    description:
      "Write Markdown and see it rendered side by side as you type, with GitHub-flavored tables, task lists, strikethrough and syntax-highlighted code blocks.",
  },
  {
    path: "/tools/dev/diff",
    name: "Diff Checker",
    title: "Diff Checker: Compare Text & Code Side by Side",
    description:
      "Paste original and modified code to see line-by-line differences in split or unified view, with three lines of context around each change, in your browser.",
  },
  {
    path: "/tools/dev/git",
    name: "Git Cheat Sheet",
    title: "Git Cheat Sheet: Searchable Command Reference",
    description:
      "Search 88 common Git commands for setup, branching, rebasing, stashing, tags and more, and click any command to copy it. Includes Conventional Commit types.",
  },
  // Security
  {
    path: "/tools/security/jwt",
    name: "JWT Decoder",
    title: "JWT Decoder: Inspect Header, Payload & Expiry",
    description:
      "Paste a JSON Web Token to decode its header and payload claims and check the algorithm and expiry. Decoding runs in your browser; the token is never uploaded.",
  },
  {
    path: "/tools/security/bcrypt",
    name: "Bcrypt Hasher",
    title: "Bcrypt Hash Generator & Password Verifier",
    description:
      "Generate bcrypt hashes with a cost factor from 4 to 15, or check a password against an existing hash. Hashing runs in your browser, so passwords never leave it.",
  },
  // Playgrounds
  {
    path: "/tools/playgrounds/web",
    name: "HTML/CSS/JS Playground",
    title: "HTML, CSS & JS Playground with Live Preview",
    description:
      "Write HTML, CSS and JavaScript in separate editors and see the result in a sandboxed iframe that refreshes as you type, with a fullscreen preview mode.",
  },
  // Converters
  {
    path: "/tools/converter/timestamp",
    name: "Timestamp Converter",
    title: "Unix Timestamp Converter: Epoch to Date & Back",
    description:
      "Convert Unix timestamps in seconds or milliseconds to dates, or dates to epoch time, in any time zone. Output ISO 8601 or a custom format, with a live clock.",
  },
];
