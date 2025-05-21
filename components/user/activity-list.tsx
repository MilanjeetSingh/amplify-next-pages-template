import { Clock } from "lucide-react"

interface Activity {
  id: number
  action: string
  time: string
}

interface ActivityListProps {
  activities: Activity[]
}

export function UserActivityList({ activities }: ActivityListProps) {
  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <p className="text-muted-foreground">No recent activity</p>
      ) : (
        activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-2 text-sm">
            <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">{activity.action}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
