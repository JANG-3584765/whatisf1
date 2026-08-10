import { signIn } from '@/auth'
import InAppBrowserNotice from '@/components/layout/InAppBrowserNotice'

const PROVIDERS = [
  {
    id: 'kakao',
    label: '카카오로 계속하기',
    icon: '/images/common/kakao_logo.svg',
    className: 'border-none bg-[#FEE500] text-[#191919] hover:opacity-90 transition-opacity',
  },
  {
    id: 'google',
    label: 'Google로 계속하기',
    icon: '/images/common/google_logo.svg',
    className: 'border border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:bg-[var(--bg-2)] transition-colors',
  },
] as const

export default function LoginPage() {
  return (
    <main className="flex-1 bg-[var(--bg-2)] flex items-center justify-center px-4 py-8">
      <div className="flex flex-col items-center gap-4">

        <InAppBrowserNotice />

        <div className="w-[320px] bg-[var(--card)] rounded-xl shadow-md p-7">
          <h2 className="text-[22px] font-bold text-center text-[var(--text)] mb-2">로그인 / 회원가입</h2>
          <p className="text-sm text-center text-[var(--muted)] mb-7">소셜 계정으로 간편하게 시작하세요</p>

          <div className="flex flex-col gap-3">
            {PROVIDERS.map(provider => (
              <form
                key={provider.id}
                action={async () => {
                  'use server'
                  await signIn(provider.id, { redirectTo: '/' })
                }}
              >
                <button
                  type="submit"
                  className={`w-full py-3 flex items-center justify-center gap-2.5 rounded-md text-sm font-medium cursor-pointer ${provider.className}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={provider.icon} alt={provider.id} className="w-5 h-5" />
                  {provider.label}
                </button>
              </form>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
