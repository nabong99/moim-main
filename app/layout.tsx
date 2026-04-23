import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Link from "next/link"
import "./globals.css"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { logout } from "./logout/actions"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Moim",
  description: "이벤트 모임 플랫폼",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-border bg-background">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
            <Button
              variant="ghost"
              render={<Link href="/" />}
              nativeButton={false}
              className="text-base font-semibold"
            >
              Moim
            </Button>
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    render={<Link href="/new" />}
                    nativeButton={false}
                  >
                    새 이벤트
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    render={<Link href="/my" />}
                    nativeButton={false}
                  >
                    내 이벤트
                  </Button>
                  <span className="text-sm text-muted-foreground hidden sm:block">
                    {user.email}
                  </span>
                  <form action={logout}>
                    <Button variant="outline" size="sm" type="submit">
                      로그아웃
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    render={<Link href="/login" />}
                    nativeButton={false}
                  >
                    로그인
                  </Button>
                  <Button
                    size="sm"
                    render={<Link href="/signup" />}
                    nativeButton={false}
                  >
                    회원가입
                  </Button>
                </>
              )}
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
