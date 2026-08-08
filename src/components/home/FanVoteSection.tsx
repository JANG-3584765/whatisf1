import HomeBanner from './HomeBanner'

export default function FanVoteSection() {
  return (
    <HomeBanner
      title="팬 투표"
      description="이번 GP 우승자를 예측해보세요!"
      href="/prediction"
      label="투표 하러 가기 →"
      variant="accent"
    />
  )
}
