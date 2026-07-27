import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Kakao from 'next-auth/providers/kakao'

const googleClientId = process.env.AUTH_GOOGLE_ID
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET
if (!googleClientId || !googleClientSecret) {
  throw new Error('AUTH_GOOGLE_ID/AUTH_GOOGLE_SECRET 환경변수가 설정되지 않았습니다.')
}

const kakaoClientId = process.env.AUTH_KAKAO_CLIENT_ID
const kakaoClientSecret = process.env.AUTH_KAKAO_CLIENT_SECRET
if (!kakaoClientId || !kakaoClientSecret) {
  throw new Error('AUTH_KAKAO_CLIENT_ID/AUTH_KAKAO_CLIENT_SECRET 환경변수가 설정되지 않았습니다.')
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    Kakao({
      clientId: kakaoClientId,
      clientSecret: kakaoClientSecret,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    session({ session, token }) {
      if (!token.sub) {
        throw new Error('인증 토큰에 사용자 ID(sub)가 없습니다.')
      }
      session.user.id = token.sub
      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
})