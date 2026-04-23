'use server'

import { nanoid } from 'nanoid'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type NewEventState = { error: string } | null

export async function createEvent(
  _prev: NewEventState,
  formData: FormData
): Promise<NewEventState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const title = (formData.get('title') as string)?.trim()
  const host_name = (formData.get('host_name') as string)?.trim()
  const starts_at = formData.get('starts_at') as string
  const description = (formData.get('description') as string)?.trim() || null
  const location = (formData.get('location') as string)?.trim() || null

  if (!title) return { error: '이벤트 제목을 입력해주세요.' }
  if (!host_name) return { error: '주최자 이름을 입력해주세요.' }
  if (!starts_at) return { error: '일시를 입력해주세요.' }

  const { error } = await supabase.from('events').insert({
    id: nanoid(10),
    owner_id: user.id,
    title,
    host_name,
    starts_at,
    description,
    location,
  })

  if (error) return { error: '이벤트 생성 중 오류가 발생했습니다.' }

  redirect('/my')
}
