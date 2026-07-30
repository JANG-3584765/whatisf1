import { ALL_TEAMS } from './2026Roster'

export interface ChampionshipRecord {
  count: number
  years: number[] // 최신순 정렬
}

export interface RecentSeasonResult {
  season: number
  position: number
  points: number
}

export interface LineageEntry {
  name: string
  period: string
}

export interface TeamGuide {
  id: string
  name: string
  color: string
  nickname: string
  lineage: LineageEntry[]
  chassis: string
  engineFull: string
  driverChampionships: ChampionshipRecord
  constructorChampionships: ChampionshipRecord
  raceWins: number
  podiums: number
  poles: number
  fastestLaps: number
  recentSeasonResult: RecentSeasonResult
  tag: string
  description: string
  youtubeUrl: string
}

interface TeamExtra {
  nickname: string
  lineage: LineageEntry[]
  chassis: string
  engineFull: string
  driverChampionships: ChampionshipRecord
  constructorChampionships: ChampionshipRecord
  raceWins: number
  podiums: number
  poles: number
  fastestLaps: number
  recentSeasonResult: RecentSeasonResult
  tag: string
  description: string
  youtubeUrl: string
}

// 팀 이름·색은 2026Roster.ts(ALL_TEAMS)가 원본. 여기선 가이드 전용 정보만 관리.
const TEAM_EXTRAS: Record<string, TeamExtra> = {
  mclaren: {
    nickname: 'TEAM PAPAYA',
    lineage: [{ name: '맥라렌', period: '1963~' }],
    chassis: 'MCL40',
    engineFull: '메르세데스-AMG F1 M17 E 퍼포먼스',
    driverChampionships: {
      count: 13,
      years: [2025, 2008, 1999, 1998, 1991, 1990, 1989, 1988, 1986, 1985, 1984, 1976, 1974],
    },
    constructorChampionships: {
      count: 10,
      years: [2025, 2024, 1998, 1991, 1990, 1989, 1988, 1985, 1984, 1974],
    },
    raceWins: 203,
    podiums: 558,
    poles: 177,
    fastestLaps: 183,
    recentSeasonResult: { season: 2025, position: 1, points: 833 },
    tag: '유구한 역사와 함께 영건 드라이버로 성공적인 세대교체를 이룬 대표적인 명문 팀',
    description:
      '2024-2025 2연속 컨스트럭터 챔피언, 2025 드라이버 챔피언(랜도 노리스)\n이타적인 팀 컬러, 완벽주의',
    youtubeUrl: 'https://www.youtube.com/watch?v=CeTLOvkF6oI',
  },
  ferrari: {
    nickname: 'EssereFerrari | ForzaFerrari',
    lineage: [{ name: '스쿠데리아 페라리', period: '1929~' }],
    chassis: '페라리 SF-26',
    engineFull: '페라리 067/6',
    driverChampionships: {
      count: 15,
      years: [2007, 2004, 2003, 2002, 2001, 2000, 1979, 1977, 1975, 1964, 1961, 1958, 1956, 1953, 1952],
    },
    constructorChampionships: {
      count: 16,
      years: [2008, 2007, 2004, 2003, 2002, 2001, 2000, 1999, 1983, 1982, 1979, 1977, 1976, 1975, 1964, 1961],
    },
    raceWins: 250,
    podiums: 645,
    poles: 254,
    fastestLaps: 264,
    recentSeasonResult: { season: 2025, position: 4, points: 398 },
    tag: '원년 멤버이자 최고의 역사를 지닌 명문 팀',
    description:
      '역대 최다 컨스트럭터 우승(16회)과 최다 드라이버 챔피언(15회)\n이탈리아에는 두 종교가 있다. 기독교, 그리고 페라리',
    youtubeUrl: 'https://www.youtube.com/watch?v=jsYchjFcZ68',
  },
  mercedes: {
    nickname: 'DYNASTY',
    lineage: [
      { name: '다임러-벤츠 AG', period: '1954~1955' },
      { name: '마트라 인터내셔널', period: '1968~1969' },
      { name: '티렐 레이싱', period: '1970~1998' },
      { name: '브리티시 아메리칸 레이싱', period: '1999' },
      { name: '럭키 스트라이크 BAR 혼다', period: '2000~2005' },
      { name: '혼다 레이싱 F1', period: '2006~2008' },
      { name: '브런 GP', period: '2009' },
      { name: '메르세데스 AMG', period: '2010~' },
    ],
    chassis: 'F1 W17 E 퍼포먼스',
    engineFull: '메르세데스-AMG F1 M17 E 퍼포먼스',
    driverChampionships: {
      count: 9,
      years: [2020, 2019, 2018, 2017, 2016, 2015, 2014, 1955, 1954],
    },
    constructorChampionships: {
      count: 8,
      years: [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014],
    },
    raceWins: 132,
    podiums: 312,
    poles: 145,
    fastestLaps: 115,
    recentSeasonResult: { season: 2025, position: 2, points: 469 },
    tag: '화려한 부활을 꿈꾸는 은빛 화살',
    description:
      '2014~2021 8연속 컨스트럭터 챔피언.\n압도적인 엔진 성능과 최강급 드라이버 조합으로 현재 가장 강력한 우승 후보',
    youtubeUrl: 'https://www.youtube.com/watch?v=GsGfviwwEp0',
  },
  redbull: {
    nickname: '레드불, 날개를 펼쳐줘요!',
    lineage: [
      { name: '스튜어트 그랑프리', period: '1997~1999' },
      { name: '재규어 레이싱', period: '2000~2004' },
      { name: '레드불 레이싱', period: '2005~' },
    ],
    chassis: 'RB22',
    engineFull: '레드불 포드 DM01',
    driverChampionships: {
      count: 8,
      years: [2024, 2023, 2022, 2021, 2013, 2012, 2011, 2010],
    },
    constructorChampionships: {
      count: 6,
      years: [2023, 2022, 2013, 2012, 2011, 2010],
    },
    raceWins: 130,
    podiums: 297,
    poles: 111,
    fastestLaps: 102,
    recentSeasonResult: { season: 2025, position: 3, points: 451 },
    tag: '그리드 최강의 황소',
    description:
      '현재 최고의 4연속 드라이버 챔피언팀(막스 베르스타펜:2021~2024)\n독특한 파훼법으로 전통 강호를 이겨내는 반항적인 컨스트럭터',
    youtubeUrl: 'https://www.youtube.com/watch?v=9OlufBCHZZc',
  },
  williams: {
    nickname: 'WEAREWILLIAMS',
    lineage: [
      { name: '프랭크 윌리엄스 레이싱 카즈', period: '1966~1975' },
      { name: '울프-윌리엄스 레이싱', period: '1976' },
      { name: '윌리엄스 F1 팀', period: '1977~' },
    ],
    chassis: 'FW48',
    engineFull: '메르세데스-AMG F1 M17 E 퍼포먼스',
    driverChampionships: {
      count: 7,
      years: [1997, 1996, 1993, 1992, 1987, 1982, 1980],
    },
    constructorChampionships: {
      count: 9,
      years: [1997, 1996, 1994, 1993, 1992, 1987, 1986, 1981, 1980],
    },
    raceWins: 114,
    podiums: 315,
    poles: 128,
    fastestLaps: 134,
    recentSeasonResult: { season: 2025, position: 5, points: 137 },
    tag: '재건과 부활을 노리는 전통 명가',
    description:
      '1980~90년대 만셀·힐과 함께 9번의 타이틀을 차지한 명문\n팀과 함께 화려한 부활을 꿈꾸는 드라이버 조합(사인츠, 알본)',
    youtubeUrl: 'https://www.youtube.com/watch?v=xoS75ZOucBU',
  },
  astonmartin: {
    nickname: 'INTENSITY.DRIVEN',
    lineage: [
      { name: '애스턴 마틴', period: '1959~1960' },
      { name: '레이싱 포인트 포스 인디아', period: '2018' },
      { name: '레이싱 포인트', period: '2019~2020' },
      { name: '애스턴 마틴', period: '2021~' },
    ],
    chassis: 'AMR26',
    engineFull: '혼다 RA626H',
    driverChampionships: { count: 0, years: [] },
    constructorChampionships: { count: 0, years: [] },
    raceWins: 1,
    podiums: 12,
    poles: 1,
    fastestLaps: 3,
    recentSeasonResult: { season: 2025, position: 7, points: 89 },
    tag: '상위권으로 도약을 꿈꾸는 도깨비팀',
    description:
      '럭셔리 브랜드답게 진중하고 고풍스러운 팀 컬러\n전설적인 드라이버 알론소와 함께 혁신을 바라보는 컨스트럭터',
    youtubeUrl: 'https://www.youtube.com/watch?v=MkUvpJd-bow',
  },
  rb: {
    nickname: 'ENTERING A NEW ERA',
    lineage: [
      { name: '미나르디', period: '1985~2005' },
      { name: '스쿠데리아 토로 로쏘', period: '2006~2019' },
      { name: '스쿠데리아 알파타우리', period: '2020~2023' },
      { name: '레이싱 불스', period: '2024~' },
    ],
    chassis: 'VCARB 03',
    engineFull: '레드불 포드 DM01',
    driverChampionships: { count: 0, years: [] },
    constructorChampionships: { count: 0, years: [] },
    raceWins: 2,
    podiums: 6,
    poles: 1,
    fastestLaps: 1,
    recentSeasonResult: { season: 2025, position: 6, points: 92 },
    tag: '레드불 유스팀? 독자적인 컨스트럭터의 언더독',
    description:
      '적은 자본으로도 파워 유닛을 제외한 에어로 파츠를 모두 스스로 제작하며 묵묵히 그리드를 지키는 컨스트럭터\n유망주들의 성지',
    youtubeUrl: 'https://www.youtube.com/watch?v=-sIziBlY8YA',
  },
  haas: {
    nickname: 'NOTHING IS IMPOSSIBLE',
    lineage: [{ name: '하스 F1 팀', period: '2014~' }],
    chassis: 'VF-26',
    engineFull: '페라리 067/6',
    driverChampionships: { count: 0, years: [] },
    constructorChampionships: { count: 0, years: [] },
    raceWins: 0,
    podiums: 0,
    poles: 1,
    fastestLaps: 3,
    recentSeasonResult: { season: 2025, position: 8, points: 79 },
    tag: '2010년대 독립 컨스트럭터 중 유일한 생존자',
    description:
      '본능의 질주로 유명해진 컨스트럭터\n토요타의 지원 아래 페라리 파워 유닛 의존도를 줄이고자 노력 중',
    youtubeUrl: 'https://www.youtube.com/watch?v=ui6Zrr004rU',
  },
  audi: {
    nickname: 'TO START SOMETHING, STOP AT NOTHING',
    lineage: [
      { name: '아우토 우니온 렌나프타일룽', period: '1933~1939' },
      { name: '자우버', period: '1993~2005' },
      { name: 'BMW 자우버', period: '2006~2010' },
      { name: '자우버', period: '2011~2017' },
      { name: '알파 로메오 자우버', period: '2018' },
      { name: '알파 로메오', period: '2019~2023' },
      { name: '스테이크 팀 킥 자우버', period: '2024~2025' },
      { name: '아우디 레볼루트', period: '2026~' },
    ],
    chassis: 'R26',
    engineFull: '아우디 AFR 26 하이브리드',
    driverChampionships: { count: 0, years: [] },
    constructorChampionships: { count: 0, years: [] },
    raceWins: 0,
    podiums: 0,
    poles: 0,
    fastestLaps: 0,
    recentSeasonResult: { season: 0, position: 0, points: 0 },
    tag: '87년 만에 트랙으로 귀환한 은빛 섀시',
    description:
      '큰 그림을 그리며 찬란한 미래를 꿈꾸는 컨스트럭터\n자우버/알파로메오 팀을 인수해 2026년 자체 파워유닛으로 F1에 공식 참가',
    youtubeUrl: 'https://www.youtube.com/watch?v=BZtQnKfNNLE',
  },
  alpine: {
    nickname: 'RISE / HIGHER',
    lineage: [
      { name: '톨만 그룹 모터스포트', period: '1981~1985' },
      { name: '베네통', period: '1986~2001' },
      { name: '르노', period: '2002~2010' },
      { name: '로터스-르노', period: '2011' },
      { name: '로터스', period: '2012~2015' },
      { name: '르노', period: '2016~2020' },
      { name: '알핀', period: '2021~' },
    ],
    chassis: 'A526',
    engineFull: '메르세데스-AMG F1 M17 E 퍼포먼스',
    driverChampionships: {
      count: 4,
      years: [2006, 2005, 1995, 1994],
    },
    constructorChampionships: {
      count: 3,
      years: [2006, 2005, 1995],
    },
    raceWins: 1,
    podiums: 6,
    poles: 0,
    fastestLaps: 1,
    recentSeasonResult: { season: 2025, position: 10, points: 22 },
    tag: '과거의 영광을 재현하고자 하는 프랑스 대표팀',
    description:
      '미하엘 슈마허와 1994, 1995 시즌을 석권한 베네통을 인수\n페르난도 알론소와 2년 연속 컨스트럭터, 드라이버 챔피언십 우승(2005~2006)을 경험한 르노의 전신',
    youtubeUrl: 'https://www.youtube.com/watch?v=FyPDOAVFU7o',
  },
  cadillac: {
    nickname: 'The mission begins now',
    lineage: [{ name: '캐딜락 F1 팀', period: '2026~' }],
    chassis: 'MAC-26',
    engineFull: '페라리 067/6',
    driverChampionships: { count: 0, years: [] },
    constructorChampionships: { count: 0, years: [] },
    raceWins: 0,
    podiums: 0,
    poles: 0,
    fastestLaps: 0,
    recentSeasonResult: { season: 0, position: 0, points: 0 },
    tag: '2026 신규 참가',
    description:
      '페라리, 알핀, 애스턴 마틴에 이어 4번째로 F1과 하이퍼카 클래스에 모두 참가하게 된 제조사\n챔피언 경력의 페레스·보타스. 두 베테랑의 도전',
    youtubeUrl: 'https://www.youtube.com/watch?v=UaCDnw_S7uk&t=181s',
  },
}

export const TEAMS_GUIDE: TeamGuide[] = Object.entries(TEAM_EXTRAS).map(([id, extra]) => {
  const base = ALL_TEAMS.find(t => t.value === id)!
  return {
    id,
    name: base.label,
    color: base.color,
    ...extra,
  }
})

// 드라이버 입문 가이드 영상 — 24명 전원 개별 소개 대신 그리드 전체를 소개하는 영상 하나로 대체
// (드라이버 커리어는 이적·순위 등으로 시즌마다 바뀌어서 텍스트로 유지보수하기 번거로움)
export const DRIVERS_GUIDE_VIDEO_URL = 'https://www.youtube.com/watch?si=NktfYf0SpkWNSI5o&v=qsIR4mFrPDA&feature=youtu.be'
