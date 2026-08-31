import Skeleton from '@/components/ui/Skeleton'

export default function StandingsLoading() {
  return (
    <main className="min-h-screen bg-[var(--bg-2)] px-4 py-10" role="status" aria-live="polite">
      <span className="sr-only">순위를 불러오는 중입니다</span>
      <div className="mx-auto flex max-w-[980px] flex-col gap-4">
        <Skeleton className="h-7 w-64 rounded-lg" />

        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3">
          <Skeleton className="h-4 w-24 rounded mb-2" />
          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1 rounded-md" bg="bg-[var(--bg-2)]" />
            <Skeleton className="h-10 w-16 rounded-md" bg="bg-[var(--bg-2)]" />
          </div>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3">
          <Skeleton className="h-10 w-36 rounded-md" bg="bg-[var(--bg-2)]" />
        </div>

        <div className="flex gap-1 rounded-lg border border-[var(--border)] bg-[var(--bg-2)] p-1">
          <Skeleton className="h-9 flex-1 rounded-md" bg="bg-[var(--card)]" />
          <Skeleton className="h-9 flex-1 rounded-md" bg="" />
        </div>

        <div className="overflow-hidden rounded-lg border border-[var(--border)]">
          <Skeleton className="h-10" bg="bg-[var(--bg-2)]" />
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-14 border-t border-[var(--border)]"
              bg="bg-[var(--card)]"
              style={{ opacity: 1 - i * 0.06 }}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
