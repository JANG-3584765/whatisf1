'use client'

import { useState, type ReactNode } from 'react'
import { TEAMS_GUIDE, DRIVERS_GUIDE_VIDEO_URL } from '@/data/2026Guide'
import { ALL_TEAMS, ALL_DRIVERS } from '@/data/2026Roster'
import Term from '@/components/ui/Term'
import TeamCard from '@/components/guide/TeamCard'
import YoutubeThumbnail from '@/components/ui/YoutubeThumbnail'

type Tab = 'basics' | 'teams' | 'drivers' | 'regulations'

const REGULATION_CHANGES: { label: ReactNode; before: string; after: string }[] = [
  { label: <Term id="wheelbase">휠베이스</Term>,  before: '3,600mm',       after: '3,400mm' },
  { label: '차량 폭',   before: '2,000mm',       after: '1,900mm' },
  { label: '최소 무게', before: '800kg',          after: '768kg' },
  { label: '앞 타이어', before: '305mm',          after: '280mm' },
  { label: '뒤 타이어', before: '405mm',          after: '375mm' },
  { label: '추월 보조', before: 'DRS',            after: '오버테이크 모드' },
  { label: '하이브리드',before: 'MGU-K + MGU-H', after: 'MGU-K (MGU-H 폐지)' },
  { label: '전력 생산', before: '120kW',          after: '350kW' },
]

const REGULATION_TIRE_CHANGES: ReactNode[] = [
  '규격 축소 — 앞 280mm · 뒤 375mm',
  <><Term id="tirecompound">C6</Term> 폐지 → C1~C5 슬릭 5종으로 간소화</>,
  '외부 디자인 — 두꺼운 선 → 체크무늬 패턴',
  '인터미디어트·웻은 2025년과 동일 패턴 유지',
]

const POINTS_TABLE = [
  { pos: 1, pts: 25 }, { pos: 2, pts: 18 }, { pos: 3, pts: 15 },
  { pos: 4, pts: 12 }, { pos: 5, pts: 10 }, { pos: 6, pts: 8 },
  { pos: 7, pts: 6 },  { pos: 8, pts: 4 },  { pos: 9, pts: 2 }, { pos: 10, pts: 1 },
]

const TIRES = [
  { name: '웻 (Wet)',     color: '#0067FF', mark: 'W', desc: '폭우 전용. 깊은 배수 홈으로 수막 방지. 2026 패턴 동일' },
  { name: '인터미디어트', color: '#39B54A', mark: 'I', desc: '젖은 노면 사용. 슬릭과 웻의 중간. 2026 패턴 동일' },
  { name: '하드',         color: '#EEEEEE', mark: 'H', desc: '내구성 최강 (C1·C2). 마모가 느려 장거리 스틴트에 유리' },
  { name: '미디엄',       color: '#FFEE00', mark: 'M', desc: '속도·내구성 균형 (C3·C4). 레이스에서 가장 많이 사용' },
  { name: '소프트',       color: '#FF3333', mark: 'S', desc: '가장 빠르지만 마모 빠름 (C5). 2026년 C6 폐지로 C5가 최상위' },
]

const WEEKEND_STANDARD = [
  { day: '금요일', sessions: ['FP1 (자유 연습 1회 · 1시간)', 'FP2 (자유 연습 2회 · 1시간)'] },
  { day: '토요일', sessions: ['FP3 (자유 연습 3회 · 1시간)', '예선 (Q1 → Q2 → Q3)'] },
  { day: '일요일', sessions: ['결선 레이스 (약 305km · 1~2시간)'] },
]

const WEEKEND_SPRINT = [
  { day: '금요일', sessions: ['FP1 (자유 연습 1회 · 1시간)', '스프린트 예선 (SQ1 → SQ2 → SQ3)'] },
  { day: '토요일', sessions: ['스프린트 레이스 (약 100km · 30분)', '예선 (Q1 → Q2 → Q3)'] },
  { day: '일요일', sessions: ['결선 레이스 (약 305km · 1~2시간)'] },
]

