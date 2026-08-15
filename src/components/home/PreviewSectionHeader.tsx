import Link from 'next/link'

export default function PreviewSectionHeader({ title, moreHref }: { title: string; moreHref: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-base font-black text-[var(--text)]">{title}</h2>
      <Link href={moreHref} className="text-xs font-semibold text-[var(--accent)] hover:underline">
        더보기 →
      </Link>
    </div>
  )
}
