export default function PolicyPageLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="flex-1 bg-[var(--bg-2)] py-16 px-4">
      <div className="max-w-[760px] mx-auto bg-[var(--card)] rounded-xl shadow-sm p-8 sm:p-10">

        <h1 className="text-2xl font-bold text-[var(--text)] mb-1">{title}</h1>
        <p className="text-sm text-[var(--muted)] mb-8">시행일: 2026년 9월 1일</p>

        {children}

      </div>
    </main>
  )
}