const TABS: { key: Tab; label: string }[] = [
  { key: 'basics',      label: '기초 지식' },
  { key: 'teams',       label: '팀 가이드' },
  { key: 'drivers',     label: '드라이버 가이드' },
  { key: 'regulations', label: '2026 규정' },
]

export default function GuidePage() {
  const [tab, setTab] = useState<Tab>('basics')
  const [sprintView, setSprintView] = useState(false)

  return (
    <main className="flex-1 bg-[var(--bg-2)] py-10 px-4">
      <div className="max-w-[720px] mx-auto flex flex-col gap-6">

        {/* 히어로 */}
        <div className="bg-[var(--card)] rounded-2xl px-8 py-8 shadow-sm">
          <p className="text-xs font-semibold text-[var(--accent)] mb-2 tracking-widest uppercase">Beginner Guide</p>
          <h1 className="text-3xl font-black text-[var(--text)] mb-4">F1 입문 가이드</h1>
          <p className="text-sm text-[var(--muted)] leading-[1.9]">
            기본 규칙부터 2026 시즌 팀·드라이버 정보까지 한눈에 정리했습니다.
          </p>
          <p className="text-xs text-[var(--muted)] mt-4">
            <span className="border-b-2 border-dashed border-[var(--accent)] text-[var(--accent)] font-semibold">점선 밑줄 단어</span>를 클릭하면 용어 설명을 볼 수 있습니다.
          </p>
        </div>

        {/* 탭 */}
        <div className="flex rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--card)] shadow-sm">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-3.5 text-sm font-semibold transition-colors cursor-pointer
                ${tab === t.key
                  ? 'bg-[var(--accent)] text-white'
                  : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── 탭 1: 기초 지식 ── */}
        {tab === 'basics' && (
          <div className="flex flex-col gap-6">

            {/* F1이란? */}
            <div className="bg-[var(--card)] rounded-2xl px-8 py-8 shadow-sm">
              <h2 className="text-lg font-black text-[var(--text)] mb-4">F1이란?</h2>
              <p className="text-sm text-[var(--muted)] leading-[1.9]">
                FIA가 주관하는 세계 최고 수준의 모터스포츠. 매 시즌 20여 국가에서 24개 그랑프리를 치릅니다.
                11개 팀·22명의 드라이버가 드라이버·컨스트럭터 두 챔피언십을 동시에 다툽니다.
                정교한 <Term id="powerunit">파워유닛</Term>과 <Term id="wingtype">에어로 윙</Term>을 장착한 머신이 시속 350km 이상으로 달립니다.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                {[
                  { label: '팀 수', value: '11개' },
                  { label: '드라이버', value: '22명' },
                  { label: '2026 레이스', value: '24개' },
                ].map(s => (
                  <div key={s.label} className="bg-[var(--bg-2)] rounded-xl py-5">
                    <p className="text-xl font-black text-[var(--accent)]">{s.value}</p>
                    <p className="text-xs text-[var(--muted)] mt-1.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 경기 주말 */}
            <div className="bg-[var(--card)] rounded-2xl px-8 py-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black text-[var(--text)]">경기 주말 형식</h2>
                <div className="flex rounded-lg border border-[var(--border)] overflow-hidden text-xs">
                  <button
                    onClick={() => setSprintView(false)}
                    className={`px-4 py-2 font-semibold transition-colors cursor-pointer ${!sprintView ? 'bg-[var(--accent)] text-white' : 'text-[var(--muted)]'}`}
                  >
                    일반
                  </button>
                  <button
                    onClick={() => setSprintView(true)}
                    className={`px-4 py-2 font-semibold transition-colors cursor-pointer ${sprintView ? 'bg-[var(--accent)] text-white' : 'text-[var(--muted)]'}`}
                  >
                    스프린트
                  </button>
                </div>
              </div>
              {sprintView && (
                <p className="text-sm text-[var(--muted)] mb-6 bg-[var(--bg-2)] rounded-xl px-4 py-3 leading-relaxed">
                  시즌 중 약 6회 GP에서 스프린트 형식으로 진행됩니다.
                </p>
              )}
              <div className="flex flex-col gap-5">
                {(sprintView ? WEEKEND_SPRINT : WEEKEND_STANDARD).map(day => (
                  <div key={day.day} className="flex gap-4">
                    <div className="w-16 flex-shrink-0">
                      <span className="text-xs font-bold text-[var(--accent)]">{day.day}</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      {day.sessions.map(s => (
                        <div key={s} className="flex items-start gap-2.5">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                          <p className="text-sm text-[var(--text)] leading-relaxed">{s}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 예선 형식 */}
            <div className="bg-[var(--card)] rounded-2xl px-8 py-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-lg font-black text-[var(--text)]">예선 (Qualifying)</h2>
                <span className="text-xs font-semibold bg-[var(--accent)]/15 text-[var(--accent)] px-2.5 py-1 rounded-full">2026 변경</span>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { round: 'Q1', time: '18분', elim: '전체 22대 → 하위 6대 탈락 (17~22위 그리드 확정)', color: 'text-[var(--muted)]' },
                  { round: 'Q2', time: '15분', elim: '16대 → 하위 6대 탈락 (11~16위 그리드 확정)', color: 'text-yellow-500' },
                  { round: 'Q3', time: '13분', elim: '상위 10대가 폴포지션 경쟁 (1~10위 그리드 확정)', color: 'text-[var(--accent)]' },
                ].map(q => (
                  <div key={q.round} className="flex gap-4 items-start bg-[var(--bg-2)] rounded-xl px-4 py-4">
                    <span className={`text-base font-black w-8 flex-shrink-0 ${q.color}`}>{q.round}</span>
                    <div>
                      <span className="text-sm font-bold text-[var(--text)]">{q.time}</span>
                      <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">{q.elim}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-[var(--muted)] bg-[var(--bg-2)] rounded-xl px-4 py-3 leading-relaxed">
                캐딜락 참가로 그리드 22대 → Q1·Q2 탈락 6대씩, Q3 13분으로 연장.
              </p>
            </div>

            {/* 포인트 시스템 */}
            <div className="bg-[var(--card)] rounded-2xl px-8 py-8 shadow-sm">
              <h2 className="text-lg font-black text-[var(--text)] mb-6">포인트 시스템</h2>
              <div className="grid grid-cols-5 gap-2">
                {POINTS_TABLE.map(({ pos, pts }) => (
                  <div
                    key={pos}
                    className={`flex flex-col items-center py-4 rounded-xl
                      ${pos === 1 ? 'bg-yellow-500/15 border border-yellow-500/30' :
                        pos === 2 ? 'bg-slate-400/10 border border-slate-400/20' :
                        pos === 3 ? 'bg-amber-600/10 border border-amber-600/20' :
                        'bg-[var(--bg-2)]'}`}
                  >
                    <span className={`text-xs font-bold
                      ${pos === 1 ? 'text-yellow-500' : pos === 2 ? 'text-slate-400' : pos === 3 ? 'text-amber-600' : 'text-[var(--muted)]'}`}>
                      P{pos}
                    </span>
                    <span className="text-lg font-black text-[var(--text)] mt-0.5">{pts}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-[var(--muted)] leading-relaxed">
                + 상위 10위 완주 + 최속 랩 기록 시 <strong>보너스 1점</strong> 추가.
              </p>
            </div>

            {/* 타이어 */}
            <div className="bg-[var(--card)] rounded-2xl px-8 py-8 shadow-sm">
              <h2 className="text-lg font-black text-[var(--text)] mb-1">타이어 종류</h2>
              <p className="text-xs text-[var(--muted)] mb-6">피렐리 공급 · 슬릭 5종 + 웨트 2종</p>
              <div className="flex flex-col gap-5 mb-7">
                {TIRES.map(t => (
                  <div key={t.name} className="flex items-start gap-4">
                    <span
                      className="w-9 h-9 min-w-9 min-h-9 rounded-full flex items-center justify-center text-xs font-black leading-none border border-black/10 flex-shrink-0"
                      style={{
                        backgroundColor: t.color,
                        color: t.mark === 'H' || t.mark === 'M' ? '#333' : '#fff',
                      }}
                    >
                      {t.mark}
                    </span>
                    <div className="pt-0.5">
                      <p className="text-sm font-bold text-[var(--text)]">{t.name}</p>
                      <p className="text-xs text-[var(--muted)] leading-relaxed mt-1">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-[var(--bg-2)] rounded-xl px-5 py-5 flex flex-col gap-3">
                <p className="text-xs font-bold text-[var(--accent)]">2026 시즌 주요 변경사항</p>
                <p className="text-xs text-[var(--muted)] leading-relaxed">· 규격 축소 — 앞 280mm · 뒤 375mm</p>
                <p className="text-xs text-[var(--muted)] leading-relaxed">· <Term id="tirecompound">C6</Term> 폐지 → C1~C5 슬릭 5종으로 간소화</p>
                <p className="text-xs text-[var(--muted)] leading-relaxed">· 외부 디자인 — 두꺼운 선 → 체크무늬 패턴</p>
              </div>
            </div>

          </div>
        )}

        {/* ── 탭 2: 팀 가이드 ── */}
        {tab === 'teams' && (
          <div className="flex flex-col gap-5">
            <p className="text-xs text-[var(--muted)] px-1">2026 시즌 참가 {ALL_TEAMS.length}개 팀</p>
            {TEAMS_GUIDE.map(team => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        )}

        {/* ── 탭 3: 드라이버 ── */}
        {tab === 'drivers' && (
          <div className="flex flex-col gap-5">

            {/* 그리드 소개 영상 — 개별 드라이버 커리어는 시즌마다 바뀌어서 텍스트 대신 영상 하나로 대체 */}
            <div className="bg-[var(--card)] rounded-2xl px-6 py-6 shadow-sm">
              <p className="text-sm font-black text-[var(--text)] mb-4">2026 시즌 드라이버 그리드 소개</p>
              <YoutubeThumbnail videoUrl={DRIVERS_GUIDE_VIDEO_URL} title="2026 시즌 드라이버 그리드 소개" />
            </div>

            <p className="text-xs text-[var(--muted)] px-1">2026 시즌 참가 {ALL_DRIVERS.length}명</p>
            <div className="bg-[var(--card)] rounded-2xl shadow-sm overflow-hidden divide-y divide-[var(--border)]">
              {ALL_TEAMS.map(team => (
                <div key={team.value} className="px-6 py-4">
                  <p className="text-xs font-bold mb-3" style={{ color: team.color }}>{team.label}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {ALL_DRIVERS.filter(d => d.team === team.value).map(driver => (
                      <div key={driver.value} className="flex items-center gap-3">
                        <div
                          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm text-white"
                          style={{ backgroundColor: driver.color }}
                        >
                          {driver.number || '-'}
                        </div>
                        <p className="text-sm font-bold text-[var(--text)] truncate">{driver.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 탭 4: 2026 규정 ── */}
        {tab === 'regulations' && (
          <div className="flex flex-col gap-6">

            {/* 헤더 */}
            <div className="bg-[var(--card)] rounded-2xl px-8 py-8 shadow-sm">
              <p className="text-xs font-semibold text-[var(--accent)] mb-2 tracking-widest uppercase">2026 Season</p>
              <h2 className="text-lg font-black text-[var(--text)] mb-4">2026 규정 변경</h2>
              <p className="text-sm text-[var(--muted)] leading-[1.9]">
                2022년 규정을 완전히 대체하는 새 기술 규정.<br />
                차량 소형화, <Term id="drs">DRS</Term> 폐지, 하이브리드 개편이 핵심입니다.
              </p>
            </div>

            {/* 차량 규격 변경 표 */}
            <div className="bg-[var(--card)] rounded-2xl px-8 py-8 shadow-sm">
              <h2 className="text-lg font-black text-[var(--text)] mb-6">차량 규격 주요 변경</h2>
              <div className="flex flex-col gap-3">
                {REGULATION_CHANGES.map((r, i) => (
                  <div key={i} className="grid grid-cols-[90px_1fr_24px_1fr] items-center gap-3 text-sm">
                    <span className="text-[var(--muted)] font-semibold text-xs">{r.label}</span>
                    <span className="bg-[var(--bg-2)] rounded-lg px-3 py-2.5 text-center text-[var(--text)] line-through opacity-35">{r.before}</span>
                    <span className="text-center text-[var(--muted)] text-xs">→</span>
                    <span className="bg-[var(--accent)]/10 text-[var(--accent)] rounded-lg px-3 py-2.5 text-center font-bold">{r.after}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 에어로다이나믹 */}
            <div className="bg-[var(--card)] rounded-2xl px-8 py-8 shadow-sm">
              <h2 className="text-lg font-black text-[var(--text)] mb-3">에어로다이나믹</h2>
              <p className="text-sm text-[var(--muted)] leading-[1.9] mb-6">
                <strong className="text-[var(--text)]"><Term id="outwash">아웃워시</Term> → <Term id="inwash">인워시</Term></strong> 컨셉으로 전환.{' '}
                <Term id="dirtyair">더티 에어</Term>를 줄여 근접 추월이 더 쉬워집니다.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[var(--bg-2)] rounded-xl py-6 text-center">
                  <p className="text-2xl font-black text-[var(--accent)]">약 33%</p>
                  <p className="text-xs font-semibold text-[var(--text)] mt-2">
                    <Term id="downforce">다운포스</Term> 감소
                  </p>
                  <p className="text-xs text-[var(--muted)] mt-1">2022 규정 대비</p>
                </div>
                <div className="bg-[var(--bg-2)] rounded-xl py-6 text-center">
                  <p className="text-2xl font-black text-[var(--accent)]">약 55%</p>
                  <p className="text-xs font-semibold text-[var(--text)] mt-2">
                    <Term id="drag">드래그</Term> 감소
                  </p>
                  <p className="text-xs text-[var(--muted)] mt-1">2022 규정 대비</p>
                </div>
              </div>
              <div className="bg-[var(--bg-2)] rounded-xl px-5 py-5 flex flex-col gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="mt-2 w-1 h-1 rounded-full bg-[var(--muted)] flex-shrink-0 opacity-60" />
                  <p className="text-sm text-[var(--muted)]">파워유닛 엔진 : 모터 출력 비율 약 55:45</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="mt-2 w-1 h-1 rounded-full bg-[var(--muted)] flex-shrink-0 opacity-60" />
                  <p className="text-sm text-[var(--muted)]">
                    프런트·리어 <Term id="wingflap">윙 플랩</Term> 3개로 변경, 하단 <Term id="beamwing">빔 윙</Term> 삭제
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="mt-2 w-1 h-1 rounded-full bg-[var(--muted)] flex-shrink-0 opacity-60" />
                  <p className="text-sm text-[var(--muted)]">
                    <Term id="sidepod">사이드팟</Term> 앞 &lsquo;<Term id="wheelwake">인워싱 휠 웨이크 제어 보드</Term>&rsquo; 신설
                  </p>
                </div>
              </div>
            </div>

            {/* 추월 시스템 */}
            <div className="bg-[var(--card)] rounded-2xl px-8 py-8 shadow-sm">
              <h2 className="text-lg font-black text-[var(--text)] mb-3">추월 시스템 — DRS 폐지</h2>
              <p className="text-sm text-[var(--muted)] leading-[1.9] mb-6">
                DRS가 폐지되고{' '}
                <Term id="activeaero">액티브 에어로 시스템</Term>으로 대체됩니다.
                전·후 윙 가변 플랩이 주행 상황에 따라 자동 조정됩니다.
              </p>
              <div className="flex flex-col gap-4">

                {/* 코너 모드 */}
                <div className="bg-[var(--bg-2)] rounded-xl px-5 py-5 border-l-4 border-l-slate-400">
                  <div className="flex items-center gap-2 mb-2.5">
                    <p className="text-sm font-bold text-[var(--text)]">코너 모드</p>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-500/15 text-slate-400">기본 적용</span>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    최대 다운포스로 코너링 안정성 확보. 평상시 항상 적용되는 기본 모드.
                  </p>
                </div>

                {/* 스트레이트-라인 모드 */}
                <div className="bg-[var(--bg-2)] rounded-xl px-5 py-5 border-l-4 border-l-blue-400">
                  <div className="flex items-center gap-2 mb-2.5">
                    <p className="text-sm font-bold text-[var(--text)]"><Term id="straightline">스트레이트-라인 모드</Term></p>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400">직선 구간</span>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    윙 플랩 각도를 줄여 드래그 감소.
                    앞차 간격 제약 없이 지정 구간에서 사용 가능해 DRS보다 자유롭습니다.
                  </p>
                </div>

                {/* 오버테이크 모드 */}
                <div className="bg-[var(--bg-2)] rounded-xl px-5 py-5 border-l-4 border-l-red-400">
                  <div className="flex items-center gap-2 mb-2.5">
                    <p className="text-sm font-bold text-[var(--text)]"><Term id="overtakemode">오버테이크 모드</Term></p>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400">1초 이내</span>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    앞차 1초 이내 간격 시 <Term id="ers">ERS</Term>를 추가 공급해 추월을 돕습니다.{' '}
                    DRS를 대체하는 핵심 장치.
                  </p>
                </div>

              </div>
            </div>

            {/* 파워유닛 */}
            <div className="bg-[var(--card)] rounded-2xl px-8 py-8 shadow-sm">
              <h2 className="text-lg font-black text-[var(--text)] mb-4">파워유닛</h2>
              <p className="text-sm text-[var(--muted)] leading-[1.9]">
                <strong className="text-[var(--text)]">V6 1.6L 터보</strong>는 유지.{' '}
                <Term id="mguh">MGU-H</Term> 폐지, <Term id="mguk">MGU-K</Term>만 남아{' '}
                전력 생산이 120kW → <strong className="text-[var(--text)]">350kW</strong>로 대폭 증가합니다.
                엔진 출력은 약 540마력.
              </p>
            </div>

            {/* 타이어 */}
            <div className="bg-[var(--card)] rounded-2xl px-8 py-8 shadow-sm">
              <h2 className="text-lg font-black text-[var(--text)] mb-5">타이어 규정 변경</h2>
              <div className="flex flex-col gap-4">
                {REGULATION_TIRE_CHANGES.map((t, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-black flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-[var(--muted)] leading-relaxed pt-0.5">{t}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 안전 규정 */}
            <div className="bg-[var(--card)] rounded-2xl px-8 py-8 shadow-sm">
              <h2 className="text-lg font-black text-[var(--text)] mb-5">안전 규정</h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-black flex items-center justify-center mt-0.5">1</span>
                  <p className="text-sm text-[var(--muted)] leading-relaxed pt-0.5">전면·측면 충돌 테스트 기준 강화</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-black flex items-center justify-center mt-0.5">2</span>
                  <p className="text-sm text-[var(--muted)] leading-relaxed pt-0.5">
                    <Term id="rollhoop">롤 후프</Term> 강도 기준 강화
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-black flex items-center justify-center mt-0.5">3</span>
                  <p className="text-sm text-[var(--muted)] leading-relaxed pt-0.5">
                    ERS 상태 식별 안전 LED — 온보드 카메라에 설치
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </main>
  )
}
