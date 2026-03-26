"use client"
import { useState } from "react"
import { Bell, Trash2, AlertCircle, CheckCircle2, Info, Clock } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const initialNotifications = [
  { id: "1", type: "success", title: "Fee Payment Recorded", message: "Payment recorded successfully.", timestamp: new Date(), read: false },
  { id: "2", type: "warning", title: "Outstanding Fees Alert", message: "34 students have outstanding fees.", timestamp: new Date(), read: false },
  { id: "3", type: "info", title: "New Student Registration", message: "5 new students registered.", timestamp: new Date(), read: true },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)

  return (
    <>
      <DashboardHeader
        title="Notifications"
        description="Manage and view system notifications"
      />
      <div className="p-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[
            { label: "Total Notifications", value: notifications.length },
            { label: "Unread", value: notifications.filter((n) => !n.read).length },
            { label: "Warnings", value: notifications.filter((n) => n.type === "warning").length },
          ].map((item, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notification Center</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-4 rounded-lg border">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    </div>
                    {!notification.read && <Badge variant="default">New</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
