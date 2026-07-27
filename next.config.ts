import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Supabase 스토리지 (자체 업로드/캐싱 이미지)
        protocol: 'https',
        hostname: 'shphrkjoatkjbbxxdfih.supabase.co',
      },
      {
        // 유튜브 영상 썸네일 (highlights 페이지)
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      //뉴스 소스
      {
        // BBC Sport
        protocol: 'https',
        hostname: '**.bbc.co.uk',
      },
      {
        // Autosport
        protocol: 'https',
        hostname: '**.autosport.com',
      },
      {
        // Motorsport.com
        protocol: 'https',
        hostname: '**.motorsport.com',
      },
      {
        // RaceFans
        protocol: 'https',
        hostname: '**.racefans.net',
      },
      {
        // The Race
        protocol: 'https',
        hostname: '**.the-race.com',
      },
      {
        // Crash.net
        protocol: 'https',
        hostname: '**.crash.net',
      },
      {
        // GPFans
        protocol: 'https',
        hostname: '**.gpfans.com',
      },
      {
        // Motorsport Week
        protocol: 'https',
        hostname: '**.motorsportweek.com',
      },
    ],
  },
  poweredByHeader: false,
};

export default nextConfig;
