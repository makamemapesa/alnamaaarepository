"use client"
import { useState } from "react"
import { Search, Download, Filter, Plus, MoreHorizontal, TrendingUp, CreditCard } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { payments, students, classes } from "@/lib/mock-data"

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPayments = payments.filter((payment) => {
    const student = students.find((s) => s.id === payment.studentId)
    const matchesSearch = !searchQuery || student?.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0)

  return (
    <>
      <DashboardHeader
        title="Fee Payments"
        description="Track and manage student fee payments"
      />
      <div className="p-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Total Payments", value: payments.length },
            { label: "Amount Collected", value: `${totalAmount.toLocaleString()}` },
            { label: "Completed", value: payments.filter((p) => p.status === "completed").length },
            { label: "Pending", value: payments.filter((p) => p.status !== "completed").length },
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
            <CardTitle className="text-base">Payment Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Amount ()</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.slice(0, 10).map((payment) => {
                    const student = students.find((s) => s.id === payment.studentId)
                    return (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{student?.name}</TableCell>
                        <TableCell>{payment.amount.toLocaleString()}</TableCell>
                        <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>
                          <Badge variant={payment.status === "completed" ? "default" : "destructive"}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
