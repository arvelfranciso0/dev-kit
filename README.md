# 🧰 Toolet

Free, browser-based developer tools built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**. Toolet provides fast, clean, and privacy‑friendly tools for formatting, converting, generating, and debugging — all in one place, with everything running locally in your browser.

## 🌐 Live Website

**👉 [toolet.netlify.app](https://toolet.netlify.app)**

Free to use, no sign-up required. Open any tool and start working right away.

---

## ✨ Features

- ⚡ Built with **Next.js App Router**
- 🎨 Modern UI using **shadcn/ui** + Tailwind CSS
- 🌙 Dark mode ready
- 🧩 Modular tool-based architecture
- 🔐 Client-side processing (nothing is uploaded or stored)
- 🔎 SEO-ready: per-page metadata, sitemap, robots, Open Graph images, and structured data
- 📱 Fully responsive

---

## 🛠️ Tools

| Category | Tools |
|---|---|
| 📝 **Text** | Regex Tester · Case Converter · Slug Generator · Base64 & URL Encoder |
| 🧾 **Data** | JSON Formatter · JSON Diff · JSON Viewer · JSON → CSV · CSV → JSON |
| ✨ **Generators** | Password Generator · README Generator · Box Shadow Generator · Color Palette Generator |
| ⚡ **Optimization** | SVG Optimizer · HTML Sanitizer |
| 🎨 **Design** | PX to REM Converter · Contrast Checker · Fluid Typography · Aspect Ratio Calculator |
| 💻 **Developer** | Markdown Preview · Diff Checker · Git Cheat Sheet |
| 🔐 **Security** | JWT Decoder · Bcrypt Hasher |
| 🧪 **Playgrounds** | HTML/CSS/JS Playground |
| 🔁 **Converters** | Timestamp Converter |

---

## 📂 Project Structure

```
app/
├─ page.tsx                # Landing page
├─ layout.tsx              # Root layout + site-wide metadata
├─ robots.ts / sitemap.ts  # Generated from configs/seo-routes.ts
├─ og/                     # Generated Open Graph images
└─ tools/
   └─ <category>/
      ├─ page.tsx          # Category page
      └─ <tool>/
         ├─ layout.tsx     # Tool metadata + structured data
         └─ page.tsx       # Tool UI

components/
├─ ui/       # shadcn components
├─ layout/   # sidebar, footer
└─ shared/   # reusable tool building blocks

configs/
├─ navigation.ts   # Sidebar and landing page menu
├─ seo-routes.ts   # Title + description for every page
└─ site.ts         # Site name, URL, and defaults

scripts/
└─ keyword-research.mjs   # Keyword research from autocomplete data
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/arvelfranciso0/dev-kit.git
cd dev-kit
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🎨 UI Stack

- **Next.js** – App Router
- **TypeScript** – Type safety
- **Tailwind CSS** – Utility-first styling
- **shadcn/ui** – Accessible UI components
- **Lucide Icons** – Icon system

---

## 🔐 Privacy & Security

All tools run **entirely in the browser**.

- No analytics tracking
- No server-side data storage
- No third-party APIs for processing

Your data stays with you.

---

## 🧠 Design Philosophy

Toolet focuses on:

- Simplicity over clutter
- Developer-first UX
- Fast interactions
- Clear visual hierarchy
- Extensible architecture

---

## 📌 Roadmap

- [ ] Drag & drop file support
- [ ] JSON schema validation
- [ ] Tool favorites
- [ ] Export & share options

---

<!-- ## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Open a pull request

--- -->

## 📄 License

MIT License

---

## 👨‍💻 Author

**Arvel Francisco**
Full‑Stack Developer

---

> Built for developers who value clean tools and clean code.
