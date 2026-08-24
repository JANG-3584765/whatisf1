'use client'

import { useState } from 'react'
import BasicTab from '@/components/guide/BasicTab'
import TeamTab from '@/components/guide/TeamTab'
import DriverTab from '@/components/guide/DriverTab'
import RegulationTab from '@/components/guide/RegulationTab'

type Tab = 'basics' | 'teams' | 'drivers' | 'regulations'

const TABS: { key: Tab; label: string }[] = [
  { key: 'basics',      label: '기초 지식' },
  { key: 'teams',       label: '팀 가이드' },
  { key: 'drivers',     label: '드라이버 가이드' },
  { key: 'regulations', label: '2026 규정' },
]

export default function GuidePage() {
  const [tab, setTab] = useState<Tab>('basics')

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

        {tab === 'basics' && <BasicTab />}
        {tab === 'teams' && <TeamTab />}
        {tab === 'drivers' && <DriverTab />}
        {tab === 'regulations' && <RegulationTab />}


      </div>
    </main>
  )
}
