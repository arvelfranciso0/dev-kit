export default function DataTable({ data }: { data: any[] }) {
  if (!Array.isArray(data) || data.length === 0) return null;
  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800">
            {headers.map((h) => (
              <th
                key={h}
                className="py-2 px-4 text-[10px] font-black uppercase tracking-widest text-zinc-400"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-xs font-mono">
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-b border-zinc-100 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
            >
              {headers.map((h) => (
                <td key={h} className="py-2 px-4 truncate max-w-50">
                  {typeof row[h] === "object" ? "{...}" : String(row[h])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
