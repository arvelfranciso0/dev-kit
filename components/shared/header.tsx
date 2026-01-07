interface HeaderProps {
  category: string;
  title: string;
  description: string;
}

export default function Header({ title, description, category }: HeaderProps) {
  return (
    <div className="space-y-4 border-b border-zinc-100 dark:border-zinc-800 pb-10">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
        <span>TOOLS</span>
        <span className="text-zinc-200 dark:text-zinc-800">/</span>
        <span className="text-zinc-900 dark:text-zinc-100">{title}</span>
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">{category}</h1>
        <p className="text-zinc-500 max-w-xl text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
