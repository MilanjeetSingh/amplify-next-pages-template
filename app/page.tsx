import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome</CardTitle>
          <CardDescription className="text-center">Choose your role to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <Link href="/admin/login" className="w-full">
              <Button className="w-full" variant="default">
                Admin Login
              </Button>
            </Link>
            <Link href="/user/login" className="w-full">
              <Button className="w-full" variant="outline">
                User Login
              </Button>
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">Next.js Auth Roles Demo</CardFooter>
      </Card>
    </main>
  )
}
