import { ALL_TEAMS, ALL_DRIVERS } from './2026Roster'

export interface ChampionshipRecord {
  count: number
  years: number[] // 최신순 정렬
}

export interface RecentSeasonResult {
  season: number
  position: number
  points: number
}

export interface TeamGuide {
  id: string
  name: string
  color: string
  nickname: string
  base: string
  founded: string
  chassis: string
  engine: string
  engineFull: string
  drivers: string[]
  driverChampionships: ChampionshipRecord
  constructorChampionships: ChampionshipRecord
  raceWins: number
  podiums: number
  poles: number
  fastestLaps: number
  recentSeasonResult: RecentSeasonResult
  tag: string
  description: string
  note?: string
}

export interface DriverGuide {
  id: string
  name: string
  nameEn: string
  teamId: string
  teamName: string
  teamColor: string
  nationality: string
  flag: string
  number: number
  championships: number
  bio: string
  highlight: string
}

interface TeamExtra {
  nickname: string
  base: string
  founded: string
  chassis: string
  engine: string
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
  note?: string
}

// 팀 이름·색은 2026Roster.ts(ALL_TEAMS)가 원본. 여기선 가이드 전용 정보만 관리.
// chassis/engineFull ''(빈 문자열), count/years/raceWins/podiums/poles/fastestLaps 0·[]은 아직 조사 안 된 자리표시자.
const TEAM_EXTRAS: Record<string, TeamExtra> = {
  mclaren: {
    nickname: 'PAPAYA',
    base: '영국',
    founded: '1963',
    chassis: 'MCL40',
    engine: 'Mercedes',
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
    tag: '2024-2025 2연속 컨스트럭터 챔피언, 2025 드라이버 챔피언(랜도 노리스)',
    description:
      '유구한 역사와 함께 영건 드라이버로 성공적인 세대교체를 이룬 대표적인 명문 팀\n팬들과 소통을 중요시하며 팀을 우선시하고 미래적인 분위기의 팩토리에서 보이는 완벽주의 추구',
  },
  ferrari: {
    nickname: '',
    base: '이탈리아',
    founded: '1929 · 1950',
    chassis: 'SF-26',
    engine: 'Ferrari',
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
    tag: '최다 우승팀',
    description:
      '역대 최다 컨스트럭터 우승(16회).\n2025년 해밀턴 영입으로 전 세계 팬들의 기대가 집중됐습니다.',
    note: 'ferrari_lineage',
  },
  mercedes: {
    nickname: 'DYNASTY',
    base: '영국',
    founded: '1954 · 1968 · 2010',
    chassis: 'F1 W17',
    engine: 'Mercedes',
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
      '2014~2021 8연속 컨스트럭터 챔피언.\n해밀턴 이적 후 러셀·안토넬리 체제로 재건 중입니다.',
    note: 'mercedes_lineage',
  },
  redbull: {
    nickname: '',
    base: '영국',
    founded: '1997 · 2005',
    chassis: 'RB22',
    engine: 'Red Bull Ford',
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
    tag: '4연속 챔피언',
    description:
      '베르스타펜의 4연속 드라이버 챔피언팀.\n2022~2023 시즌 21승으로 역대급 지배력을 보여줬습니다.',
    note: 'redbull_lineage',
  },
  williams: {
    nickname: '',
    base: '영국',
    founded: '1966 · 1977',
    chassis: 'FW48',
    engine: 'Mercedes',
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
    tag: '명문 부활 도전',
    description:
      '1980~90년대 만셀·힐과 함께 9번의 타이틀을 차지한 명문.\n사인츠 영입으로 재도약을 노립니다.',
    note: 'williams_lineage',
  },
  astonmartin: {
    nickname: '',
    base: '영국',
    founded: '1959 · 2018 · 2021',
    chassis: 'AMR26',
    engine: 'Honda',
    engineFull: '혼다 RA626H',
    driverChampionships: { count: 0, years: [] },
    constructorChampionships: { count: 0, years: [] },
    raceWins: 1,
    podiums: 12,
    poles: 1,
    fastestLaps: 3,
    recentSeasonResult: { season: 2025, position: 7, points: 89 },
    tag: '전설 알론소',
    description:
      '2021년 재출범.\n44세 알론소가 여전히 날카로운 레이싱으로 팬들의 탄성을 자아냅니다.',
    note: 'astonmartin_lineage',
  },
  rb: {
    nickname: '',
    base: '이탈리아',
    founded: '1985 · 2006 · 2020 · 2024',
    chassis: 'VCARB 03',
    engine: 'Red Bull Ford',
    engineFull: '레드불 포드 DM01',
    driverChampionships: { count: 0, years: [] },
    constructorChampionships: { count: 0, years: [] },
    raceWins: 2,
    podiums: 6,
    poles: 1,
    fastestLaps: 1,
    recentSeasonResult: { season: 2025, position: 6, points: 92 },
    tag: '레드불 유스팀',
    description:
      '레드불 자매 팀, 신인 육성 전문.\n베텔·베르스타펜·리카도를 배출했고 2026년은 역사상 가장 젊은 라인업입니다.',
    note: 'rb_lineage',
  },
  haas: {
    nickname: '',
    base: '미국',
    founded: '2014',
    chassis: 'VF-26',
    engine: 'Ferrari',
    engineFull: '페라리 067/6',
    driverChampionships: { count: 0, years: [] },
    constructorChampionships: { count: 0, years: [] },
    raceWins: 0,
    podiums: 0,
    poles: 1,
    fastestLaps: 3,
    recentSeasonResult: { season: 2025, position: 8, points: 79 },
    tag: '미국 기반 팀',
    description:
      '2016년 참가한 미국 기반 팀.\n페라리 파워유닛으로 중위권 경쟁 중입니다.',
  },
  audi: {
    nickname: '',
    base: '영국 · 독일',
    founded: '1933 · 2026',
    chassis: 'R26',
    engine: 'Audi (자체 개발)',
    engineFull: '아우디 AFR 26 하이브리드',
    driverChampionships: { count: 0, years: [] },
    constructorChampionships: { count: 0, years: [] },
    raceWins: 0,
    podiums: 0,
    poles: 0,
    fastestLaps: 0,
    recentSeasonResult: { season: 0, position: 0, points: 0 },
    tag: '2026 독일의 귀환',
    description:
      '자우버/알파로메오 팀을 인수해 2026년 자체 파워유닛으로 F1에 공식 참가합니다.',
    note: 'audi_lineage',
  },
  alpine: {
    nickname: '',
    base: '영국',
    founded: '1977 · 1981 · 1986 · 2021',
    chassis: 'A526',
    engine: 'Mercedes',
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
    tag: '프랑스 대표팀',
    description:
      '르노 팀이 2021년 리브랜딩.\n2005~2006 알론소와 2연속 챔피언의 역사를 갖고 있습니다.',
    note: 'alpine_lineage',
  },
  cadillac: {
    nickname: '',
    base: '미국 · 영국',
    founded: '2026',
    chassis: 'MAC-26',
    engine: 'Ferrari',
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
      'GM 캐딜락의 F1 신규 참가팀.\n챔피언 경력의 페레스·보타스를 영입해 첫 시즌부터 경쟁력을 갖추려 합니다.',
  },
}

