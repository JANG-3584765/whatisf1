<div align="center">

<img src="https://f1-web-delta.vercel.app/images/common/logo.png" alt="WhatisF1 로고" width="140"/>

# WhatisF1

한국어로 보는 F1 정보 사이트

[f1-web-delta.vercel.app](https://f1-web-delta.vercel.app)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://www.instagram.com/what_is_f1__)

</div>

<br/>

## 소개

F1 정보는 대부분 영어로 되어 있고 여러 사이트에 흩어져 있어서, 처음 F1을 보기 시작했을 때 따라가기가 꽤 힘들었습니다.
그래서 해외 매체 뉴스를 한국어로 번역해 올리고, 일정·결과·순위·하이라이트를 한 곳에서 볼 수 있는 사이트를 만들었습니다. 지금 실제로 운영하고 있습니다.

처음에는 바닐라 JS로 만들었고, 이후 Next.js App Router와 TypeScript로 구조를 새로 잡아 다시 구현했습니다.
관리자 번역·공개 흐름, OAuth 로그인, 페이지별 캐시 전략, Supabase 데이터 구조는 이 과정에서 직접 설계했습니다.

- 페이지 15개, API Route 8개
- 데이터: Jolpica F1, OpenF1, Open-Meteo, YouTube Data API v3
- 뉴스: 해외 F1 매체 RSS 8곳을 수집해서 번역 후 공개
- 하이라이트: YouTube 플레이리스트 40개 자동 수집
- 서킷: 2026 시즌 서킷 이미지 25개와 공식 레이스 데이터
- 역대 순위: 1950년부터 현재까지 드라이버·컨스트럭터 검색

<br/>

## 구조

```mermaid
flowchart LR
    subgraph Client["브라우저"]
        UI["React 19<br/>Server · Client Components"]
        RQ["TanStack Query"]
    end

    subgraph Vercel["Vercel · Next.js 16"]
        Pages["App Router 페이지<br/>SSG / ISR / SSR"]
        API["API Routes"]
        Auth["Auth.js v5<br/>Google · Kakao"]
    end

    subgraph External["외부 데이터"]
        Jolpica["Jolpica F1<br/>일정 · 결과 · 순위"]
        OpenF1["OpenF1<br/>트랙 날씨 · 타이어"]
        Meteo["Open-Meteo<br/>날씨"]
        YT["YouTube Data API"]
        RSS["F1 매체 RSS × 8"]
    end

    DB[("Supabase<br/>PostgreSQL")]

    UI --> Pages
    RQ --> API
    Pages --> Jolpica & OpenF1 & Meteo & YT & RSS
    Pages --> DB
    API --> DB
    API --> Auth
```

일정·결과·순위·하이라이트처럼 읽기만 하는 데이터는 서버 컴포넌트에서 받아와 ISR로 캐시합니다.
번역, 공개, 반응, 투표, 피드백처럼 쓰는 데이터는 API Route를 거쳐 Supabase에 저장하고, 서비스 롤 키는 서버에서만 씁니다.

<br/>

## 기술 스택

| 분류 | 기술 | 쓴 이유 |
|:--|:--|:--|
| Framework | Next.js 16.2 (App Router) | 페이지마다 SSG / ISR / SSR을 다르게 고를 수 있어서 |
| Language | TypeScript (strict) | 외부 API 응답이 많아서 타입으로 형태를 고정하려고 |
| UI | React 19.2 | Server / Client Component 분리 |
| Styling | Tailwind CSS v4, CSS Variables | 다크모드를 변수 덮어쓰기만으로 처리 |
| Server State | TanStack Query v5 | 관리자 화면 동기화, 낙관적 업데이트 |
| Auth | Auth.js v5 (next-auth) | Google · Kakao OAuth, JWT 세션 |
| Database | Supabase (PostgreSQL) | 번역 기사, 반응, 투표, 역대 순위 저장 |
| Font | Pretendard (`next/font/local`) | 한글 가독성, 자체 호스팅 |
| Deploy | Vercel | `main`에 push하면 자동 배포 |
| 기타 | xml2js, flag-icons, tsx | RSS 파싱, 국기 아이콘, 시딩 스크립트 실행 |

<br/>

## 렌더링 전략

데이터가 얼마나 자주 바뀌는지를 기준으로 페이지마다 다르게 정했습니다.

| 방식 | 페이지 | 이유 |
|:--|:--|:--|
| SSG | `/guide`, `/policy/*` | 빌드 후 바뀌지 않는 내용 |
| ISR 5분 | `/news`, `/results` | 기사 공개를 빨리 보여줘야 하고, 레이스 직후 결과가 바뀜 |
| ISR 30분 | `/` | 뉴스·하이라이트 미리보기가 하루에 몇 번 바뀜 |
| ISR 1시간 | `/highlights`, `/schedules`, `/standings` | 레이스 주말 단위로만 바뀜 |
| 동적 | `/news/[slug]`, `/login`, `/signup` | 로그인 상태나 관리자 여부에 따라 응답이 다름 |
| CSR | `/prediction` | localStorage와 세션 상태에 의존 |

기사를 공개하면 `revalidatePath('/news')`로 캐시를 바로 지워서, ISR 주기를 기다리지 않고 몇 초 안에 반영되게 했습니다.

<br/>

## 기능

### 홈
- 다음 레이스까지 남은 시간을 초 단위로 보여주는 카운트다운
- 최신 뉴스, 하이라이트, 순위 TOP3 미리보기
- 입문자용 가이드 섹션, 시즌 예측 투표 배너
- 여러 데이터를 `Promise.all`로 한 번에 요청

### 뉴스

```
RSS 8곳 수집 → Supabase 저장 (기본 비공개) → 관리자 번역 → 공개 → 캐시 무효화 → 사용자에게 노출
```

- 수집 매체: Autosport, Motorsport, BBC Sport, RaceFans, The Race, Crash.net, Motorsport Week, GPFans
- 날짜별 탭과 매체 필터, 가로 스크롤 UI
- 관리자는 목록과 상세 화면에서 바로 제목·본문을 번역하고 공개할 수 있음
- 공개 전 기사는 일반 사용자에게 404로 보이고, 7일이 지나면 자동 삭제
- 상세 페이지(`/news/[slug]`)는 원문 URL을 URL-safe Base64로 인코딩한 슬러그를 쓰고, 원문 링크를 함께 제공. 번역 전 기사에는 `EN` 뱃지 표시
- 이모지 반응은 로그인 사용자 기준 토글(누르면 추가, 다시 누르면 취소)이고, TanStack Query 낙관적 업데이트로 바로 반영
- `staleTime: 30초`로 관리자 화면과 목록 상태를 맞춤

### 하이라이트
- YouTube 플레이리스트 40개 자동 수집
  - F1 공식 채널 (F1, F2, F3, eSports)
  - 쿠팡플레이: 영상 제목 키워드로 시즌과 콘텐츠 종류를 자동으로 구분
  - 국내 크리에이터 채널 3곳 (원투피니시, Box to Pass, 퍼플섹터)
- `Promise.allSettled`로 수집해서 채널 하나가 실패해도 나머지는 그대로 보이게 함
- 시즌 / 콘텐츠 종류 / 채널 3가지 필터, `useMemo`로 필터 결과 캐싱
- 60초 이하 영상은 쇼츠로 자동 분류, 슬라이더와 그리드 보기 전환
- 썸네일은 고화질(`maxresdefault`)을 먼저 쓰고 없으면 `hqdefault`로 대체

### 경기 일정
- 2025, 2026 시즌 지원. `router.push`로 `?season=` 쿼리를 바꿔 시즌 전환
- Next.js 15부터 Promise가 된 `searchParams`를 `await`로 처리
- 라운드별 카드: 서킷, 국가, 세션 시간, 결과 페이지 링크

### 경기 결과
- 레이스, 퀄리파잉, 스프린트, 연습주행, 피트스탑, 타이어 전략 탭. 해당 라운드에 있는 세션만 표시
- `Suspense`로 빨리 오는 데이터부터 먼저 보여주고 느린 데이터는 이어서 로드
- 서킷 정보 카드: 서킷 이미지, 공식 레이스 거리, 랩 수, 첫 그랑프리, 랩 레코드
- 랩 레코드는 Jolpica에서 해당 서킷의 역대 패스티스트 랩을 조회해서 계산
- 트랙 날씨
  - 2023년 이후 지난 레이스: OpenF1 서킷 센서 실측값 (기온, 트랙 온도, 습도, 풍속, 강수)
  - 그 외: Open-Meteo (지난 레이스는 과거 기록, 다가올 레이스는 예보)
- 레이스 요약: 완주, DNF, 피트스탑 수, 패스티스트 랩
- API에서 주지 않는 패스티스트 피트스탑, 드라이버 오브 더 데이는 `manualRaceData`에 직접 입력
- 시즌·라운드 드롭다운을 바꾸면 바로 해당 결과로 이동

### 순위
- 드라이버 / 컨스트럭터 탭, 팀 컬러·국기·드라이버 코드 표시
- 직전 라운드 순위와 비교해서 ▲N / ▼N / — 로 순위 변동 표시
- 레이스 결과로 우승·포디움 횟수 집계
- 드라이버·팀 이름 한국어 표기
- 컨스트럭터 챔피언십이 생기기 전(1958년 이전) 시즌을 고르면 컨스트럭터 탭 비활성화
- 스켈레톤 로딩 (`loading.tsx`)
- 역대 시즌 검색 (1950~현재): 한국어나 영어 이름으로 검색하면 시즌별 순위 추이를 카드로 보여줌. 미리 시딩해 둔 Supabase 테이블을 조회하도록 바꿔서 약 70초 걸리던 검색을 약 2초로 줄임

### 시즌 예측 투표
- 2026 시즌 질문 10개. 단일 선택, 복수 선택, 순위 매기기 3가지 유형
- 답변은 localStorage에 바로 저장하고, 로그인하면 서버와 동기화
- 마지막 입력 후 0.8초 뒤에 저장하는 디바운스, `upsert`로 생성·수정을 한 번에 처리
- 문항별 제출 후 잠금, 전체 초기화
- 단일 선택은 다시 누르면 해제, 복수 선택은 문항마다 최대 개수 제한
- 드라이버·팀 공식 컬러를 쓴 선택 카드

### 입문 가이드
- 기초 지식, 팀 가이드, 드라이버 가이드, 2026 규정 4개 탭
- `Term` 컴포넌트: 본문 속 전문 용어에 점선 밑줄을 긋고, 마우스를 올리면 설명이 뜸 (용어 21개)

### 인증 · 공통
- Google, Kakao OAuth. 관리자는 이메일로 구분
- JWT의 `sub`를 `session.user.id`로 넣어서 Supabase 데이터와 사용자를 연결
- `Providers.tsx`에서 `SessionProvider`와 `QueryClientProvider`로 앱 전체를 감쌈
- 3열 헤더 그리드 (로고, 네비게이션, 사용자 영역)
- 다크모드: `<head>` 인라인 스크립트로 테마를 먼저 적용해서 첫 화면 깜빡임(FOUC) 방지
- 카카오톡·인스타그램 같은 인앱 브라우저에서는 OAuth가 막히는 경우가 있어서, 감지해서 안내 문구 표시
- 피드백 제출은 IP 해시 기준 시간당 3회로 제한
- 로딩 스켈레톤, 접근성(aria) 속성 정리

<br/>

## 성능 개선

| 항목 | 전 | 후 | 방법 |
|:--|:--|:--|:--|
| 역대 순위 검색 응답 | 약 70초 | 약 2초 | 시즌마다 외부 API 호출 → 미리 시딩한 Supabase 테이블 1회 조회 |
| 역대 순위 검색 API 호출 | 약 150회 | 1회 | `npm run seed:standings`로 1950년~현재 데이터를 미리 적재 |
| 하이라이트 채널 장애 | 페이지 전체 실패 | 실패한 채널만 빠짐 | `Promise.all` → `Promise.allSettled` |
| 결과 페이지 첫 화면 | 모든 데이터를 기다림 | 빠른 데이터 먼저 표시 | `Suspense` 경계 분리 |
| 서킷 이미지 LCP | 지연 로드 | 바로 로드 | `next/image` `priority` |
| 레이스 거리 | 계산값 (최대 1.5km 오차) | 공식값 | formula1.com 공식 데이터 사용 |

<br/>

## 트러블슈팅

**순위·결과·하이라이트 페이지가 한꺼번에 500 에러**
팀 컬러 상수를 두 모듈이 서로 import하는 순환 의존성 때문에 한쪽 값이 `undefined`가 되고 있었습니다. `src/lib/teamColors.ts`로 분리해서 의존 방향을 한쪽으로 정리했습니다.

**Vercel 배포 후 OAuth 로그인 콜백이 localhost로 이동**
Vercel 프록시 뒤에서 Auth.js가 요청의 Host 헤더를 신뢰하지 않아서 생긴 문제였습니다. Auth.js 설정에 `trustHost: true`를 넣어 해결했습니다.

**관리자가 공개한 기사가 일반 사용자에게 안 보임**
기존 기사 Map(`rowMap`)을 만든 뒤에 새 기사를 INSERT해서, Map에 없는 기사의 공개 여부가 잘못된 기본값으로 판정되고 있었습니다. 기본값 처리를 바로잡고, 공개할 때 `revalidatePath`로 캐시를 지우도록 했습니다.

**검색어에 `,` `(` `)`가 들어가면 Supabase 쿼리 오류**
PostgREST의 `or()` 필터 문법이 쉼표와 괄호를 구분자로 해석합니다. 검색어에서 이 문자들을 제거하고, `%` `_`는 이스케이프해서 `ilike` 와일드카드로 잘못 동작하지 않게 했습니다.

**가이드 페이지 `Hydration failed`**
`<p>` 안에 툴팁 컴포넌트의 `<div>`가 들어가면서 HTML 중첩 규칙을 어기고 있었습니다. `Term` 컴포넌트를 `<span>`으로 바꿨습니다.

**아우디 팀 컬러가 형광 초록으로 표시됨**
팀 컬러 정의가 여러 파일에 흩어져 있어서 값이 서로 달랐습니다. 한 곳에서만 관리하도록 합쳤습니다.

<br/>

## 데이터베이스

| 테이블 | 용도 |
|:--|:--|
| `news_translations` | RSS 기사 캐시, 한국어 번역, 공개 여부 |
| `news_reactions` | 기사별 이모지 반응 (사용자당 토글) |
| `season_predictions` | 시즌 예측 투표 답변 (사용자 + 시즌 단위) |
| `f1_standings` | 1950년~현재 드라이버·컨스트럭터 시즌 순위 |
| `feedbacks` | 사용자 피드백 (IP 해시로 제출 횟수 제한) |

<details>
<summary><code>f1_standings</code> 스키마</summary>

```sql
CREATE TABLE f1_standings (
  id            BIGSERIAL PRIMARY KEY,
  type          TEXT    NOT NULL CHECK (type IN ('driver', 'constructor')),
  entity_id     TEXT    NOT NULL,
  name          TEXT,               -- 한국어 이름
  original_name TEXT,               -- 영어 원문
  year          INT     NOT NULL,
  position      INT,
  points        NUMERIC NOT NULL DEFAULT 0,
  wins          INT     NOT NULL DEFAULT 0,
  team          TEXT,
  team_color    TEXT    NOT NULL DEFAULT '#888888'
);

CREATE UNIQUE INDEX f1_standings_unique ON f1_standings (type, entity_id, year);
CREATE        INDEX f1_standings_name   ON f1_standings (name);
CREATE        INDEX f1_standings_orig   ON f1_standings (original_name);
```
</details>

<br/>

## API

| 엔드포인트 | 메서드 | 권한 | 용도 |
|:--|:--|:--|:--|
| `/api/auth/[...nextauth]` | GET, POST | - | OAuth 로그인 |
| `/api/news/translate` | PATCH | 관리자 | 번역 저장 |
| `/api/news/publish` | PATCH | 관리자 | 기사 공개, 캐시 무효화 |
| `/api/news/react` | POST | 로그인 | 이모지 반응 토글 |
| `/api/news/reactions` | GET | - | 기사별 반응 조회 |
| `/api/standings/search` | GET | - | 역대 순위 검색 |
| `/api/prediction` | GET, POST | 로그인 | 예측 투표 조회, 저장 |
| `/api/feedback` | POST | - | 피드백 제출 (시간당 3회) |

<br/>

## 로컬 실행

```bash
git clone https://github.com/JANG-3584765/whatisf1.git
cd whatisf1
npm install
npm run dev
```

| 스크립트 | 설명 |
|:--|:--|
| `npm run dev` | 개발 서버 (http://localhost:3000) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint |
| `npm run seed:standings` | 역대 순위를 Supabase에 적재 (처음 한 번, 이후 시즌 끝날 때마다) |

프로젝트 루트에 `.env.local`을 만들고 아래 값을 채워야 합니다.

```env
# Auth.js
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_KAKAO_CLIENT_ID=
AUTH_KAKAO_CLIENT_SECRET=

# Supabase (서버 전용)
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# 외부 API
YOUTUBE_API_KEY=

# 관리자, 사이트
ADMIN_EMAIL=
NEXT_PUBLIC_SITE_URL=
```

<br/>

## 폴더 구조

```
src/
├─ app/
│  ├─ (main)/            사용자 페이지 (홈, 뉴스, 하이라이트, 일정, 결과, 순위, 가이드, 투표, 정책)
│  ├─ api/               API Routes
│  ├─ layout.tsx         전역 레이아웃, 폰트, 테마 초기화
│  └─ globals.css        CSS 변수, 다크모드
├─ components/
│  ├─ home/              홈 섹션
│  ├─ guide/             가이드 탭
│  ├─ layout/            헤더, 푸터, Provider
│  └─ ui/                공용 UI (Skeleton, Term, 썸네일)
├─ data/                 정적 데이터 (2026 로스터, 가이드, 용어, 일정, 채널)
├─ lib/                  외부 API 클라이언트, Supabase, 유틸
└─ auth.ts               Auth.js 설정
scripts/                 역대 순위 시딩 스크립트
```

<br/>

## 앞으로 할 것

기능
- [ ] 하이라이트 키워드 검색
- [ ] 뉴스 UI/UX 재설계, 초기 로드 성능 개선
- [ ] 결과 페이지에 라운드별 챔피언십 순위 변동, 드라이버별 포디움·우승 통계 추가
- [ ] 패스티스트 피트스탑 데이터 자동화 (지금은 수동 입력)

코드
- [ ] 공통 컴포넌트 추출
- [ ] API 응답 타입 한 곳으로 모으기 (`src/types/`)
- [ ] 에러 바운더리와 폴백 UI
- [ ] 이미지 lazy loading 개선
- [ ] 레이트 리밋 유틸을 다른 쓰기 API에도 적용

인프라
- [ ] Supabase Edge Function으로 RSS 수집 자동화

<br/>

## 고지

WhatisF1은 개인이 만든 비공식 팬 사이트이며 Formula 1®, FIA, 각 F1 팀과 관련이 없습니다.
모든 상표, 로고, 브랜드명의 권리는 각 권리자에게 있습니다.
