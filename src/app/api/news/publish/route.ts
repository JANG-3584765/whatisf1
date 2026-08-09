import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function PATCH(req: NextRequest) {
  const session = await auth()
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail || session?.user?.email !== adminEmail)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { articleUrl, isPublished } = await req.json() as { articleUrl?: string; isPublished?: boolean }

  if (!articleUrl) {
    return NextResponse.json({ error: 'articleUrl 필요' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('news_translations')
    .update({ is_published: isPublished })
    .eq('article_url', articleUrl)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  revalidatePath('/news')
  revalidatePath('/news/[slug]', 'page')

  return NextResponse.json({ ok: true })
}
