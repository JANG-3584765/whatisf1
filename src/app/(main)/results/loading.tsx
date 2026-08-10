import Skeleton, { SkeletonRow } from '@/components/ui/Skeleton'

export default function ResultsLoading() {
  return (
    <main className="min-h-screen bg-[var(--bg-2)] px-4 py-6">
      <div className="mx-auto max-w-[980px] flex flex-col gap-6">
        <div className="bg-[var(--card)] rounded-xl shadow-sm p-4 flex flex-col gap-3">
          <Skeleton className="h-5 w-32 rounded" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24 rounded-lg" />
            <Skeleton className="h-9 w-36 rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          <div className="flex flex-col gap-4">
            <div className="bg-[var(--card)] rounded-xl shadow-sm overflow-hidden">
              <Skeleton className="w-full aspect-[16/9]" />
              <div className="p-5 flex flex-col gap-3">
                <Skeleton className="h-6 w-48 rounded" />
                <div className="grid grid-cols-3 gap-3">
                  <SkeletonRow count={6} className="h-14 rounded-lg" />
                </div>
              </div>
            </div>

            <div className="bg-[var(--card)] rounded-xl shadow-sm p-4">
              <Skeleton className="h-4 w-24 rounded mb-3" />
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-14 border-t border-[var(--border)]"
                  bg="bg-[var(--card)]"
                  style={{ opacity: 1 - i * 0.2 }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Skeleton className="h-[300px] rounded-xl shadow-sm" bg="bg-[var(--card)]" />
          </div>
        </div>
      </div>
    </main>
  )
}
