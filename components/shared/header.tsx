import Link from "next/link";

interface HeaderProps {
  // Short category label shown in the breadcrumb
  category: string;
  // Page heading (h1)
  title: string;
  description: string;
}

export default function Header({ title, description, category }: HeaderProps) {
  return (
    <div className="space-y-4 border-b border-zinc-100 dark:border-zinc-800 pb-10">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
          <li>
            <Link
              href="/"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Home
            </Link>
          </li>
          <li aria-hidden className="text-zinc-200 dark:text-zinc-800">
            /
          </li>
          <li aria-current="page" className="text-zinc-900 dark:text-zinc-100">
            {category}
          </li>
        </ol>
      </nav>
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="text-zinc-500 max-w-xl text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