export const TEAMS_GUIDE: TeamGuide[] = Object.entries(TEAM_EXTRAS).map(([id, extra]) => {
  const base = ALL_TEAMS.find(t => t.value === id)!
  return {
    id,
    name: base.label,
    color: base.color,
    drivers: ALL_DRIVERS.filter(d => d.team === id).map(d => d.label),
    ...extra,
  }
})

interface DriverExtra {
  nameEn: string
  nationality: string
  flag: string
  championships: number
  bio: string
  highlight: string
}

// 이름·소속팀·팀색은 2026Roster.ts(ALL_DRIVERS)가 원본. 여기선 가이드에 소개할 드라이버의 추가 정보만 관리.
const DRIVER_EXTRAS: Record<string, DriverExtra> = {
  verstappen: {
    nameEn: 'Max Verstappen',
    nationality: '네덜란드',
    flag: '🇳🇱',
    championships: 4,
    bio: '2021~2024 4연속 드라이버 챔피언. 17세 데뷔로 역대 최연소 포인트 기록을 세웠습니다. 공격적인 스타일로 현세대 최강 드라이버로 불립니다.',
    highlight: '4연속 챔피언 (2021~2024) · 역대 최다 단일 시즌 승리 19승',
  },
  hamilton: {
    nameEn: 'Lewis Hamilton',
    nationality: '영국',
    flag: '🇬🇧',
    championships: 7,
    bio: '최다 우승(103승)·최다 폴포지션(104회) 보유. 슈마허와 챔피언 7회 공동 기록. 2025년 페라리 이적으로 전 세계 팬들을 놀라게 했습니다.',
    highlight: '역대 최다 103승 · 챔피언 7회 · 폴포지션 104회',
  },
  norris: {
    nameEn: 'Lando Norris',
    nationality: '영국',
    flag: '🇬🇧',
    championships: 0,
    bio: '2024 드라이버 챔피언십 2위. 맥라렌 부활의 핵심. SNS·스트리밍으로 젊은 팬층에서 인기가 높습니다.',
    highlight: '2024 드라이버 챔피언십 2위 · 2024년 6승',
  },
  leclerc: {
    nameEn: 'Charles Leclerc',
    nationality: '모나코',
    flag: '🇲🇨',
    championships: 0,
    bio: '페라리 에이스. 예선 단발 랩 속도가 그리드 최고 수준. 2024년 드디어 고향 모나코 GP 첫 우승을 달성했습니다.',
    highlight: '2024 모나코 GP 우승 · 폴포지션 장인',
  },
  alonso: {
    nameEn: 'Fernando Alonso',
    nationality: '스페인',
    flag: '🇪🇸',
    championships: 2,
    bio: '2005·2006 챔피언. 44세에도 최상위 퍼포먼스를 발휘하며 33번째 시즌을 소화 중입니다.',
    highlight: '챔피언 2회 (2005·2006) · 최고령 현역 드라이버 44세',
  },
  piastri: {
    nameEn: 'Oscar Piastri',
    nationality: '호주',
    flag: '🇦🇺',
    championships: 0,
    bio: '2023 신인왕. 2024 헝가리 GP 첫 우승. 노리스와의 팀 내 경쟁이 시즌 최고 볼거리 중 하나입니다.',
    highlight: '2023 신인왕 · 2024 헝가리 GP 첫 우승',
  },
  russell: {
    nameEn: 'George Russell',
    nationality: '영국',
    flag: '🇬🇧',
    championships: 0,
    bio: '2022 브라질 GP 첫 우승. 해밀턴 이적 후 메르세데스 재건을 이끄는 팀 리더입니다.',
    highlight: '2022 브라질 GP 우승 · 메르세데스 최다 포인트 드라이버',
  },
  antonelli: {
    nameEn: 'Andrea Kimi Antonelli',
    nationality: '이탈리아',
    flag: '🇮🇹',
    championships: 0,
    bio: '18세 F1 데뷔. 해밀턴이 직접 지목한 후계자. F2 압도적 성적을 뒤로하고 역대 최연소 메르세데스 드라이버가 됐습니다.',
    highlight: '해밀턴이 지목한 차세대 에이스 · 역대 최연소 메르세데스 드라이버',
  },
}

export const DRIVERS_GUIDE: DriverGuide[] = Object.entries(DRIVER_EXTRAS).map(([id, extra]) => {
  const base = ALL_DRIVERS.find(d => d.value === id)!
  const team = ALL_TEAMS.find(t => t.value === base.team)!
  return {
    id,
    name: base.label,
    teamId: base.team,
    teamName: team.label,
    teamColor: base.color,
    number: base.number,
    ...extra,
  }
})
