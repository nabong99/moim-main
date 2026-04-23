import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('starts_at', { ascending: true })

  return (
    <main className="mx-auto w-full max-w-4xl p-6">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold">다가오는 이벤트</h1>
        <p className="text-muted-foreground">모임에 참여해보세요.</p>
      </div>

      {!events || events.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="text-muted-foreground">아직 이벤트가 없어요.</p>
          {user && (
            <Button render={<Link href="/new" />} nativeButton={false}>
              첫 이벤트 만들기
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle className="text-base">{event.title}</CardTitle>
                <CardDescription>
                  {new Date(event.starts_at).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-1 text-sm text-muted-foreground">
                {event.location && <p>📍 {event.location}</p>}
                <p>👤 {event.host_name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}
