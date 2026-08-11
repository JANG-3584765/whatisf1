// 썸네일 로드 실패 시 다음 후보 URL로 순서대로 재시도(data-fallback에 진행 단계 저장)
// 다 실패하면 이미지를 숨기고 onExhausted(있으면) 실행
export function createThumbnailFallback(steps: string[], onExhausted?: (img: HTMLImageElement) => void) {
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    const step = Number(img.dataset.fallback ?? '0')
    if (step >= steps.length || !steps[step]) {
      img.style.display = 'none'
      onExhausted?.(img)
      return
    }
    img.dataset.fallback = String(step + 1)
    img.src = steps[step]
  }
}
