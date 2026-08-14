import type { ChannelConfig } from '@/lib/youtubeApi'

// 플레이리스트 ID 찾는 법: youtube.com/@Formula1/playlists → 원하는 재생목록 클릭 → URL의 list=PL... 복사

// 실제 GP 레이스 하이라이트 재생목록만(프리시즌/F2/F3/e스포츠 제외) — 시즌 순서(오래된 것 → 최신)
// 하이라이트 전체 목록(highlights/page.tsx)과 홈 미리보기(app/(main)/page.tsx의 PREVIEW_CHANNELS)가 함께 사용.
// 새 GP 추가 시 이 배열 하나만 갱신하면 두 곳 모두 반영됨.
export const OFFICIAL_RACE_CHANNELS: ChannelConfig[] = [
  { playlistId: 'PLfoNZDHitwjX8Mu-P_XGdkTyQ7-fohUwB', source: 'official', season: 2026, type: 'f1' }, // 호주 GP
  { playlistId: 'PLfoNZDHitwjVUgc0VemLNA-21SzaGolYK', source: 'official', season: 2026, type: 'f1' }, // 중국 GP
  { playlistId: 'PLfoNZDHitwjXbELZ-aWNVTBXwDQFo6CUs', source: 'official', season: 2026, type: 'f1' }, // 일본 GP
  { playlistId: 'PLfoNZDHitwjXPl6fAm6fhin3_aiX54FmB', source: 'official', season: 2026, type: 'f1' }, // 마이애미 GP
]

