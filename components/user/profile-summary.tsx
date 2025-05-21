import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Mail } from "lucide-react"

interface UserData {
  name: string
  email: string
  avatar: string
  memberSince: string
  plan: string
  lastLogin: string
}

interface ProfileSummaryProps {
  user: UserData
}

export function UserProfileSummary({ user }: ProfileSummaryProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <Avatar className="h-20 w-20 mx-auto">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((name) => name[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="mt-4">{user.name}</CardTitle>
        <CardDescription className="flex items-center justify-center gap-1">
          <Mail className="h-3 w-3" />
          {user.email}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Member since</p>
            <p className="font-medium">{user.memberSince}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Plan</p>
            <p className="font-medium">{user.plan}</p>
          </div>
          <div className="col-span-2">
            <p className="text-muted-foreground">Last login</p>
            <p className="font-medium flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {user.lastLogin}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
  )
}
