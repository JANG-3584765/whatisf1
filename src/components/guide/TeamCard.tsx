import { Titillium_Web } from 'next/font/google'
import type { TeamGuide } from '@/data/2026Guide'
import YoutubeThumbnail from '@/components/ui/YoutubeThumbnail'

// F1 공식 폰트(Formula1 Display/Wide)는 라이선스가 없어 쓸 수 없어서 실제 F1 공식 사이트도 쓰는 오픈소스 폰트로 대체
// (next/font/google로 이 컴포넌트에서만 자체 호스팅 — 이 파일만 쓰는 폰트라 layout.tsx 전역이 아닌 여기서 선언)
// 한글엔 이 폰트에 글리프가 없어서 Pretendard로 자동 폴백되도록 순서를 둠
const titilliumWeb = Titillium_Web({ weight: ['600', '700', '900'], subsets: ['latin'], display: 'swap' })
const CARD_FONT = `${titilliumWeb.style.fontFamily}, 'Pretendard Variable', sans-serif`

export default function TeamCard({ team }: { team: TeamGuide }) {
  // srgb 공간에서 어둡게 섞으면 주황·노랑 계열이 갈색으로 뭉개져 보여서, 색조가 덜 틀어지는 oklch 공간에서 섞음
  const bgColor = `color-mix(in oklch, ${team.color} 80%, black)`

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-sm text-white"
      style={{ backgroundColor: bgColor, fontFamily: CARD_FONT }}
    >
      {/* 1~3: 팀 이름 + 닉네임 */}
      <div className="px-6 pt-6 pb-5 border-b border-white/20 text-center">
        <h3 className="text-2xl font-bold tracking-wide uppercase">{team.name}</h3>
        <p className="text-xs font-semibold text-white/70 mt-1 tracking-widest">{team.nickname}</p>
      </div>

      <div className="grid grid-cols-3 divide-x divide-white/20 border-b border-white/20">
        {/* 4: 챔피언 */}
        <div className="px-4 py-4 flex flex-col justify-center gap-2 text-center">
          {[
            { label: '드라이버 챔피언',    data: team.driverChampionships },
            { label: '컨스트럭터 챔피언', data: team.constructorChampionships },
          ].map(c => (
            <div key={c.label}>
              <p className="text-lg font-bold">{c.data.count}</p>
              <p className="text-[10px] text-white/70">{c.label}</p>
              {c.data.years.length > 0 && (
                <p className="text-[9px] text-white/50 mt-0.5 leading-tight">
                  {c.data.years.join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* 5: 팀 연혁 */}
        <div className="px-4 py-4 flex flex-col justify-center gap-1 text-center">
          <p className="text-[10px] text-white/70 mb-1">팀 연혁</p>
          {team.lineage.map((entry, i) => (
            <p key={i} className="text-[11px] leading-tight">
              {entry.name} <span className="text-white/60">{entry.period}</span>
            </p>
          ))}
        </div>

        {/* 6: 유튜브 링크 — 썸네일 클릭 시 모달로 크게 재생 (highlights 페이지와 동일 패턴) */}
        <div className="px-4 py-4 flex flex-col justify-center items-center text-center">
          {team.youtubeUrl ? (
            <YoutubeThumbnail videoUrl={team.youtubeUrl} title={`${team.name} 입문 영상`} />
          ) : (
            <p className="text-[10px] text-white/50">입문용 영상 준비 중</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-white/20 border-b border-white/20 text-center">
        {/* 7: 섀시/엔진 */}
        <div className="px-4 py-4 flex flex-col justify-center gap-2">
          <div>
            <p className="text-sm font-bold truncate">{team.chassis || '-'}</p>
            <p className="text-[10px] text-white/70">섀시</p>
          </div>
          <div>
            <p className="text-[11px] font-bold leading-tight">{team.engineFull}</p>
            <p className="text-[10px] text-white/70 mt-0.5">엔진</p>
          </div>
        </div>

        {/* 8: 레이스 통계 */}
        <div className="px-4 py-4 grid grid-cols-2 gap-2">
          {[
            { label: '레이스 우승', value: team.raceWins },
            { label: '포디움', value: team.podiums },
            { label: '폴 포지션', value: team.poles },
            { label: '패스티스트랩', value: team.fastestLaps },
          ].map(s => (
            <div key={s.label}>
              <p className="text-sm font-bold">{s.value}</p>
              <p className="text-[9px] text-white/70">{s.label}</p>
            </div>
          ))}
        </div>

        {/* 9: 최근 시즌 성적 */}
        <div className="px-4 py-4 flex flex-col justify-center">
          {team.recentSeasonResult.season ? (
            <>
              <p className="text-sm font-bold">{team.recentSeasonResult.season}</p>
              <p className="text-xs">{team.recentSeasonResult.position}위 · {team.recentSeasonResult.points}pt</p>
            </>
          ) : (
            <p className="text-sm font-bold">-</p>
          )}
          <p className="text-[10px] text-white/70 mt-1">최근 시즌 성적</p>
        </div>
      </div>

      {/* 10~12: tag + description */}
      <div className="px-6 py-5 text-center">
        <p className="text-xs font-bold mb-2">{team.tag}</p>
        <p className="text-[11px] text-white/80 leading-relaxed whitespace-pre-line">{team.description}</p>
      </div>
    </div>
  )
}
