"use client"

import { useState, useEffect } from "react"
import { api, getResults } from "@/lib/api-client"
import {
  Search,
  Plus,
  MoreHorizontal,
  Users,
  BookOpen,
  MapPin,
  Edit,
  Trash2,
  Eye,
  GraduationCap,
  BarChart3,
  Filter,
  Download,
  ArrowUpDown,
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
import { Separator } from "@/components/ui/separator"


function ClassDetailDialog({ cls }: { cls: any }) {
  return (
    <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle style={{ fontFamily: "var(--font-heading)" }} className="text-lg">
          {cls.name} - Class Details
        </DialogTitle>
        <DialogDescription>
          Complete information about this class
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-5 py-2">
        {/* Class Info Summary */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Section", value: cls.section },
            { label: "Room", value: cls.room },
            { label: "Capacity", value: `${cls.studentCount ?? cls.students ?? 0}/${cls.capacity}` },
            { label: "Status", value: cls.status },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1 rounded-lg bg-muted/50 p-3">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{item.label}</span>
              <span className="text-sm font-semibold text-card-foreground">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Capacity Progress */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-card-foreground">Capacity Utilization</span>
            <span className="text-sm text-muted-foreground">{cls.capacity ? Math.round(((cls.studentCount ?? cls.students ?? 0) / cls.capacity) * 100) : 0}%</span>
          </div>
          <Progress value={cls.capacity ? ((cls.studentCount ?? cls.students ?? 0) / cls.capacity) * 100 : 0} className="h-2.5" />
        </div>

        <Separator />

        {/* Class Teacher */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Class Teacher</span>
          <div className="flex items-center gap-3 rounded-lg border border-border p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
              {(cls.classTeacherName || cls.classTeacher || "").split(" ").map((n: string) => n[0]).join("")}
            </div>
            <div>
              <p className="text-sm font-medium text-card-foreground">{cls.classTeacherName || cls.classTeacher}</p>
              <p className="text-xs text-muted-foreground">Class Teacher</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Subjects */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Subjects Offered ({(cls.subjectNames || cls.subjects || []).length})
          </span>
          <div className="flex flex-wrap gap-2">
            {(cls.subjectNames || cls.subjects || []).map((subject: string) => (
              <Badge key={subject} variant="secondary" className="text-xs">
                {subject}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  )
}

export default function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sectionFilter, setSectionFilter] = useState("all")
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [viewingClass, setViewingClass] = useState<any>(null)
  const [classes, setClasses] = useState<any[]>([])
  const [teachers, setTeachers] = useState<any[]>([])
  const [subjectsList, setSubjectsList] = useState<any[]>([])

  useEffect(() => {
    api.get("/api/classes/").then(r => setClasses(getResults(r.data))).catch(() => {})
    api.get("/api/teachers/").then(r => setTeachers(getResults(r.data))).catch(() => {})
    api.get("/api/subjects/").then(r => setSubjectsList(getResults(r.data))).catch(() => {})
  }, [])

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cls.classTeacherName || cls.classTeacher || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.room.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSection = sectionFilter === "all" || cls.section.toLowerCase() === sectionFilter
    return matchesSearch && matchesSection
  })

  const totalStudents = classes.reduce((sum, c) => sum + (c.studentCount ?? c.students ?? 0), 0)
  const totalCapacity = classes.reduce((sum, c) => sum + (c.capacity ?? 0), 0)
  const juniorClasses = classes.filter((c) => c.section === "Junior")
  const seniorClasses = classes.filter((c) => c.section === "Senior")

  return (
    <>
      <DashboardHeader
        title="Classes Management"
        description="Manage all classes, sections, arms, and room assignments"
      />

      <div className="p-6 flex flex-col gap-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {classes.length}
              </p>
              <p className="text-[11px] text-muted-foreground">Total Classes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <p className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {totalStudents.toLocaleString()}
              </p>
              <p className="text-[11px] text-muted-foreground">Total Students</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-3/10">
                <GraduationCap className="h-5 w-5 text-chart-3" />
              </div>
              <p className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {juniorClasses.length}
              </p>
              <p className="text-[11px] text-muted-foreground">Junior Classes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-4/10">
                <GraduationCap className="h-5 w-5 text-chart-4" />
              </div>
              <p className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {seniorClasses.length}
              </p>
              <p className="text-[11px] text-muted-foreground">Senior Classes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-5/10">
                <BarChart3 className="h-5 w-5 text-chart-5" />
              </div>
              <p className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {Math.round((totalStudents / totalCapacity) * 100)}%
              </p>
              <p className="text-[11px] text-muted-foreground">Capacity Used</p>
            </CardContent>
          </Card>
        </div>

        {/* Capacity Overview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Class Capacity Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {classes.map((cls) => {
                const studentCount = cls.studentCount ?? cls.students ?? 0
                const percentage = cls.capacity ? Math.round((studentCount / cls.capacity) * 100) : 0
                return (
                  <div key={cls.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary shrink-0">
                      {cls.name.replace("SS ", "S").replace("JSS ", "J")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-card-foreground">{cls.name}</span>
                        <span className="text-xs text-muted-foreground">{cls.studentCount ?? cls.students ?? 0}/{cls.capacity}</span>
                      </div>
                      <Progress
                        value={percentage}
                        className={`h-1.5 ${percentage > 90 ? "[&>div]:bg-destructive" : percentage > 75 ? "[&>div]:bg-warning" : ""}`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Classes Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base font-semibold">All Classes</CardTitle>
                <CardDescription>Manage class details, teachers, and assignments</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
                <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" /> Add Class
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle style={{ fontFamily: "var(--font-heading)" }}>Add New Class</DialogTitle>
                      <DialogDescription>Create a new class with room and teacher assignment</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <Label>Level</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="JSS 1">JSS 1</SelectItem>
                              <SelectItem value="JSS 2">JSS 2</SelectItem>
                              <SelectItem value="JSS 3">JSS 3</SelectItem>
                              <SelectItem value="SS 1">SS 1</SelectItem>
                              <SelectItem value="SS 2">SS 2</SelectItem>
                              <SelectItem value="SS 3">SS 3</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label>Arm</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select arm" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A">A</SelectItem>
                              <SelectItem value="B">B</SelectItem>
                              <SelectItem value="C">C</SelectItem>
                              <SelectItem value="D">D</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Capacity</Label>
                        <Input type="number" placeholder="Maximum number of students" defaultValue={40} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Room / Location</Label>
                        <Input placeholder="e.g. Block A, Room 101" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Class Teacher</Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="Assign a class teacher" /></SelectTrigger>
                          <SelectContent>
                            {teachers.filter((t: any) => t.status === "active").map((teacher: any) => (
                              <SelectItem key={teacher.id} value={String(teacher.id)}>{teacher.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                      <Button onClick={() => setAddDialogOpen(false)}>Create Class</Button>
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
                  placeholder="Search by class name, teacher, or room..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={sectionFilter} onValueChange={setSectionFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  <SelectItem value="junior">Junior (JSS)</SelectItem>
                  <SelectItem value="senior">Senior (SS)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/50">
                    <TableHead className="text-xs font-semibold">Class</TableHead>
                    <TableHead className="text-xs font-semibold">Section</TableHead>
                    <TableHead className="text-xs font-semibold hidden md:table-cell">Class Teacher</TableHead>
                    <TableHead className="text-xs font-semibold hidden lg:table-cell">Room</TableHead>
                    <TableHead className="text-xs font-semibold">Students</TableHead>
                    <TableHead className="text-xs font-semibold hidden md:table-cell">Subjects</TableHead>
                    <TableHead className="text-xs font-semibold">Status</TableHead>
                    <TableHead className="text-xs font-semibold w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClasses.map((cls) => (
                    <TableRow key={cls.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                            {cls.arm}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-card-foreground">{cls.name}</p>
                            <p className="text-[11px] text-muted-foreground">{cls.level}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`text-[11px] ${cls.section === "Junior" ? "bg-chart-3/10 text-chart-3" : "bg-chart-4/10 text-chart-4"}`}>
                          {cls.section}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-sm text-card-foreground">{cls.classTeacherName || cls.classTeacher || "—"}</span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          {cls.room}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-card-foreground">{cls.studentCount ?? cls.students ?? 0}</span>
                          <span className="text-xs text-muted-foreground">/ {cls.capacity}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-sm text-muted-foreground">{(cls.subjectNames || cls.subjects || []).length} subjects</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-[11px] bg-accent/10 text-accent">
                          {cls.status}
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
                            <DropdownMenuItem onClick={() => setViewingClass(cls)}>
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Edit Class
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" /> View Students
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete Class
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-muted-foreground">
                Showing {filteredClasses.length} of {classes.length} classes
              </p>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled className="text-xs">Previous</Button>
                <Button variant="outline" size="sm" className="text-xs bg-primary text-primary-foreground">1</Button>
                <Button variant="outline" size="sm" className="text-xs">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Detail Dialog */}
      <Dialog open={!!viewingClass} onOpenChange={(open) => !open && setViewingClass(null)}>
        {viewingClass && <ClassDetailDialog cls={viewingClass} />}
      </Dialog>
    </>
  )
}
