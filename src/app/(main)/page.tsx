import { fetchDriverStandings, fetchConstructorStandings } from '@/lib/f1StandingsApi'
import { getRecentHighlights } from '@/lib/youtubeApi'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { OFFICIAL_RACE_CHANNELS } from '@/data/youtubeChannels'
import NextRaceSection from '@/components/home/NextRaceSection'
import NewsPreviewSection from '@/components/home/NewsPreviewSection'
import HighlightsPreviewSection from '@/components/home/HighlightsPreviewSection'
import StandingsPreviewSection from '@/components/home/StandingsPreviewSection'
import FanVoteSection from '@/components/home/FanVoteSection'
import BeginnerGuideSection from '@/components/home/BeginnerGuideSection'

export const revalidate = 1800

// 홈 미리보기용 — 최근 GP 3개, 최신순. OFFICIAL_RACE_CHANNELS(오래된 순)에서 뒤에서 3개를 뽑아 뒤집음.
// 새 GP가 추가되면 자동으로 반영됨(예전엔 여기 따로 하드코딩해서 두 곳을 각각 갱신해야 했음)
const PREVIEW_CHANNELS = OFFICIAL_RACE_CHANNELS.slice(-3).reverse()

export default async function HomePage() {
  const [drivers, constructors, { data: newsData }, highlights] = await Promise.all([
    fetchDriverStandings(2026),
    fetchConstructorStandings(2026),
    supabaseAdmin
      .from('news_translations')
      .select('article_url, title_kr, title_en, image_url, source, pub_date')
      .eq('is_published', true)
      .order('pub_date', { ascending: false })
      .limit(3),
    getRecentHighlights(PREVIEW_CHANNELS, 3),
  ])

  return (
    <main className="bg-[var(--bg-2)] min-h-screen">
      <div className="max-w-[980px] mx-auto px-4 py-8 flex flex-col gap-8">
        <NextRaceSection />
        <NewsPreviewSection news={newsData ?? []} />
        <HighlightsPreviewSection videos={highlights} />
        <StandingsPreviewSection
          drivers={drivers?.slice(0, 3) ?? null}
          constructors={constructors?.slice(0, 3) ?? null}
        />
        <BeginnerGuideSection />
        <FanVoteSection />
      </div>
    </main>
  )
}
