import Skeleton, { SkeletonRow } from '@/components/ui/Skeleton'

export default function ResultsLoading() {
  return (
    <main className="min-h-screen bg-[var(--bg-2)] px-4 py-10" role="status" aria-live="polite">
      <span className="sr-only">결과를 불러오는 중입니다</span>
      <div className="mx-auto flex max-w-[980px] flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-6 w-24 rounded" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 sm:flex-row">
          <Skeleton className="h-9 flex-1 rounded-md" />
          <Skeleton className="h-9 flex-1 rounded-md" />
        </div>

        <div className="flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-6 w-56 rounded" />
            <Skeleton className="h-4 w-32 rounded" />
          </div>

          <div className="grid gap-4 md:grid-cols-[1.25fr_1fr]">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <Skeleton className="h-40 w-full rounded-lg" />
          </div>

          <div className="flex flex-wrap gap-2">
            <SkeletonRow count={4} className="h-7 w-28 rounded" />
          </div>

          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    </main>
  )
}
