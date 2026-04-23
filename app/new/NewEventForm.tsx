'use client'

import { useActionState } from 'react'
import { createEvent, type NewEventState } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const INITIAL: NewEventState = null

export function NewEventForm() {
  const [state, action, pending] = useActionState(createEvent, INITIAL)

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>새 이벤트</CardTitle>
        <CardDescription>이벤트 정보를 입력하세요.</CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="title">이벤트 제목 *</Label>
            <Input id="title" name="title" placeholder="이벤트 이름" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="host_name">주최자 *</Label>
            <Input id="host_name" name="host_name" placeholder="주최자 이름 또는 단체명" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="starts_at">일시 *</Label>
            <Input id="starts_at" name="starts_at" type="datetime-local" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="location">장소</Label>
            <Input id="location" name="location" placeholder="장소 (선택)" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="이벤트 설명 (선택)"
              rows={4}
            />
          </div>
          {state?.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? '생성 중...' : '이벤트 만들기'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
