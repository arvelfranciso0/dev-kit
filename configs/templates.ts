export const README_TEMPLATES = {
  universal: [
    { type: "H1", content: "Project Name" },
    { type: "Shields", content: "username/repo" },
    {
      type: "Text",
      content:
        "A brief description of what this project does and who it's for.",
    },
    { type: "H2", content: "Installation" },
    {
      type: "Bash",
      content:
        "git clone https://github.com/user/repo.git\ncd repo\nnpm install",
    },
    { type: "H2", content: "Usage" },
    { type: "Code", content: "// Example usage here" },
  ],
  nextjs: [
    { type: "H1", content: "Next.js App Name" },
    { type: "Shields", content: "username/repo" },
    {
      type: "Text",
      content: "Built with Next.js 14, Tailwind CSS, and Shadcn UI.",
    },
    { type: "H2", content: "Getting Started" },
    { type: "Bash", content: "npm run dev" },
    { type: "H2", content: "Environment Variables" },
    { type: "Code", content: "DATABASE_URL=your_url\nNEXT_PUBLIC_API=..." },
  ],
  python: [
    { type: "H1", content: "Python Tool" },
    { type: "Text", content: "A robust Python package for data processing." },
    { type: "H2", content: "Setup" },
    {
      type: "Bash",
      content:
        "python -m venv venv\nsource venv/bin/activate\npip install -r requirements.txt",
    },
  ],
  database: [
    { type: "H1", content: "Schema Documentation" },
    { type: "H2", content: "SQL Queries" },
    { type: "SQL", content: "SELECT * FROM users WHERE active = true;" },
  ],
} as const;
