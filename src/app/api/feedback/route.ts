import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { checkIpRateLimit } from '@/lib/ops/rateLimit'

const CATEGORIES = ['bug', 'feature', 'other'] as const
const RATE_LIMIT = 3       // 시간당 최대 제출 수
const WINDOW_MS  = 60 * 60 * 1000  // 1시간

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })

  const { category, content, email } = body

  // 입력 검증
  if (!CATEGORIES.includes(category)) {
    return NextResponse.json({ error: '유효하지 않은 카테고리입니다.' }, { status: 400 })
  }
  if (typeof content !== 'string' || content.trim().length < 5) {
    return NextResponse.json({ error: '내용을 5자 이상 입력해주세요.' }, { status: 400 })
  }
  if (content.trim().length > 1000) {
    return NextResponse.json({ error: '내용은 1000자 이하로 입력해주세요.' }, { status: 400 })
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: '이메일 형식이 올바르지 않습니다.' }, { status: 400 })
  }

  // IP 기반 rate limiting
  const { limited, ipHash } = await checkIpRateLimit(req, {
    table: 'feedbacks',
    ipColumn: 'ip_hash',
    timeColumn: 'created_at',
    limit: RATE_LIMIT,
    windowMs: WINDOW_MS,
  })

  if (limited) {
    return NextResponse.json(
      { error: '너무 많은 요청입니다. 1시간 후 다시 시도해주세요.' },
      { status: 429 },
    )
  }

  const { error } = await supabaseAdmin.from('feedbacks').insert({
    category,
    content: content.trim(),
    email: email?.trim() || null,
    user_id: session.user.id,
    ip_hash: ipHash,
  })

  if (error) {
    console.error('[feedback] insert error:', error.message)
    return NextResponse.json({ error: '저장에 실패했습니다. 잠시 후 다시 시도해주세요.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
