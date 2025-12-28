export default function ComingSoon({
  title = "Coming Soon",
  description = "This feature is under development.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-semibold mb-2">{title}</h1>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}
