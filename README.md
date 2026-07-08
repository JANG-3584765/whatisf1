<div align="center">

<img src="https://f1-web-delta.vercel.app/images/common/logo.png" alt="WhatisF1 로고" width="180"/>

# WhatisF1

**포뮬러 1 팬을 위한 올인원 정보 플랫폼 — 실제 운영 중인 서비스**

뉴스 · 하이라이트 · 경기 일정 · 레이스 결과 · 드라이버/컨스트럭터 순위 · 팬 투표를 한 곳에서

[![배포](https://img.shields.io/badge/배포-Vercel-black?style=flat-square&logo=vercel)](https://f1-web-delta.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5_strict-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com)

🔗 **[f1-web-delta.vercel.app](https://f1-web-delta.vercel.app)** &nbsp;|&nbsp; 📸 **[Instagram @what_is_f1__](https://www.instagram.com/what_is_f1__)**

</div>

---

## 프로젝트 개요

바닐라 JS로 제작한 F1 정보 사이트를 **Next.js / React 기반으로 전면 재구축**한 프로젝트입니다. 단순 포팅을 넘어 관리자 뉴스 승인 시스템, 실시간 번역 에디터, OAuth 인증, ISR 캐시 전략, Supabase 기반 서버 상태 관리 등 프로덕션 수준의 기능을 직접 설계하고 운영 중입니다.

- **총 라우트:** 15개 페이지 + 8개 API Route
- **외부 API 연동:** Jolpica F1, YouTube Data API v3, OpenF1, Open-Meteo 4종
- **RSS 수집:** 8개 영문 F1 매체 → 한국어 번역 승인 후 서비스
- **하이라이트:** YouTube 플레이리스트 40개 자동 수집 (공식 F1 · 한국 인플루언서 채널)
- **서킷 이미지:** 25개 수록
- **실제 서비스 운영 중** (Vercel + Instagram 계정 연동)

---

## 기술 스택

| 분류 | 기술 | 비고 |
|------|------|------|
| **Framework** | Next.js 16.2.1 (App Router) | SSG / ISR / SSR / CSR 혼용 |
| **Language** | TypeScript 5 (strict mode) | 전 파일 타입 안전성 적용 |
| **UI** | React 19.2 | Server / Client Component 분리 |
| **Styling** | Tailwind CSS v4 | CSS Variables 기반 다크모드 |
| **Server State** | TanStack Query v5.100.10 | staleTime 폴링, optimistic update |
| **Auth** | Auth.js v5 beta (next-auth) | Google · Kakao OAuth, JWT 전략 |
| **Database** | Supabase (PostgreSQL) | RLS, 서비스 롤 키 분리 |
| **Deployment** | Vercel | CI/CD 자동화, 환경변수 관리 |
| **External APIs** | Jolpica F1 · YouTube Data API v3 · OpenF1 · Open-Meteo | |
| **RSS Parser** | xml2js | 8개 매체 피드 파싱 |
| **Icons** | flag-icons | 국가 국기 CSS 클래스 |

---
