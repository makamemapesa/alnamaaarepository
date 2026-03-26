"use client"

import { useState } from "react"
import {
  Search,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Download,
  BarChart3,
  AlertTriangle,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { attendanceRecords, classesExtended } from "@/lib/mock-data"

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState("2026-02-27")
  const [classFilter, setClassFilter] = useState("all")

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesDate = record.date === selectedDate
    const matchesClass = classFilter === "all" || record.class === classFilter
    return matchesDate && matchesClass
  })

  const totalPresent = filteredRecords.reduce((sum, r) => sum + r.present, 0)
  const totalAbsent = filteredRecords.reduce((sum, r) => sum + r.absent, 0)
  const totalLate = filteredRecords.reduce((sum, r) => sum + r.late, 0)
  const totalStudents = filteredRecords.reduce((sum, r) => sum + r.totalStudents, 0)
  const attendanceRate = totalStudents > 0 ? Math.round((totalPresent / totalStudents) * 100) : 0

  const chartData = filteredRecords.map((r) => ({
    class: r.class,
    present: r.present,
    absent: r.absent,
    late: r.late,
  }))

  return (
    <>
      <DashboardHeader
        title="Attendance Tracking"
        description="Monitor daily attendance across all classes and identify patterns"
      />

      <div className="p-6 flex flex-col gap-6">
        {/* Date & Filter Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Date</label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-44"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Class</label>
                  <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      {classesExtended.map((cls) => (
                        <SelectItem key={cls.id} value={cls.name}>{cls.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Export Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {totalStudents}
              </p>
              <p className="text-[11px] text-muted-foreground">Total Students</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <CheckCircle className="h-5 w-5 text-accent" />
              </div>
              <p className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {totalPresent}
              </p>
              <p className="text-[11px] text-muted-foreground">Present</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <p className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {totalAbsent}
              </p>
              <p className="text-[11px] text-muted-foreground">Absent</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
                <Clock className="h-5 w-5 text-warning-foreground" />
              </div>
              <p className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {totalLate}
              </p>
              <p className="text-[11px] text-muted-foreground">Late</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-4/10">
                <BarChart3 className="h-5 w-5 text-chart-4" />
              </div>
              <p className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {attendanceRate}%
              </p>
              <p className="text-[11px] text-muted-foreground">Attendance Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Attendance by Class</CardTitle>
            <CardDescription>Visual breakdown of attendance for {new Date(selectedDate).toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.01 240)" />
                  <XAxis dataKey="class" tick={{ fontSize: 11 }} stroke="oklch(0.50 0.02 250)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.50 0.02 250)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.90 0.01 240)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="present" fill="oklch(0.65 0.18 155)" radius={[4, 4, 0, 0]} name="Present" />
                  <Bar dataKey="absent" fill="oklch(0.55 0.22 25)" radius={[4, 4, 0, 0]} name="Absent" />
                  <Bar dataKey="late" fill="oklch(0.75 0.15 75)" radius={[4, 4, 0, 0]} name="Late" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Details Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Detailed Attendance Records</CardTitle>
            <CardDescription>Per-class attendance with absent and late student lists</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/50">
                    <TableHead className="text-xs font-semibold">Class</TableHead>
                    <TableHead className="text-xs font-semibold">Total</TableHead>
                    <TableHead className="text-xs font-semibold">Present</TableHead>
                    <TableHead className="text-xs font-semibold">Absent</TableHead>
                    <TableHead className="text-xs font-semibold">Late</TableHead>
                    <TableHead className="text-xs font-semibold">Rate</TableHead>
                    <TableHead className="text-xs font-semibold hidden lg:table-cell">Absent Students</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => {
                    const rate = Math.round((record.present / record.totalStudents) * 100)
                    return (
                      <TableRow key={record.id}>
                        <TableCell>
                          <span className="text-sm font-semibold text-card-foreground">{record.class}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-card-foreground">{record.totalStudents}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-[11px] bg-accent/10 text-accent">
                            {record.present}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={`text-[11px] ${record.absent > 0 ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>
                            {record.absent}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={`text-[11px] ${record.late > 0 ? "bg-warning/10 text-warning-foreground" : "bg-muted text-muted-foreground"}`}>
                            {record.late}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={rate} className="h-1.5 w-16" />
                            <span className="text-xs font-medium text-card-foreground">{rate}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {record.absentStudents.map((student) => (
                              <Badge key={student} variant="outline" className="text-[10px] text-destructive border-destructive/30">
                                {student}
                              </Badge>
                            ))}
                            {record.lateStudents.map((student) => (
                              <Badge key={student} variant="outline" className="text-[10px] text-warning-foreground border-warning/30">
                                {student} (Late)
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        {filteredRecords.some(r => (r.absent / r.totalStudents) > 0.05) && (
          <Card className="border-warning/30 bg-warning/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-card-foreground">Attendance Alerts</p>
                  <div className="flex flex-col gap-1 mt-1">
                    {filteredRecords.filter(r => (r.absent / r.totalStudents) > 0.05).map((r) => (
                      <p key={r.id} className="text-xs text-muted-foreground">
                        <strong>{r.class}</strong> has {r.absent} absent students ({Math.round((r.absent / r.totalStudents) * 100)}% absent rate)
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
