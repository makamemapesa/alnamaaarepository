"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Search,
  Plus,
  MoreHorizontal,
  Download,
  Filter,
  Eye,
  Edit,
  Trash2,
  FileText,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { recentStudents } from "@/lib/mock-data"
import { api, getResults } from "@/lib/api-client"

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [students, setStudents] = useState<any[]>(recentStudents as any[])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/students/").then(r => setStudents(getResults(r.data))).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const filteredStudents = students.filter((student) => {
    const name = student.fullName || student.name || `${student.firstName} ${student.lastName}`
    const cls = student.className || student.class || ""
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.regNo || "").toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClass = classFilter === "all" || cls === classFilter
    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    return matchesSearch && matchesClass && matchesStatus
  })

  return (
    <>
      <DashboardHeader
        title="Student Management"
        description="View and manage all student records and information"
      />

      <div className="p-6 flex flex-col gap-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Total Students", value: "1,247", color: "bg-primary/10 text-primary" },
            { label: "Active", value: "1,198", color: "bg-accent/10 text-accent" },
            { label: "Suspended", value: "12", color: "bg-destructive/10 text-destructive" },
            { label: "New This Term", value: "156", color: "bg-chart-3/10 text-chart-3" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-card-foreground mt-1" style={{ fontFamily: "var(--font-heading)" }}>
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Student Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base font-semibold">All Students</CardTitle>
                <CardDescription>Comprehensive list of all enrolled students</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
                <Link href="/dashboard/students/register">
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Register Student
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name or registration number..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="JSS 1A">JSS 1A</SelectItem>
                  <SelectItem value="JSS 2B">JSS 2B</SelectItem>
                  <SelectItem value="JSS 3A">JSS 3A</SelectItem>
                  <SelectItem value="SS 1A">SS 1A</SelectItem>
                  <SelectItem value="SS 2A">SS 2A</SelectItem>
                  <SelectItem value="SS 2B">SS 2B</SelectItem>
                  <SelectItem value="SS 3A">SS 3A</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/50">
                    <TableHead className="text-xs font-semibold">Student</TableHead>
                    <TableHead className="text-xs font-semibold">Reg. No.</TableHead>
                    <TableHead className="text-xs font-semibold">Class</TableHead>
                    <TableHead className="text-xs font-semibold hidden md:table-cell">Fee Status</TableHead>
                    <TableHead className="text-xs font-semibold">Status</TableHead>
                    <TableHead className="text-xs font-semibold w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => {
                    const displayName = student.fullName || student.name || `${student.firstName} ${student.lastName}`
                    const displayClass = student.className || student.class || ""
                    return (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                              {displayName.split(" ").map((n: string) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-card-foreground">{displayName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground font-mono text-xs">
                        {student.regNo}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-[11px]">{displayClass}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant="secondary"
                          className={`text-[11px] ${
                            student.feeStatus === "paid"
                              ? "bg-accent/10 text-accent"
                              : student.feeStatus === "partial"
                              ? "bg-warning/10 text-warning-foreground"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {student.feeStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`text-[11px] ${
                            student.status === "active"
                              ? "bg-accent/10 text-accent"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" /> View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" /> Report Card
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Remove Student
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-muted-foreground">
                Showing {filteredStudents.length} of {students.length} students
              </p>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled className="text-xs">Previous</Button>
                <Button variant="outline" size="sm" className="text-xs bg-primary text-primary-foreground">1</Button>
                <Button variant="outline" size="sm" className="text-xs">2</Button>
                <Button variant="outline" size="sm" className="text-xs">3</Button>
                <Button variant="outline" size="sm" className="text-xs">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
