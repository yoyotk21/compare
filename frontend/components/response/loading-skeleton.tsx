import Skeleton from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="rounded-3xl border border-white/5 bg-white/5 p-5">
          <Skeleton className="h-4 w-32" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="space-y-4 rounded-3xl border border-white/5 bg-white/5 p-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-3/4" />
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 2 }).map((__, cardIndex) => (
                <div key={cardIndex} className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
