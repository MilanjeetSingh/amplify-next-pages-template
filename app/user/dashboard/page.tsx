import { UserDashboardHeader } from "@/components/user/dashboard-header"
import { UserDashboardContent } from "@/components/user/dashboard-content"
import { UserProfileSummary } from "@/components/user/profile-summary"

export const metadata = {
  title: "User Dashboard",
  description: "Your personal dashboard",
}

// This is a Server Component that fetches data on the server
export default async function UserDashboardPage() {
  // In a real app, you would fetch user data from your database or API here
  const userData = await getUserData()

  return (
    <div className="flex min-h-screen flex-col">
      <UserDashboardHeader />
      <main className="flex-1 p-6">
        <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
          <UserProfileSummary user={userData} />
          <UserDashboardContent userData={userData} />
        </div>
      </main>
    </div>
  )
}

// Mock data fetching function (would connect to real data sources in production)
async function getUserData() {
  return {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "/diverse-avatars.png",
    memberSince: "Jan 2023",
    plan: "Premium",
    lastLogin: "Today at 9:42 AM",
    activities: [
      { id: 1, action: "Updated profile", time: "2 hours ago" },
      { id: 2, action: "Changed password", time: "1 week ago" },
      { id: 3, action: "Upgraded to Premium", time: "1 month ago" },
    ],
  }
}
