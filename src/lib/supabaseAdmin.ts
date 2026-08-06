import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('.env.local에 SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY가 없습니다.')
}

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      // 서버 전용 클라이언트라 브라우저 세션이 없음 — 토큰 자동갱신/세션 저장 기능이 불필요해서 끔
      autoRefreshToken: false,
      persistSession: false,
    },
  },
)
