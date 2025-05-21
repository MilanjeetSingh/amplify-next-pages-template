import { AdminDashboardHeader } from "@/components/admin/dashboard-header"
import { AdminDashboardStats } from "@/components/admin/dashboard-stats"
import { AdminRecentActivity } from "@/components/admin/recent-activity"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard overview",
}

// This is a Server Component that fetches data on the server
export default async function AdminDashboardPage() {
  // In a real app, you would fetch data from your database or API here
  const stats = await getAdminStats()
  const recentActivity = await getRecentActivity()

  return (
    <div className="flex min-h-screen flex-col">
      <AdminDashboardHeader />
      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <AdminDashboardStats stats={stats} />

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminRecentActivity activities={recentActivity} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

// Mock data fetching functions (would connect to real data sources in production)
async function getAdminStats() {
  return {
    totalUsers: 1248,
    activeUsers: 946,
    revenue: "$12,456",
    growth: "+12.3%",
  }
}

async function getRecentActivity() {
  return [
    { id: 1, user: "John Doe", action: "Created a new account", time: "2 hours ago" },
    { id: 2, user: "Jane Smith", action: "Updated profile", time: "3 hours ago" },
    { id: 3, user: "Bob Johnson", action: "Purchased premium plan", time: "5 hours ago" },
    { id: 4, user: "Alice Williams", action: "Submitted a support ticket", time: "1 day ago" },
    { id: 5, user: "Charlie Brown", action: "Cancelled subscription", time: "1 day ago" },
  ]
}
