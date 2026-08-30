// 뉴스 이모지 반응 — 허용된 이모지 목록과, 내가 남긴 반응을 localStorage에 저장/조회하는 로직.
// NewsClient.tsx(목록)와 NewsDetailClient.tsx(상세)가 공유한다.

export const REACTION_EMOJIS = ['🔥', '😮', '😂', '👏', '😢']

const STORAGE_KEY = 'f1_my_reactions'

export type MyReactions = Record<string, string>

export function loadMyReactions(): MyReactions {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

export function saveMyReactions(next: MyReactions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch { /* ignore */ }
}
