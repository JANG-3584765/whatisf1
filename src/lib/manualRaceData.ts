import { TEAM_COLORS } from '@/lib/teamColors'

export interface ManualPitStop {
  driver?: string   // 드라이버 이름 (한국어, DRIVER_FULL_NAMES 참고) — 미확인 시 생략 가능
  team: string      // 팀 이름 (한국어, CONSTRUCTOR_NAMES 참고)
  teamColor: string // TEAM_COLORS['팀명'] 사용
  duration: number  // 정차 서비스 타임 (초, 소수점 3자리 · 예: 2.456)
  lap?: number      // 피트스탑 랩 번호 — 미확인 시 생략 가능
}

export interface ManualDriverOfTheDay {
  driver: string
  team: string
  teamColor: string
}

export interface ManualRaceData {
  fastestPitStop?: ManualPitStop
  driverOfTheDay?: ManualDriverOfTheDay
}

// ──────────────────────────────────────────────────────────────────
// 데이터 입력 가이드
//
// 키 형식: "{연도}-{라운드}" (예: "2026-8")
//
// [패스티스트 피트 · 정차 서비스 타임]
//   - F1 공식 방송/F1TV 화면에 표시되는 DHL Fastest Pit Stop 배너 수치
//   - FIA 공식 타이밍 문서 (Event Notes / Technical Regulations 섹션):
//     https://www.fia.com/documents/championships/fia-formula-one-world-championship-14
//   ※ formula1.com 피트스탑 요약 페이지의 수치는 총 피트레인 소요시간(약 20-30초)이므로
//     정차 서비스 타임(2-5초)과 다름. 사용 불가.
//     (참고용 URL: formula1.com/en/results/{year}/races/{raceId}/{circuit}/pit-stop-summary)
//
// [오늘의 드라이버 · DOTD]
//   - 레이스 종료 후 F1 공식 팬 투표 결과 확인:
//     https://www.formula1.com/en/latest/article.driver-of-the-day
//   - F1 공식 앱 또는 F1 소셜미디어 확인
// ──────────────────────────────────────────────────────────────────

// 팀 이름 참고 (TEAM_COLORS 키)
// '레드불' | '맥라렌' | '페라리' | '메르세데스' | '애스턴 마틴'
// '알핀'   | '윌리엄스' | '레이싱 불스' | '하스'
// '아우디' | '캐딜락'

