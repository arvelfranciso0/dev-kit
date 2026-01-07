import { Skeleton } from "../ui/skeleton";

export default function SkeletonPanel() {
  return (
    <div className="flex flex-col h-full w-full border  overflow-hidden">
      {/* Mimic the Editor Header (HTML/CSS/JS title bar) */}
      <div className="flex items-center gap-2 px-4 py-2 ">
        <Skeleton className="h-4 w-4 rounded-sm" /> {/* Icon placeholder */}
        <Skeleton className="h-3 w-16" /> {/* Text placeholder */}
      </div>

      {/* Mimic the CodeMirror area */}
      <div className="flex flex-1 p-4 gap-4">
        {/* Line Numbers Column */}
        <div className="space-y-3 border-r pr-3">
          {[...Array(12)].map((_, i) => (
            <Skeleton key={i} className="h-3 w-4" />
          ))}
        </div>

        {/* Code Content Column */}
        <div className="flex-1 space-y-4 pt-1">
          <Skeleton className="h-3 w-[80%]" />
          <Skeleton className="h-3 w-[60%]" />
          <Skeleton className="h-3 w-[90%]" />
          <Skeleton className="h-3 w-[40%]" />
          <Skeleton className="h-3 w-[70%]" />
        </div>
      </div>
    </div>
  );
}
