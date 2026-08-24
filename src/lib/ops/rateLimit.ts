import { createHash } from 'crypto'
import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

// feedback/route.ts에 있던 IP 해시 + 레이트리밋 로직을 일반화한 버전.
// 아직 어디서도 안 쓰고 있음 — 테스트해보고 괜찮으면 feedback/route.ts,
// news/react/route.ts 등에서 이걸 가져다 쓰도록 교체할 것.

export function hashIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').slice(0, 32)
}

export function getClientIp(req: NextRequest): string | null {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return req.headers.get('x-real-ip')
}

interface RateLimitOptions {
  table: string       // 카운트할 테이블 (예: 'feedbacks')
  ipColumn: string    // IP 해시가 저장된 컬럼 (예: 'ip_hash')
  timeColumn: string  // 생성 시각 컬럼 (예: 'created_at')
  limit: number       // 허용 횟수
  windowMs: number    // 시간 창 (ms)
}

interface RateLimitResult {
  limited: boolean
  ipHash: string | null
}

// req의 IP를 기준으로, 지정한 테이블에서 최근 windowMs 동안 쌓인 행 수가
// limit 이상이면 limited: true를 반환. IP를 못 구하면 제한 없이 통과시킴.
export async function checkIpRateLimit(
  req: NextRequest,
  { table, ipColumn, timeColumn, limit, windowMs }: RateLimitOptions,
): Promise<RateLimitResult> {
  const rawIp = getClientIp(req)
  const ipHash = rawIp ? hashIp(rawIp) : null

  if (!ipHash) return { limited: false, ipHash: null }

  const windowStart = new Date(Date.now() - windowMs).toISOString()
  const { count } = await supabaseAdmin
    .from(table)
    .select('*', { count: 'exact', head: true })
    .eq(ipColumn, ipHash)
    .gte(timeColumn, windowStart)

  return { limited: (count ?? 0) >= limit, ipHash }
}
