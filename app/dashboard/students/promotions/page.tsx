"use client"

import { useState } from "react"
import {
  ArrowUpCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  Search,
  Download,
  Users,
  GraduationCap,
  TrendingUp,
  Award,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

// Mock promotion data
const promotionStudents = [
  { id: "STU001", name: "Amina Hassan",    regNo: "FISS/2024/001", currentClass: "JSS 3A", nextClass: "SS 1A",  average: 85.75, grade: "A",  attendance: 96, feeStatus: "paid",    status: "eligible" as const },
  { id: "STU002", name: "Emmanuel Obi",    regNo: "FISS/2024/002", currentClass: "SS 2B",  nextClass: "SS 3B",  average: 71.25, grade: "B",  attendance: 88, feeStatus: "partial", status: "eligible" as const },
  { id: "STU003", name: "Fatima Yusuf",    regNo: "FISS/2024/003", currentClass: "JSS 1A", nextClass: "JSS 2A", average: 61.25, grade: "C",  attendance: 72, feeStatus: "unpaid",  status: "review" as const },
  { id: "STU004", name: "David Adamu",     regNo: "FISS/2024/004", currentClass: "SS 3A",  nextClass: "Graduated", average: 90.0,  grade: "A+", attendance: 98, feeStatus: "paid",    status: "graduated" as const },
  { id: "STU005", name: "Grace Nwosu",     regNo: "FISS/2024/005", currentClass: "JSS 2B", nextClass: "JSS 3B", average: 78.75, grade: "B+", attendance: 91, feeStatus: "unpaid",  status: "review" as const },
  { id: "STU006", name: "Mohammed Ali",    regNo: "FISS/2024/006", currentClass: "SS 1A",  nextClass: "SS 2A",  average: 83.0,  grade: "A",  attendance: 95, feeStatus: "paid",    status: "eligible" as const },
  { id: "STU007", name: "Sarah Johnson",   regNo: "FISS/2024/007", currentClass: "JSS 3B", nextClass: "SS 1B",  average: 55.0,  grade: "D",  attendance: 65, feeStatus: "partial", status: "repeat" as const },
  { id: "STU008", name: "Peter Okoro",     regNo: "FISS/2024/008", currentClass: "SS 2A",  nextClass: "SS 3A",  average: 88.5,  grade: "A",  attendance: 97, feeStatus: "paid",    status: "eligible" as const },
  { id: "STU009", name: "Khadija Bello",   regNo: "FISS/2024/009", currentClass: "JSS 1B", nextClass: "JSS 2B", average: 74.0,  grade: "B",  attendance: 89, feeStatus: "paid",    status: "eligible" as const },
  { id: "STU010", name: "Chukwuemeka Ike", regNo: "FISS/2024/010", currentClass: "SS 1B",  nextClass: "SS 2B",  average: 48.0,  grade: "F",  attendance: 60, feeStatus: "unpaid",  status: "repeat" as const },
  { id: "STU011", name: "Aisha Garba",     regNo: "FISS/2024/011", currentClass: "JSS 2A", nextClass: "JSS 3A", average: 92.0,  grade: "A+", attendance: 99, feeStatus: "paid",    status: "eligible" as const },
  { id: "STU012", name: "Tunde Fashola",   regNo: "FISS/2024/012", currentClass: "SS 3B",  nextClass: "Graduated", average: 79.5,  grade: "B+", attendance: 93, feeStatus: "paid",    status: "graduated" as const },
]

const statusConfig = {
  eligible:   { label: "Eligible",   color: "bg-accent/15 text-accent border-accent/30",               icon: CheckCircle2,    iconColor: "text-accent" },
  review:     { label: "Under Review", color: "bg-yellow-500/15 text-yellow-700 border-yellow-400/30", icon: AlertTriangle,   iconColor: "text-yellow-500" },
  repeat:     { label: "Repeat Year", color: "bg-destructive/15 text-destructive border-destructive/30", icon: XCircle,       iconColor: "text-destructive" },
  graduated:  { label: "Graduated",  color: "bg-primary/15 text-primary border-primary/30",            icon: GraduationCap,  iconColor: "text-primary" },
}

const gradeColor = (grade: string) => {
  if (grade.startsWith("A")) return "text-accent font-semibold"
  if (grade.startsWith("B")) return "text-blue-600 font-semibold"
  if (grade.startsWith("C")) return "text-yellow-600 font-semibold"
  if (grade.startsWith("D")) return "text-orange-600 font-semibold"
  return "text-destructive font-semibold"
}

export default function PromotionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<typeof promotionStudents[0] | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [bulkConfirmOpen, setBulkConfirmOpen] = useState(false)
  const [promoted, setPromoted] = useState<string[]>([])

  const filtered = promotionStudents.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.regNo.toLowerCase().includes(searchQuery.toLowerCase())
    const matchClass  = classFilter === "all"  || s.currentClass === classFilter
    const matchStatus = statusFilter === "all" || s.status === statusFilter
    return matchSearch && matchClass && matchStatus
  })

  const eligible   = promotionStudents.filter((s) => s.status === "eligible").length
  const review     = promotionStudents.filter((s) => s.status === "review").length
  const repeat     = promotionStudents.filter((s) => s.status === "repeat").length
  const graduated  = promotionStudents.filter((s) => s.status === "graduated").length
  const total      = promotionStudents.length
  const promotionRate = Math.round(((eligible + graduated) / total) * 100)

  const uniqueClasses = Array.from(new Set(promotionStudents.map((s) => s.currentClass))).sort()

  const handlePromote = () => {
    if (!selectedStudent) return
    setPromoted((prev) => [...prev, selectedStudent.id])
    setConfirmOpen(false)
    setSelectedStudent(null)
  }

  const handleBulkPromote = () => {
    const eligibleIds = promotionStudents
      .filter((s) => s.status === "eligible")
      .map((s) => s.id)
    setPromoted(eligibleIds)
    setBulkConfirmOpen(false)
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <DashboardHeader
        title="Student Promotions"
        description="Review and process end-of-term student promotions for the 2025/2026 academic session."
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Students",   value: total,          icon: Users,         color: "text-primary",     bg: "bg-primary/10" },
          { label: "Eligible",         value: eligible,       icon: CheckCircle2,  color: "text-accent",      bg: "bg-accent/10" },
          { label: "Under Review",     value: review,         icon: AlertTriangle, color: "text-yellow-600",  bg: "bg-yellow-500/10" },
          { label: "Repeat Year",      value: repeat,         icon: XCircle,       color: "text-destructive", bg: "bg-destructive/10" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className={`rounded-lg p-2 ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Promotion Rate Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Overall Promotion Rate
              </CardTitle>
              <CardDescription>Percentage of students eligible for promotion or graduation this term</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1 bg-accent/10 text-accent border-accent/30">
                <Award className="h-3 w-3" />
                {graduated} Graduating
              </Badge>
              <span className="text-3xl font-bold text-accent">{promotionRate}%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={promotionRate} className="h-3" />
          <div className="mt-2 flex gap-6 text-sm text-muted-foreground">
            <span className="text-accent">● Eligible / Graduated: {eligible + graduated}</span>
            <span className="text-yellow-600">● Under Review: {review}</span>
            <span className="text-destructive">● Repeat: {repeat}</span>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Promotion List</CardTitle>
              <CardDescription>All students pending promotion review for Term 2 ending</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button
                size="sm"
                className="gap-1"
                onClick={() => setBulkConfirmOpen(true)}
              >
                <ArrowUpCircle className="h-4 w-4" />
                Promote All Eligible
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-2 pt-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or reg. number..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {uniqueClasses.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="eligible">Eligible</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
                <SelectItem value="repeat">Repeat Year</SelectItem>
                <SelectItem value="graduated">Graduated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Reg. No.</TableHead>
                <TableHead>Current Class</TableHead>
                <TableHead className="hidden md:table-cell">Next Class</TableHead>
                <TableHead className="hidden sm:table-cell">Average</TableHead>
                <TableHead className="hidden lg:table-cell">Attendance</TableHead>
                <TableHead className="hidden lg:table-cell">Fee Status</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="py-12 text-center text-muted-foreground">
                    No students match your search criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((student) => {
                  const cfg = statusConfig[student.status]
                  const StatusIcon = cfg.icon
                  const isPromoted = promoted.includes(student.id)
                  return (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                              {student.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{student.regNo}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.currentClass}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {student.nextClass === "Graduated" ? (
                          <Badge className="bg-primary/15 text-primary border border-primary/30 hover:bg-primary/20">
                            <GraduationCap className="mr-1 h-3 w-3" />
                            Graduated
                          </Badge>
                        ) : (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <ChevronRight className="h-3 w-3" />
                            {student.nextClass}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span className={gradeColor(student.grade)}>
                          {student.average.toFixed(1)}% ({student.grade})
                        </span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={student.attendance}
                            className="h-1.5 w-16"
                          />
                          <span className="text-sm">{student.attendance}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge
                          variant="outline"
                          className={
                            student.feeStatus === "paid"
                              ? "bg-accent/10 text-accent border-accent/30"
                              : student.feeStatus === "partial"
                              ? "bg-yellow-500/10 text-yellow-700 border-yellow-400/30"
                              : "bg-destructive/10 text-destructive border-destructive/30"
                          }
                        >
                          {student.feeStatus.charAt(0).toUpperCase() + student.feeStatus.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`gap-1 ${cfg.color}`}
                        >
                          <StatusIcon className={`h-3 w-3 ${cfg.iconColor}`} />
                          {cfg.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {isPromoted ? (
                          <Badge className="bg-accent/15 text-accent border border-accent/30 hover:bg-accent/20">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Promoted
                          </Badge>
                        ) : student.status === "eligible" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 gap-1 text-xs"
                            onClick={() => { setSelectedStudent(student); setConfirmOpen(true) }}
                          >
                            <ArrowUpCircle className="h-3 w-3" />
                            Promote
                          </Button>
                        ) : student.status === "graduated" ? (
                          <Button size="sm" variant="outline" className="h-7 gap-1 text-xs" disabled>
                            <GraduationCap className="h-3 w-3" />
                            Completed
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="h-7 text-xs" disabled>
                            Pending Review
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Single promote dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Promotion</DialogTitle>
            <DialogDescription>
              Are you sure you want to promote{" "}
              <strong>{selectedStudent?.name}</strong> from{" "}
              <strong>{selectedStudent?.currentClass}</strong> to{" "}
              <strong>{selectedStudent?.nextClass}</strong>?
              This action will be recorded in the student&apos;s academic history.
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="rounded-lg border bg-muted/40 p-4 text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Academic Average</span>
                <span className={gradeColor(selectedStudent.grade)}>
                  {selectedStudent.average.toFixed(1)}% — Grade {selectedStudent.grade}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Attendance Rate</span>
                <span>{selectedStudent.attendance}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fee Status</span>
                <span className="capitalize">{selectedStudent.feeStatus}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button onClick={handlePromote}>
              <ArrowUpCircle className="mr-2 h-4 w-4" />
              Confirm Promotion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk promote dialog */}
      <Dialog open={bulkConfirmOpen} onOpenChange={setBulkConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Promote All Eligible Students</DialogTitle>
            <DialogDescription>
              This will promote all <strong>{eligible}</strong> eligible students to their
              respective next classes. Students under review or repeating will not be affected.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border bg-muted/40 p-4 text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Students to be promoted</span>
              <span className="font-semibold text-accent">{eligible}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Skipped (under review)</span>
              <span className="text-yellow-600">{review}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Skipped (repeat year)</span>
              <span className="text-destructive">{repeat}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkConfirmOpen(false)}>Cancel</Button>
            <Button onClick={handleBulkPromote}>
              <ArrowUpCircle className="mr-2 h-4 w-4" />
              Promote {eligible} Students
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
