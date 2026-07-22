import { getTeamColor, DEFAULT_TEAM_COLOR } from '@/lib/teamColors'

const TEAM_BASE = [
  { value: 'mclaren',     label: '맥라렌' },
  { value: 'mercedes',    label: '메르세데스' },
  { value: 'redbull',     label: '레드불' },
  { value: 'ferrari',     label: '페라리' },
  { value: 'williams',    label: '윌리엄스' },
  { value: 'rb',          label: '레이싱 불스' },
  { value: 'astonmartin', label: '애스턴 마틴' },
  { value: 'haas',        label: '하스' },
  { value: 'audi',        label: '아우디' },
  { value: 'alpine',      label: '알핀' },
  { value: 'cadillac',    label: '캐딜락' },
]

export const ALL_TEAMS = TEAM_BASE.map(t => ({ ...t, color: getTeamColor(t.label) }))

// 팀 value로 ALL_TEAMS에서 색을 찾아주는 함수. 못 찾으면 회색.
function teamColorOf(team: string): string {
  return ALL_TEAMS.find(t => t.value === team)?.color ?? DEFAULT_TEAM_COLOR
}

// number: 0은 아직 조사 안 된 자리표시자. 확인되는 대로 실제 등번호로 채울 것.
const DRIVER_BASE = [
  { value: 'verstappen',  label: '막스 베르스타펜',       team: 'redbull',     number: 3 },
  { value: 'hadjar',      label: '아이작 하자르',         team: 'redbull',     number: 6 },
  { value: 'norris',      label: '랜도 노리스',           team: 'mclaren',     number: 1 },
  { value: 'piastri',     label: '오스카 피아스트리',     team: 'mclaren',     number: 81 },
  { value: 'leclerc',     label: '샤를 르클레르',         team: 'ferrari',     number: 16 },
  { value: 'hamilton',    label: '루이스 해밀턴',         team: 'ferrari',     number: 44 },
  { value: 'russell',     label: '조지 러셀',             team: 'mercedes',    number: 63 },
  { value: 'antonelli',   label: '키미 안토넬리',         team: 'mercedes',    number: 12 },
  { value: 'albon',       label: '알렉스 알본',           team: 'williams',    number: 23 },
  { value: 'sainz',       label: '카를로스 사인츠',       team: 'williams',    number: 55 },
  { value: 'lindblad',    label: '아비드 린드블라드',     team: 'rb',          number: 41 },
  { value: 'lawson',      label: '리암 로슨',             team: 'rb',          number: 30 },
  { value: 'alonso',      label: '페르난도 알론소',       team: 'astonmartin', number: 14 },
  { value: 'stroll',      label: '랜스 스트롤',           team: 'astonmartin', number: 18 },
  { value: 'ocon',        label: '에스테반 오콘',         team: 'haas',        number: 31 },
  { value: 'bearman',     label: '올리버 베어먼',         team: 'haas',        number: 87 },
  { value: 'hulkenberg',  label: '니코 휠켄베르크',       team: 'audi',        number: 27 },
  { value: 'bortoleto',   label: '가브리에우 보르톨레투', team: 'audi',        number: 5 },
  { value: 'gasly',       label: '피에르 가슬리',         team: 'alpine',      number: 10 },
  { value: 'colapinto',   label: '프랑코 콜라핀토',       team: 'alpine',      number: 43 },
  { value: 'perez',       label: '세르히오 페레스',       team: 'cadillac',    number: 11 },
  { value: 'bottas',      label: '발테리 보타스',         team: 'cadillac',    number: 77 },
  { value: 'crawford',    label: '잭 크로포드',           team: 'astonmartin', number: 0 },
  { value: 'herta',       label: '콜튼 헤르타',           team: 'cadillac',    number: 0 },
]

export const ALL_DRIVERS = DRIVER_BASE.map(d => ({ ...d, color: teamColorOf(d.team) }))
