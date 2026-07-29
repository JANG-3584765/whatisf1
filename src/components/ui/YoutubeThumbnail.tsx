'use client'

import { useEffect, useState } from 'react'

// URL 형식이 watch?si=...&v=ID처럼 v가 맨 앞에 안 오는 경우도 있어서, 정규식 대신 URL 파서로 안전하게 추출
export function getYoutubeVideoId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1, 12) || null
    const v = u.searchParams.get('v')
    if (v) return v
    const embedMatch = u.pathname.match(/\/embed\/([\w-]{11})/)
    return embedMatch ? embedMatch[1] : null
  } catch {
    return null
  }
}

export default function YoutubeThumbnail({ videoUrl, title }: { videoUrl: string; title: string }) {
  const videoId = getYoutubeVideoId(videoUrl)
  const [playing, setPlaying] = useState(false)

  // 모달 열림 → 스크롤 잠금 + ESC 닫기
  useEffect(() => {
    if (!playing) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setPlaying(false) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [playing])

  if (!videoId) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="group relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={e => {
            const img = e.currentTarget as HTMLImageElement
            const steps = [`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`, `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`]
            const step = Number(img.dataset.fallback ?? '0')
            if (step >= steps.length) return
            img.dataset.fallback = String(step + 1)
            img.src = steps[step]
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow">
            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[9px] border-l-gray-900 ml-0.5" />
          </div>
        </div>
      </button>

      {playing && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setPlaying(false)}
        >
          <div className="relative w-full max-w-3xl" onClick={e => e.stopPropagation()}>
            <div className="aspect-video bg-black rounded-xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <button
              type="button"
              onClick={() => setPlaying(false)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm font-bold"
            >
              닫기 ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}
