import { getAllHighlightVideos } from '@/lib/youtubeApi'
import { fetchLastRacePodium } from '@/lib/f1ResultsApi'
import { fetchDriverStandings, fetchConstructorStandings } from '@/lib/f1StandingsApi'
import { GP_NAMES, COUNTRY_CODES } from '@/lib/f1Api'
import { HIGHLIGHT_CHANNELS } from '@/data/youtubeChannels'
import HighlightsClient from './HighlightsClient'

export const revalidate = 3600

// 제목 수동 수정: 영상 ID(watch?v= 뒤 11자리)를 키로, 원하는 제목을 값으로 추가
const TITLE_OVERRIDES: Record<string, string> = {
  // 예시) 'dQw4w9WgXcQ': '2025 바레인 그랑프리 레이스 하이라이트',
}

// 시즌 수동 지정: 제목에 연도가 없어 자동 감지가 안 되는 재중계 영상용
const SEASON_OVERRIDES: Record<string, number> = {
  // 예시) 'dQw4w9WgXcQ': 2021,
}

export interface StandingMini {
  position: number
  name: string
  team: string
  teamColor: string
  points: number
}

export interface ConstructorMini {
  position: number
  name: string
  teamColor: string
  points: number
}

export interface NextRaceMini {
  raceName: string
  flag: string
  daysUntil: number
  round: number
  date: string       // e.g. "6월 15일 (일)"
  timeKST: string | null  // e.g. "22:00"
}

const DAY_KR = ['일', '월', '화', '수', '목', '금', '토']

interface JolpicaNextRace {
  raceName: string
  round: string
  date: string
  time?: string
  Circuit: { Location: { country: string } }
}

async function fetchNextRaceMini(): Promise<NextRaceMini | null> {
  try {
    const res = await fetch(
      'https://api.jolpi.ca/ergast/f1/current/next.json',
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) return null
    const data = await res.json()
    const race: JolpicaNextRace | undefined = data.MRData?.RaceTable?.Races?.[0]
    if (!race) return null

    const raceUTC = new Date(`${race.date}T${race.time ?? '00:00:00Z'}`)
    // KST = UTC+9
    const kst = new Date(raceUTC.getTime() + 9 * 3_600_000)
    const daysUntil = Math.max(0, Math.ceil((raceUTC.getTime() - Date.now()) / 86_400_000))
    const date = `${kst.getUTCMonth() + 1}월 ${kst.getUTCDate()}일 (${DAY_KR[kst.getUTCDay()]})`
    const timeKST = race.time
      ? `${String(kst.getUTCHours()).padStart(2, '0')}:${String(kst.getUTCMinutes()).padStart(2, '0')}`
      : null

    return {
      raceName: GP_NAMES[race.raceName] ?? race.raceName,
      flag: COUNTRY_CODES[race.Circuit.Location.country] ?? '',
      daysUntil,
      round: Number(race.round),
      date,
      timeKST,
    }
  } catch {
    return null
  }
}

export default async function HighlightsPage() {
  const [videos, lastRace, standingsRaw, constructorsRaw, nextRace] = await Promise.all([
    getAllHighlightVideos(HIGHLIGHT_CHANNELS),
    fetchLastRacePodium(),
    fetchDriverStandings(2026),
    fetchConstructorStandings(2026),
    fetchNextRaceMini(),
  ])

  const patched = videos.map(v => ({
    ...v,
    title:  TITLE_OVERRIDES[v.id]  ?? v.title,
    season: SEASON_OVERRIDES[v.id] ?? v.season,
  }))

  const topStandings: StandingMini[] | null = standingsRaw
    ?.slice(0, 3)
    .map(s => ({
      position:  s.position ?? 0,
      name:      s.name,
      team:      s.team,
      teamColor: s.teamColor,
      points:    s.points,
    })) ?? null

  const topConstructors: ConstructorMini[] | null = constructorsRaw
    ?.slice(0, 3)
    .map(c => ({
      position:  c.position ?? 0,
      name:      c.name,
      teamColor: c.teamColor,
      points:    c.points,
    })) ?? null

  return (
    <HighlightsClient
      videos={patched}
      lastRace={lastRace}
      topStandings={topStandings}
      topConstructors={topConstructors}
      nextRace={nextRace}
    />
  )
}
