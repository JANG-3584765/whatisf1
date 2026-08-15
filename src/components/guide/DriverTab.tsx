import { DRIVERS_GUIDE_VIDEO_URL } from '@/data/2026Guide'
import { ALL_TEAMS, ALL_DRIVERS } from '@/data/2026Roster'
import YoutubeThumbnail from '@/components/ui/YoutubeThumbnail'

export default function DriversTab() {
  return (
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
  )
}
