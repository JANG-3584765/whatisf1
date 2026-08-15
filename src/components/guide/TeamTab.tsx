import { TEAMS_GUIDE } from '@/data/2026Guide'
import { ALL_TEAMS } from '@/data/2026Roster'
import TeamCard from './TeamCard'

export default function TeamsTab() {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-xs text-[var(--muted)] px-1">2026 시즌 참가 {ALL_TEAMS.length}개 팀</p>
      {TEAMS_GUIDE.map(team => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  )
}
