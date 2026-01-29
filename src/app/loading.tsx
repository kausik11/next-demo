export default function Loading() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <div className="h-64 w-full animate-pulse rounded-[32px] bg-slate-200" />
      <div className="space-y-4">
        <div className="h-6 w-48 animate-pulse rounded-full bg-slate-200" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-3xl bg-slate-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
