"use client"
import { useState } from "react"
import { Search, Filter, AlertCircle, Download, MoreHorizontal, DollarSign, Users, TrendingDown } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { recentStudents as students, classes } from "@/lib/mock-data"

export default function OutstandingFeesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const outstandingFees = students
    .filter((student) => student.feeStatus !== "paid")
    .map((student, idx) => ({
      id: `outstanding_${student.id}`,
      studentId: student.id,
      studentName: student.name,
      regNumber: student.regNo,
      classId: student.class,
      amount: student.feeStatus === "partial" ? Math.floor(Math.random() * 50000) + 20000 : Math.floor(Math.random() * 100000) + 50000,
      daysPending: Math.floor(Math.random() * 180) + 10,
      priority: student.feeStatus === "unpaid" ? "high" : "medium",
    }))

  const filteredFees = outstandingFees.filter((fee) => {
    const matchesSearch = !searchQuery || fee.studentName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPriority = priorityFilter === "all" || fee.priority === priorityFilter
    return matchesSearch && matchesPriority
  })

  const totalOutstanding = outstandingFees.reduce((sum, fee) => sum + fee.amount, 0)
  const highPriority = outstandingFees.filter((f) => f.priority === "high")

  return (
    <>
      <DashboardHeader
        title="Outstanding Fees"
        description="Track and manage student fee arrears"
      />
      <div className="p-6 flex flex-col gap-6">
        {highPriority.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {highPriority.length} students have high-priority outstanding fees. Total: {highPriority.reduce((sum, f) => sum + f.amount, 0).toLocaleString()}
            </AlertDescription>
          </Alert>
        )}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Total Outstanding", value: `${totalOutstanding.toLocaleString()}` },
            { label: "Students with Arrears", value: outstandingFees.length },
            { label: "High Priority", value: highPriority.length },
            { label: "Overdue 90+ Days", value: outstandingFees.filter((f) => f.daysPending > 90).length },
          ].map((item, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <p className="text-lg font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Arrears List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Amount ()</TableHead>
                    <TableHead>Days Pending</TableHead>
                    <TableHead>Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFees.slice(0, 15).map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell>{fee.studentName}</TableCell>
                      <TableCell>{fee.amount.toLocaleString()}</TableCell>
                      <TableCell>{fee.daysPending} days</TableCell>
                      <TableCell>
                        <Badge variant={fee.priority === "high" ? "destructive" : "secondary"}>
                          {fee.priority}
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