export const MANUAL_RACE_DATA: Record<string, ManualRaceData> = {

  // ── 2026 시즌 ────────────────────────────────────────────────────

  '2026-1': {
    // 호주 그랑프리 · 앨버트 파크 그랑프리 서킷
    fastestPitStop: { team: '메르세데스', teamColor: TEAM_COLORS['메르세데스'], duration: 2.170 },
    driverOfTheDay: { driver: '막스 베르스타펜', team: '레드불', teamColor: TEAM_COLORS['레드불'] },
  },

  '2026-2': {
    // 중국 그랑프리 · 상하이 인터내셔널 서킷
    fastestPitStop: { team: '페라리', teamColor: TEAM_COLORS['페라리'], duration: 2.290 },
    driverOfTheDay: { driver: '키미 안토넬리', team: '메르세데스', teamColor: TEAM_COLORS['메르세데스'] },
  },

  '2026-3': {
    // 일본 그랑프리 · 스즈카 서킷
    fastestPitStop: { team: '페라리', teamColor: TEAM_COLORS['페라리'], duration: 2.000 },
    driverOfTheDay: { driver: '오스카 피아스트리', team: '맥라렌', teamColor: TEAM_COLORS['맥라렌'] },
  },

  '2026-4': {
    // 마이애미 그랑프리 · 마이애미 인터내셔널 오토드롬
    fastestPitStop: { team: '레이싱 불스', teamColor: TEAM_COLORS['레이싱 불스'], duration: 2.080 },
    driverOfTheDay: { driver: '막스 베르스타펜', team: '레드불', teamColor: TEAM_COLORS['레드불'] },
  },

  '2026-5': {
    // 캐나다 그랑프리 · 서킷 질 빌뇌브
    fastestPitStop: { team: '레이싱 불스', teamColor: TEAM_COLORS['레이싱 불스'], duration: 2.200 },
    driverOfTheDay: { driver: '루이스 해밀턴', team: '페라리', teamColor: TEAM_COLORS['페라리'] },
  },

  '2026-6': {
    // 모나코 그랑프리 · 서킷 드 모나코
    fastestPitStop: { team: '메르세데스', teamColor: TEAM_COLORS['메르세데스'], duration: 2.170 },
    driverOfTheDay: { driver: '키미 안토넬리', team: '메르세데스', teamColor: TEAM_COLORS['메르세데스'] },
  },

  '2026-7': {
    // 바르셀로나-카탈루냐 그랑프리 · 서킷 데 바르셀로나-카탈루냐
    fastestPitStop: { team: '맥라렌', teamColor: TEAM_COLORS['맥라렌'], duration: 2.130 },
    driverOfTheDay: { driver: '루이스 해밀턴', team: '페라리', teamColor: TEAM_COLORS['페라리'] },
  },

  '2026-8': {
    // 오스트리아 그랑프리 · 레드불링
    fastestPitStop: { team: '레이싱 불스', teamColor: TEAM_COLORS['레이싱 불스'], duration: 2.030 },
    driverOfTheDay: { driver: '막스 베르스타펜', team: '레드불', teamColor: TEAM_COLORS['레드불'] },
  },

  '2026-9': {
    // 영국 그랑프리 · 실버스톤 서킷
    fastestPitStop: { team: '메르세데스', teamColor: TEAM_COLORS['메르세데스'], duration: 2.180 },
    driverOfTheDay: { driver: '샤를 르클레르', team: '페라리', teamColor: TEAM_COLORS['페라리'] },
  },

  '2026-10': {
    // 벨기에 그랑프리 · 서킷 드 스파 프랑코샹 서킷
    fastestPitStop: { team: '페라리', teamColor: TEAM_COLORS['페라리'], duration: 2.300 },
    driverOfTheDay: { driver: '샤를 르클레르', team: '페라리', teamColor: TEAM_COLORS['페라리'] },
  },

  '2026-11': {
    // 헝가리 그랑프리 · 헝가로링
    fastestPitStop: { team: '레이싱 불스', teamColor: TEAM_COLORS['레이싱 불스'], duration: 1.990 },
    driverOfTheDay: { driver: '막스 베르스타펜', team: '레드불', teamColor: TEAM_COLORS['레드불'] },
  },

  '2026-12': {
    // 네덜란드 그랑프리 · 잔드보르트 서킷
  },

  '2026-13': {
    // 이탈리아 그랑프리 · 아우토드로모 나치오날레 몬차
  },

  '2026-14': {
    // 스페인 그랑프리 · 마드링
  },

  '2026-15': {
    // 아제르바이잔 그랑프리 · 바쿠 시티 서킷
  },

  '2026-16': {
    // 바레인 그랑프리 · 사키르 인터내셔널 서킷
  },

  '2026-17': {
    // 싱가포르 그랑프리 · 마리나 베이 스트리트 서킷
  },

  '2026-18': {
    // 미국 그랑프리 · 서킷 오브 디 아메리카스
  },

  '2026-19': {
    // 멕시코시티 그랑프리 · 아우토드로모 에르마노스 로드리게스
  },

  '2026-20': {
    // 상파울루 그랑프리 · 아우토드로무 주제 카를루스 파시(인터라고스)
  },

  '2026-21': {
    // 라스베이거스 그랑프리 · 라스베이거스 스트립 서킷
  },

  '2026-22': {
    // 카타르 그랑프리 · 루사일 인터내셔널 서킷
  },

  '2026-23': {
    // 아부다비 그랑프리 · 야스 마리나 서킷
  },
}
