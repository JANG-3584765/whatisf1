import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Kakao from 'next-auth/providers/kakao'

//next-auth Session에 id 필드 추가를 위한 모듈 확장
declare module 'next-auth' {
  interface Session {
    user: {
        id: string //로그인 사용자 판별
        //문자열이 있거나, null이거나 undefined 모두 가능 
        name?: string | null       
        email?: string | null
        image?: string | null
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
  providers: [
    Google,
    Kakao({
      clientId: process.env.AUTH_KAKAO_CLIENT_ID!,
      clientSecret: process.env.AUTH_KAKAO_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    session({ session, token }) {
      session.user.id = token.sub ?? token.email ?? ''
      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
})