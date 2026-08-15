'use client'

import { useState } from 'react'
import Term from '@/components/ui/Term'

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

export default function BasicsTab() {
  const [sprintView, setSprintView] = useState(false)

  return (
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
  )
}
