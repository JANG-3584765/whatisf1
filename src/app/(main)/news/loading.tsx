import Skeleton, { SkeletonRow } from '@/components/ui/Skeleton'

export default function NewsLoading() {
  return (
    <main className="px-4 py-6">
      <div className="max-w-[720px] mx-auto flex flex-col gap-4">
        <div className="bg-[var(--card)] rounded-xl shadow-sm px-6 py-5 flex flex-col gap-3">
          <Skeleton className="h-6 w-24 rounded" />
          <div className="flex gap-1.5">
            <SkeletonRow count={5} className="h-7 w-16 rounded-full" />
          </div>
          <div className="flex gap-1.5">
            <SkeletonRow count={5} className="h-8 w-16 rounded-lg" />
          </div>
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-[var(--card)] rounded-xl shadow-sm overflow-hidden">
            <Skeleton className="w-full aspect-[3/1]" />
            <div className="px-5 py-4 flex flex-col gap-2.5">
              <div className="flex gap-2">
                <Skeleton className="h-3 w-16 rounded" />
                <Skeleton className="h-3 w-12 rounded" />
              </div>
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-3 w-2/3 rounded" />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
