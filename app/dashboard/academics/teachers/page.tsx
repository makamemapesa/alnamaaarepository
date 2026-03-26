"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  MoreHorizontal,
  Users,
  BookOpen,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  GraduationCap,
  Phone,
  Mail,
  Calendar,
  Briefcase,
  Award,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { teachersExtended, departments, subjects, classesExtended } from "@/lib/mock-data"

function TeacherDetailDialog({ teacher }: { teacher: (typeof teachersExtended)[number] }) {
  return (
    <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
              {teacher.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <DialogTitle style={{ fontFamily: "var(--font-heading)" }} className="text-lg">
              {teacher.name}
            </DialogTitle>
            <DialogDescription>{teacher.qualification} | {teacher.department} Department</DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div className="flex flex-col gap-5 py-2">
        {/* Status & Quick Info */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-3">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Status</span>
            <Badge variant="secondary" className={`text-xs w-fit ${teacher.status === "active" ? "bg-accent/10 text-accent" : teacher.status === "on_leave" ? "bg-warning/10 text-warning-foreground" : "bg-destructive/10 text-destructive"}`}>
              {teacher.status === "on_leave" ? "On Leave" : teacher.status}
            </Badge>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-3">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Experience</span>
            <span className="text-sm font-semibold text-card-foreground">{teacher.yearsOfExperience} years</span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-3">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Join Date</span>
            <span className="text-sm font-semibold text-card-foreground">{new Date(teacher.joinDate).toLocaleDateString("en-NG", { year: "numeric", month: "short" })}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-3">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Gender</span>
            <span className="text-sm font-semibold text-card-foreground">{teacher.gender}</span>
          </div>
        </div>

        <Separator />

        {/* Contact Info */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact Information</span>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground">Email</p>
                <p className="text-sm text-card-foreground">{teacher.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground">Phone</p>
                <p className="text-sm text-card-foreground">{teacher.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Teaching Assignment */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Teaching Assignment</span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-card-foreground">Subjects: <strong>{teacher.subjects.join(", ")}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-card-foreground">
                Class Teacher of: <strong>{teacher.classTeacherOf || "Not assigned"}</strong>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mt-1">
            <span className="text-xs text-muted-foreground">Assigned Classes ({teacher.assignedClasses.length})</span>
            <div className="flex flex-wrap gap-2">
              {teacher.assignedClasses.map((cls) => (
                <Badge key={cls} variant="secondary" className="text-xs">{cls}</Badge>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* Salary & Qualification */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-3">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Qualification</span>
            <div className="flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-semibold text-card-foreground">{teacher.qualification}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-3">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Monthly Salary</span>
            <span className="text-sm font-semibold text-card-foreground">NGN {teacher.salary.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </DialogContent>
  )
}

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [deptFilter, setDeptFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [viewingTeacher, setViewingTeacher] = useState<(typeof teachersExtended)[number] | null>(null)

  const filteredTeachers = teachersExtended.filter((teacher) => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesDept = deptFilter === "all" || teacher.department === deptFilter
    const matchesStatus = statusFilter === "all" || teacher.status === statusFilter
    return matchesSearch && matchesDept && matchesStatus
  })

  const activeCount = teachersExtended.filter(t => t.status === "active").length
  const onLeaveCount = teachersExtended.filter(t => t.status === "on_leave").length
  const totalSalary = teachersExtended.reduce((sum, t) => sum + t.salary, 0)
  const avgExperience = Math.round(teachersExtended.reduce((sum, t) => sum + t.yearsOfExperience, 0) / teachersExtended.length)

  return (
    <>
      <DashboardHeader
        title="Teacher Management"
        description="Manage teachers, qualifications, assignments, and departmental allocation"
      />

      <div className="p-6 flex flex-col gap-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {teachersExtended.length}
              </p>
              <p className="text-[11px] text-muted-foreground">Total Teachers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <GraduationCap className="h-5 w-5 text-accent" />
              </div>
              <p className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {activeCount}
              </p>
              <p className="text-[11px] text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
                <Calendar className="h-5 w-5 text-warning-foreground" />
              </div>
              <p className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {onLeaveCount}
              </p>
              <p className="text-[11px] text-muted-foreground">On Leave</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-4/10">
                <Award className="h-5 w-5 text-chart-4" />
              </div>
              <p className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {avgExperience} yrs
              </p>
              <p className="text-[11px] text-muted-foreground">Avg Experience</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-5/10">
                <Briefcase className="h-5 w-5 text-chart-5" />
              </div>
              <p className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {(totalSalary / 1_000_000).toFixed(1)}M
              </p>
              <p className="text-[11px] text-muted-foreground">Monthly Payroll</p>
            </CardContent>
          </Card>
        </div>

        {/* Teachers Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base font-semibold">All Teachers</CardTitle>
                <CardDescription>View and manage teacher profiles and assignments</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
                <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" /> Add Teacher
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle style={{ fontFamily: "var(--font-heading)" }}>Add New Teacher</DialogTitle>
                      <DialogDescription>Register a new teacher and set up their profile</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <Label>Full Name</Label>
                          <Input placeholder="Enter full name" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label>Gender</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <Label>Email</Label>
                          <Input type="email" placeholder="Enter email" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label>Phone</Label>
                          <Input type="tel" placeholder="+234..." />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <Label>Qualification</Label>
                          <Input placeholder="e.g. M.Sc Physics" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label>Years of Experience</Label>
                          <Input type="number" placeholder="0" min={0} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <Label>Department</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select dept" /></SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label>Subject</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Primary subject" /></SelectTrigger>
                            <SelectContent>
                              {subjects.filter(s => s.status === "active").map((sub) => (
                                <SelectItem key={sub.id} value={sub.name}>{sub.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Monthly Salary (NGN)</Label>
                        <Input type="number" placeholder="e.g. 250000" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                      <Button onClick={() => setAddDialogOpen(false)}>Add Teacher</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or subject..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={deptFilter} onValueChange={setDeptFilter}>
                <SelectTrigger className="w-44">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on_leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/50">
                    <TableHead className="text-xs font-semibold">Teacher</TableHead>
                    <TableHead className="text-xs font-semibold hidden md:table-cell">Department</TableHead>
                    <TableHead className="text-xs font-semibold">Subject(s)</TableHead>
                    <TableHead className="text-xs font-semibold hidden lg:table-cell">Classes</TableHead>
                    <TableHead className="text-xs font-semibold hidden lg:table-cell">Class Teacher</TableHead>
                    <TableHead className="text-xs font-semibold">Status</TableHead>
                    <TableHead className="text-xs font-semibold w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                              {teacher.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-card-foreground">{teacher.name}</p>
                            <p className="text-[11px] text-muted-foreground">{teacher.qualification}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-sm text-card-foreground">{teacher.department}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-card-foreground">{teacher.subjects.join(", ")}</span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {teacher.assignedClasses.slice(0, 3).map((cls) => (
                            <Badge key={cls} variant="secondary" className="text-[10px]">{cls}</Badge>
                          ))}
                          {teacher.assignedClasses.length > 3 && (
                            <Badge variant="secondary" className="text-[10px]">+{teacher.assignedClasses.length - 3}</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="text-sm text-muted-foreground">{teacher.classTeacherOf || "-"}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`text-[11px] ${
                          teacher.status === "active" ? "bg-accent/10 text-accent"
                          : teacher.status === "on_leave" ? "bg-warning/10 text-warning-foreground"
                          : "bg-destructive/10 text-destructive"
                        }`}>
                          {teacher.status === "on_leave" ? "On Leave" : teacher.status}
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
                            <DropdownMenuItem onClick={() => setViewingTeacher(teacher)}>
                              <Eye className="mr-2 h-4 w-4" /> View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Edit Teacher
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BookOpen className="mr-2 h-4 w-4" /> Assign Classes
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Remove Teacher
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-muted-foreground">
                Showing {filteredTeachers.length} of {teachersExtended.length} teachers
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Detail Dialog */}
      <Dialog open={!!viewingTeacher} onOpenChange={(open) => !open && setViewingTeacher(null)}>
        {viewingTeacher && <TeacherDetailDialog teacher={viewingTeacher} />}
      </Dialog>
    </>
  )
}
