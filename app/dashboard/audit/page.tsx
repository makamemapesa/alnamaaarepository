"use client"
import { useState } from "react"
import { Search, Filter, Download, Users, Clock, AlertCircle, CheckCircle } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const mockAuditLogs = [
  { id: "1", user: "admin@alnamaa.edu", action: "Create", module: "Students", status: "success", details: "Created student record" },
  { id: "2", user: "asani@alnamaa.edu", action: "Update", module: "Attendance", status: "success", details: "Updated attendance" },
  { id: "3", user: "musa@alnamaa.edu", action: "Create", module: "Payments", status: "success", details: "Recorded payment" },
]

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <DashboardHeader
        title="Audit Logs"
        description="Track all system activities and user actions"
      />
      <div className="p-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Total Activities", value: mockAuditLogs.length },
            { label: "Successful", value: mockAuditLogs.filter((l) => l.status === "success").length },
            { label: "Failed", value: 0 },
            { label: "Active Users", value: 3 },
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
            <CardTitle className="text-base">Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Module</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAuditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.module}</TableCell>
                      <TableCell className="text-sm">{log.details}</TableCell>
                      <TableCell>
                        <Badge variant={log.status === "success" ? "default" : "destructive"}>
                          {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
