"use client"

import { useState, useEffect } from "react"
import { api, getResults } from "@/lib/api-client"
import {
  Search,
  Plus,
  MoreHorizontal,
  BookOpen,
  Edit,
  Eye,
  Filter,
  Download,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  GraduationCap,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
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


function LessonPlanDetailDialog({ plan }: { plan: any }) {
  return (
    <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle style={{ fontFamily: "var(--font-heading)" }} className="text-lg">
          {plan.topic}
        </DialogTitle>
        <DialogDescription>{plan.subjectName || plan.subject} | {plan.className || plan.class}</DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-4 py-2">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-3">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Week</span>
            <span className="text-sm font-semibold text-card-foreground">{plan.week}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-3">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Date</span>
            <span className="text-sm font-semibold text-card-foreground">
              {new Date(plan.date).toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" })}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-3">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Teacher</span>
            <span className="text-sm font-semibold text-card-foreground">{plan.teacher}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-muted/50 p-3">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Status</span>
            <Badge variant="secondary" className={`text-xs w-fit ${plan.status === "completed" ? "bg-accent/10 text-accent" : "bg-chart-3/10 text-chart-3"}`}>
              {plan.status}
            </Badge>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Learning Objectives</span>
          <p className="text-sm text-card-foreground leading-relaxed">{plan.objectives}</p>
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Resources & Materials</span>
          <div className="flex flex-wrap gap-2">
            {String(plan.resources || "").split(", ").map((resource: string) => (
              <Badge key={resource} variant="secondary" className="text-xs">{resource}</Badge>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  )
}

export default function LessonPlansPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [viewingPlan, setViewingPlan] = useState<any>(null)
  const [lessonPlansData, setLessonPlansData] = useState<any[]>([])
  const [subjectsData, setSubjectsData] = useState<any[]>([])
  const [classes, setClasses] = useState<any[]>([])
  const [teachers, setTeachers] = useState<any[]>([])

  useEffect(() => {
    api.get("/api/lesson-plans/").then(r => setLessonPlansData(getResults(r.data))).catch(() => {})
    api.get("/api/subjects/").then(r => setSubjectsData(getResults(r.data))).catch(() => {})
    api.get("/api/classes/").then(r => setClasses(getResults(r.data))).catch(() => {})
    api.get("/api/teachers/").then(r => setTeachers(getResults(r.data))).catch(() => {})
  }, [])

  const filteredPlans = lessonPlansData.filter((plan) => {
    const matchesSearch = plan.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (plan.teacherName || plan.teacher || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (plan.subjectName || plan.subject || "").toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = subjectFilter === "all" || (plan.subjectName || plan.subject) === subjectFilter
    const matchesStatus = statusFilter === "all" || plan.status === statusFilter
    return matchesSearch && matchesSubject && matchesStatus
  })

  const completedCount = lessonPlansData.filter(p => p.status === "completed").length
  const upcomingCount = lessonPlansData.filter(p => p.status === "upcoming").length
  const uniqueSubjects = [...new Set(lessonPlansData.map((p: any) => p.subjectName || p.subject).filter(Boolean))]

  return (
    <>
      <DashboardHeader
        title="Lesson Plans & Curriculum"
        description="Manage lesson plans, track curriculum delivery, and review teaching progress"
      />

      <div className="p-6 flex flex-col gap-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {lessonPlansData.length}
              </p>
              <p className="text-[11px] text-muted-foreground">Total Plans</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <CheckCircle className="h-5 w-5 text-accent" />
              </div>
              <p className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {completedCount}
              </p>
              <p className="text-[11px] text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-3/10">
                <Clock className="h-5 w-5 text-chart-3" />
              </div>
              <p className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {upcomingCount}
              </p>
              <p className="text-[11px] text-muted-foreground">Upcoming</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center gap-1.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-4/10">
                <BookOpen className="h-5 w-5 text-chart-4" />
              </div>
              <p className="text-2xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {uniqueSubjects.length}
              </p>
              <p className="text-[11px] text-muted-foreground">Subjects Covered</p>
            </CardContent>
          </Card>
        </div>

        {/* Lesson Plans Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Lesson Plans</CardTitle>
                <CardDescription>Review and manage all submitted lesson plans</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
                <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" /> Add Plan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle style={{ fontFamily: "var(--font-heading)" }}>Create Lesson Plan</DialogTitle>
                      <DialogDescription>Add a new lesson plan to the curriculum tracker</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <Label>Subject</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                              {subjectsData.filter((s: any) => s.status === "active").map((sub: any) => (
                                <SelectItem key={sub.id} value={sub.name}>{sub.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label>Class</Label>
                          <Select>
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                              {classes.map((cls: any) => (
                                <SelectItem key={cls.id} value={cls.name}>{cls.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Topic</Label>
                        <Input placeholder="Lesson topic" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <Label>Week</Label>
                          <Input placeholder="e.g. Week 9" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label>Date</Label>
                          <Input type="date" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Teacher</Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="Select teacher" /></SelectTrigger>
                          <SelectContent>
                            {teachers.filter((t: any) => t.status === "active").map((t: any) => (
                              <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Learning Objectives</Label>
                        <Textarea placeholder="What students should be able to do after this lesson..." rows={3} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label>Resources & Materials</Label>
                        <Input placeholder="e.g. Textbook Ch.5, Worksheets, Calculator" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                      <Button onClick={() => setAddDialogOpen(false)}>Create Plan</Button>
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
                  placeholder="Search by topic, subject, or teacher..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-44">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {uniqueSubjects.map((sub) => (
                    <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/50">
                    <TableHead className="text-xs font-semibold">Topic</TableHead>
                    <TableHead className="text-xs font-semibold">Subject</TableHead>
                    <TableHead className="text-xs font-semibold hidden md:table-cell">Class</TableHead>
                    <TableHead className="text-xs font-semibold hidden md:table-cell">Teacher</TableHead>
                    <TableHead className="text-xs font-semibold hidden lg:table-cell">Week</TableHead>
                    <TableHead className="text-xs font-semibold">Status</TableHead>
                    <TableHead className="text-xs font-semibold w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium text-card-foreground">{plan.topic}</p>
                          <p className="text-[11px] text-muted-foreground line-clamp-1 max-w-52">{plan.objectives}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-[11px]">{plan.subjectName || plan.subject}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-sm text-card-foreground">{plan.className || plan.class}</span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-sm text-muted-foreground">{plan.teacherName || plan.teacher}</span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="text-sm text-muted-foreground">{plan.week}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`text-[11px] ${plan.status === "completed" ? "bg-accent/10 text-accent" : "bg-chart-3/10 text-chart-3"}`}>
                          {plan.status}
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
                            <DropdownMenuItem onClick={() => setViewingPlan(plan)}>
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Edit Plan
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
                Showing {filteredPlans.length} of {lessonPlansData.length} lesson plans
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Detail Dialog */}
      <Dialog open={!!viewingPlan} onOpenChange={(open) => !open && setViewingPlan(null)}>
        {viewingPlan && <LessonPlanDetailDialog plan={viewingPlan} />}
      </Dialog>
    </>
  )
}
