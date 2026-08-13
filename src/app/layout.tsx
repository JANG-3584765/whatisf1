import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Providers from '@/components/layout/Providers'
import ScrollToTopButton from '@/components/layout/ScrollToTopButton'

const pretendard = localFont({
  src: '../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

const SITE_TITLE = 'WhatisF1'
const SITE_DESCRIPTION = '포뮬러 원 정보 플랫폼 사이트'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type:        'website',
    siteName:    SITE_TITLE,
    title:       SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{
      url:    '/images/common/logo.png',
      alt:    SITE_TITLE,
    }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       SITE_TITLE,
    description: SITE_DESCRIPTION,
    images:      ['/images/common/logo.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning className={pretendard.variable}>
      <head>
        <script dangerouslySetInnerHTML={{__html: `
          try {
            var t = localStorage.getItem('theme');
            var dark = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
            if (dark) document.documentElement.setAttribute('data-theme', 'dark');
          } catch(e) {}
        `}} />
      </head>
      <body className={pretendard.className}>
        <Providers>
          <div className="flex flex-col min-h-dvh">
            <Header />
            {children}
            <Footer />
          </div>
          <ScrollToTopButton />
        </Providers>
      </body>
    </html>
  )
}
