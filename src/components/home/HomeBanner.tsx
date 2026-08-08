import Link from 'next/link'

interface HomeBannerProps {
  title: string
  description: string
  href: string
  label: string
  variant?: 'outline' | 'accent'
}

export default function HomeBanner({ title, description, href, label, variant = 'outline' }: HomeBannerProps) {
  return (
    <section
      className={`bg-[var(--card)] rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm ${
        variant === 'outline' ? 'border border-[var(--border)]' : ''
      }`}
    >
      <div className="flex flex-col gap-1 text-center sm:text-left">
        <h2 className="text-base font-black text-[var(--text)]">{title}</h2>
        <p className="text-sm text-[var(--muted)]">{description}</p>
      </div>
      <Link
        href={href}
        className={`text-sm font-bold rounded-xl px-6 py-2.5 whitespace-nowrap ${
          variant === 'accent'
            ? 'bg-[var(--accent)] text-white hover:opacity-90 transition-opacity'
            : 'border border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg-2)] transition-colors'
        }`}
      >
        {label}
      </Link>
    </section>
  )
}