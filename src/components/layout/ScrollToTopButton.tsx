'use client'

import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  window.addEventListener('scroll', callback, { passive: true })
  return () => window.removeEventListener('scroll', callback)
}

function getSnapshot() {
  return window.scrollY > 300
}

function getServerSnapshot() {
  return false
}

export default function ScrollToTopButton() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="맨 위로"
      className={`fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] shadow-md flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-[opacity,transform] duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="2,10 8,4 14,10" />
      </svg>
    </button>
  )
}
