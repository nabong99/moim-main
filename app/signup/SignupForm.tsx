'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signup, type SignupState } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const INITIAL: SignupState = null

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, INITIAL)

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>회원가입</CardTitle>
        <CardDescription>이메일과 비밀번호로 계정을 만드세요.</CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="6자 이상"
              required
            />
          </div>
          {state?.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? '가입 중...' : '회원가입'}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            이미 계정이 있으신가요?{' '}
            <Button
              variant="link"
              render={<Link href="/login" />}
              nativeButton={false}
              className="h-auto p-0"
            >
              로그인
            </Button>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
