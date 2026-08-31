interface SkeletonProps {
  className?: string
  bg?: string
  style?: React.CSSProperties
}

export default function Skeleton({ className = '', bg = 'bg-[var(--border)]', style }: SkeletonProps) {
  return <div aria-hidden="true" className={`animate-pulse ${bg} ${className}`} style={style} />
}

// 인덱스마다 스타일이 똑같은 Skeleton을 count개 반복할 때 쓰는 헬퍼.
// 항목마다 다른 style/bg가 필요하면(예: 인덱스별 opacity) 대신 Array.from + Skeleton을 직접 쓸 것.
export function SkeletonRow({ count, className }: { count: number; className?: string }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className={className} />
      ))}
    </>
  )
}
