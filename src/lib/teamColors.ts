// 사용처: f1ResultsApi.ts, f1StandingsApi.ts, manualRaceData.ts
// 전 시즌 데이터를 위한 파일
export const TEAM_COLORS: Record<string, string> = {
  '레드불':      '#3671C6',
  '맥라렌':      '#FF8000',
  '페라리':      '#E8002D',
  '메르세데스':  '#00D2BE',
  '애스턴 마틴': '#229971',
  '알핀':        '#0090D4',
  '윌리엄스':    '#005AFF',
  '레이싱 불스': '#6692FF',
  '하스':        '#B91D1D',
  '아우디':      '#9E9E9E',
  '캐딜락':      '#C41E3A',
}

// 표(TEAM_COLORS)에 없는 팀 이름이 들어왔을 때 대신 쓸 기본 색(회색)
export const DEFAULT_TEAM_COLOR = '#888888'

// 팀 이름을 넣으면 색을 돌려주는 함수.
// 표에 있으면 그 색, 없으면 기본 회색을 돌려줌.
export function getTeamColor(name: string): string {
  return TEAM_COLORS[name] ?? DEFAULT_TEAM_COLOR
}