export const HIGHLIGHT_CHANNELS: ChannelConfig[] = [
  // ── F1 공식 2026 ─────────────────────────────────────────────
  { playlistId: 'PLfoNZDHitwjVo5NISHAaA2jKRdTHhAMDq', source: 'official', season: 2026, type: 'f1'     }, // 프리시즌
  ...OFFICIAL_RACE_CHANNELS,
  { playlistId: 'PLfoNZDHitwjVjPf0I_WIabs3DOSz59ol5', source: 'official', season: 2026, type: 'f2'     }, // F2 챔피언십
  { playlistId: 'PLfoNZDHitwjXxX2GDkQCQAafRUt0-e0nC', source: 'official', season: 2026, type: 'f3'     }, // F3 챔피언십
  { playlistId: 'PLfoNZDHitwjXtQvJy5Zj7dWQxdYnJbzUs', source: 'official', season: 2026, type: 'f3'     }, // F3 하이라이트
  { playlistId: 'PLfoNZDHitwjXYi_9_PkWXU_7Xh2sg2rqf', source: 'official', season: 2026, type: 'f2'     }, // F2 하이라이트
  { playlistId: 'PLfoNZDHitwjVniR1_CjG3Ok4st5QMCfiE', source: 'official', season: 2026, type: 'f1'     }, // Chasing the Dream
  { playlistId: 'PLfoNZDHitwjVbWmC_Mujg2CqzmU2mKoWi', source: 'official', season: 2026, type: 'f1'     }, // 라디오 리와인드
  { playlistId: 'PLfoNZDHitwjW7Rmf6JhWvL0-nnIhS1hYf', source: 'official', season: 2026, type: 'esports' }, // 심 레이싱

  // ── 쿠팡 ─────────────────────────────────────────────────────
  { playlistId: 'PLWTZYHe9YKAKE-coWfbasV22V7-YNTmAv', source: 'coupang', type: 'f1', inferType: true, inferSeason: true, maxVideos: 600 }, // season·type 제목 키워드로 자동 감지

  // ── 인플루언서 ────────────────────────────────────────────────
  { playlistId: 'PLFVYzSwyd-dFrhob1xpUfBxTawMOBP7ms', source: 'influencer', season: 2026, type: 'f1' }, // 원투피니시 2026시즌 리뷰
  { playlistId: 'PLFVYzSwyd-dF5_9cY9N82WYXkOubAV8Q2', source: 'influencer', season: 2026, type: 'f1' }, // 원투피니시 2026시즌 분석
  { playlistId: 'PLJ20G4cPlX-dsu_TX4XvLXQ6egNKJTDXg', source: 'influencer', type: 'f1' },               // Box to Pass F1 그랑프리 프리뷰·리뷰
  { playlistId: 'PLJ20G4cPlX-eGmu68jwLma0SeKRdU_13I', source: 'influencer', type: 'f1' },               // Box to Pass F1 NEWS
  { playlistId: 'PLJ20G4cPlX-dDdwukEMxrv3k251nOZLYl', source: 'influencer', type: 'f1' },               // Box to Pass F1 명승부 시리즈

  // ── 케로군 (Jesus Yoon) ───────────────────────────────────────
  { playlistId: 'PLJ1ZJ2o57OB1x3R9n0mNVyf5IPz-W2qPu', source: 'influencer', season: 2026, type: 'f1' }, // 2026 F1 주간리뷰
  { playlistId: 'PLJ1ZJ2o57OB2zlLthaJWhrgQFZvxivbJx', source: 'influencer', season: 2025, type: 'f1' }, // 2025 F1 주간리뷰
  { playlistId: 'PLJ1ZJ2o57OB25z9zuj-6wLqJ5HBycOBYc', source: 'influencer', season: 2024, type: 'f1' }, // 2024 F1 주간리뷰
  { playlistId: 'PLJ1ZJ2o57OB1awIptKq7Vwr0h_6chrRF_', source: 'influencer', season: 2023, type: 'f1' }, // 2023 F1 주간리뷰
  { playlistId: 'PLJ1ZJ2o57OB2eFvBaBR-rlgV7dh7BER85', source: 'influencer', season: 2022, type: 'f1' }, // 2022 F1 주간리뷰
  { playlistId: 'PLJ1ZJ2o57OB2ffl_dgsdf8MIz4ef29Xng', source: 'influencer', type: 'f1', inferSeason: true }, // F1 그랑프리 리뷰 (멀티시즌)
  { playlistId: 'PLJ1ZJ2o57OB0E4vJe5Epd_fDOUPjhbnED', source: 'influencer', type: 'f1', inferSeason: true }, // 퍼플섹터 (프리뷰)

  // ── 결승선그랑프리 ───────────────────────────────────────────────
  { playlistId: 'PLByKVKRnkd-CAHna4kAf-9zuzuBOsIefX', source: 'influencer', season: 2026, type: 'f1' }, // 2026년 F1 모든 GP
  { playlistId: 'PLByKVKRnkd-DbS91B0Pym84H7IfCoIvX7', source: 'influencer', season: 2025, type: 'f1' }, // F1 2025의 모든 GP
  { playlistId: 'PLByKVKRnkd-B02ofx6LEUew7T01tDdal1', source: 'influencer', type: 'f1', inferSeason: true }, // 포뮬러1 최신 뉴스
  { playlistId: 'PLByKVKRnkd-DGfdwF8mwMo78pSbyyiK47', source: 'influencer', type: 'f1', inferSeason: true }, // 빠른 포뮬러1 뉴스

  // ── 크레이지 포뮬러 ──────────────────────────────────────────
  { playlistId: 'PLXEVhVsZwEjaHR11yp4FCTd8NBpRh-GDm', source: 'influencer', season: 2026, type: 'f1' }, // 2026시즌 그랑프리
  { playlistId: 'PLXEVhVsZwEjZQRWMZiZ4PjV93RvFuZHej', source: 'influencer', season: 2025, type: 'f1' }, // 2025시즌 매치 리뷰/프리뷰
  { playlistId: 'PLXEVhVsZwEjbDNNO4nh7RE4zIRD6mxusY', source: 'influencer', season: 2024, type: 'f1' }, // 2024시즌 그랑프리 프리뷰&리뷰
  { playlistId: 'PLXEVhVsZwEjZYEpXgDSG93ev6xngNjiAO', source: 'influencer', type: 'f1', inferSeason: true }, // F1의 모든 유망주들
  { playlistId: 'PLXEVhVsZwEjYYcH1r0kJCYB9tArpf_3ea', source: 'influencer', type: 'f1', inferSeason: true }, // 크고 작은 뉴스 및 비시즌 소식들

  // ── 퍼플섹터 (채널) ──────────────────────────────────────────
  { playlistId: 'PLw8ExlQ65p11tMHXSVqufGOpPOFL266Rj', source: 'influencer', season: 2026, type: 'f1' }, // F1 2026 서킷 프리뷰
  { playlistId: 'PLw8ExlQ65p138SWp2TtU6qaoEbwaRV6JC', source: 'influencer', season: 2026, type: 'f1' }, // F1 2026 그랑프리 리뷰
  { playlistId: 'PLw8ExlQ65p137w6-_Syq5dkH4EKk7eBHa', source: 'influencer', season: 2026, type: 'f1' }, // F1 2026 뉴스/이슈

  // ── 시케인 ────────────────────────────────────────────────────
  { playlistId: 'PL_xxLl39V_HZPjoaPfQZmwmvLFXrPgSb2', source: 'influencer', type: 'f1',    inferSeason: true }, // F1 그랑프리 프리뷰 및 서킷 소개
  { playlistId: 'PL_xxLl39V_HZPWi-u91GOD9dMFAkz2zh_', source: 'influencer', type: 'f1',    inferSeason: true }, // F1 그랑프리 리뷰
  { playlistId: 'PL_xxLl39V_HbHsiuBeiDql170-_mb2nNA', source: 'influencer', type: 'other', inferSeason: true }, // 기타 레이스
]
