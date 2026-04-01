"use client"

import { useState } from "react"
import { Search, Download, Printer, FileText, GraduationCap, Award } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

const reportCardData = [
  { id: "R001", studentName: "Amina Hassan",   regNo: "FISS/2024/001", class: "JSS 3A", position: 1,  outOf: 32, term: "Term 2, 2025/2026", average: 85.75, grade: "A",  status: "published", subjects: [
    { name: "Mathematics",    ca: 28, exam: 57, total: 85, grade: "A",  position: 1 },
    { name: "English",        ca: 25, exam: 53, total: 78, grade: "B+", position: 2 },
    { name: "Science",        ca: 30, exam: 62, total: 92, grade: "A+", position: 1 },
    { name: "Social Studies", ca: 28, exam: 60, total: 88, grade: "A",  position: 1 },
    { name: "Civic Edu.",     ca: 22, exam: 58, total: 80, grade: "A",  position: 2 },
    { name: "Comp. Science",  ca: 26, exam: 56, total: 82, grade: "A",  position: 1 },
  ]},
  { id: "R002", studentName: "David Adamu",    regNo: "FISS/2024/004", class: "SS 3A",  position: 1,  outOf: 29, term: "Term 2, 2025/2026", average: 90.00, grade: "A+", status: "published", subjects: [
    { name: "Mathematics",    ca: 30, exam: 62, total: 92, grade: "A+", position: 1 },
    { name: "English",        ca: 28, exam: 60, total: 88, grade: "A",  position: 1 },
    { name: "Physics",        ca: 30, exam: 65, total: 95, grade: "A+", position: 1 },
    { name: "Chemistry",      ca: 27, exam: 58, total: 85, grade: "A",  position: 1 },
    { name: "Biology",        ca: 25, exam: 60, total: 85, grade: "A",  position: 1 },
    { name: "Economics",      ca: 26, exam: 59, total: 85, grade: "A",  position: 1 },
  ]},
  { id: "R003", studentName: "Emmanuel Obi",   regNo: "FISS/2024/002", class: "SS 2B",  position: 5,  outOf: 31, term: "Term 2, 2025/2026", average: 71.25, grade: "B",  status: "published", subjects: [
    { name: "Mathematics",    ca: 22, exam: 50, total: 72, grade: "B",  position: 5 },
    { name: "English",        ca: 20, exam: 45, total: 65, grade: "C+", position: 8 },
    { name: "Physics",        ca: 24, exam: 54, total: 78, grade: "B+", position: 4 },
    { name: "Chemistry",      ca: 20, exam: 50, total: 70, grade: "B",  position: 6 },
    { name: "Biology",        ca: 22, exam: 53, total: 75, grade: "B+", position: 5 },
    { name: "Economics",      ca: 18, exam: 49, total: 67, grade: "C+", position: 9 },
  ]},
  { id: "R004", studentName: "Aisha Garba",    regNo: "FISS/2024/011", class: "JSS 2A", position: 1,  outOf: 30, term: "Term 2, 2025/2026", average: 93.00, grade: "A+", status: "published", subjects: [
    { name: "Mathematics",    ca: 30, exam: 66, total: 96, grade: "A+", position: 1 },
    { name: "English",        ca: 29, exam: 63, total: 92, grade: "A+", position: 1 },
    { name: "Science",        ca: 28, exam: 62, total: 90, grade: "A",  position: 1 },
    { name: "Social Studies", ca: 29, exam: 65, total: 94, grade: "A+", position: 1 },
    { name: "French",         ca: 27, exam: 60, total: 87, grade: "A",  position: 1 },
    { name: "Comp. Science",  ca: 28, exam: 61, total: 89, grade: "A",  position: 1 },
  ]},
  { id: "R005", studentName: "Chukwuemeka Ike", regNo: "FISS/2024/010", class: "SS 1B", position: 28, outOf: 36, term: "Term 2, 2025/2026", average: 43.75, grade: "F",  status: "pending", subjects: [
    { name: "Mathematics",    ca: 12, exam: 30, total: 42, grade: "F",  position: 28 },
    { name: "English",        ca: 10, exam: 28, total: 38, grade: "F",  position: 29 },
    { name: "Physics",        ca: 14, exam: 36, total: 50, grade: "D",  position: 26 },
    { name: "Chemistry",      ca: 12, exam: 33, total: 45, grade: "D",  position: 27 },
    { name: "Biology",        ca: 11, exam: 35, total: 46, grade: "D",  position: 25 },
    { name: "Economics",      ca: 10, exam: 32, total: 42, grade: "F",  position: 30 },
  ]},
]

const gradeColor = (grade: string) => {
  if (grade.startsWith("A")) return "text-accent font-semibold"
  if (grade.startsWith("B")) return "text-blue-600 font-semibold"
  if (grade.startsWith("C")) return "text-yellow-600 font-semibold"
  if (grade.startsWith("D")) return "text-orange-600 font-semibold"
  return "text-destructive font-semibold"
}

export default function ReportCardsPage() {
  const [search, setSearch] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [selectedReport, setSelectedReport] = useState<typeof reportCardData[0] | null>(null)

  const filtered = reportCardData.filter((r) => {
    const q = search.toLowerCase()
    return (
      (r.studentName.toLowerCase().includes(q) || r.regNo.toLowerCase().includes(q)) &&
      (classFilter === "all" || r.class === classFilter)
    )
  })

  const uniqueClasses = Array.from(new Set(reportCardData.map((r) => r.class))).sort()
  const published = reportCardData.filter((r) => r.status === "published").length

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <DashboardHeader title="Report Cards" description="Generate and distribute end-of-term student report cards." />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Reports",  value: reportCardData.length, icon: FileText,       color: "text-primary",     bg: "bg-primary/10" },
          { label: "Published",      value: published,             icon: Award,          color: "text-accent",      bg: "bg-accent/10" },
          { label: "Pending",        value: reportCardData.length - published, icon: GraduationCap, color: "text-yellow-600", bg: "bg-yellow-500/10" },
          { label: "Classes",        value: uniqueClasses.length,  icon: Download,       color: "text-blue-600",    bg: "bg-blue-500/10" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className={`rounded-lg p-2 ${bg}`}><Icon className={`h-5 w-5 ${color}`} /></div>
              <div><p className="text-2xl font-bold">{value}</p><p className="text-sm text-muted-foreground">{label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Report Card List</CardTitle>
              <CardDescription>Term 2, 2025/2026 · Click &quot;View&quot; to open full report card</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1"><Download className="h-4 w-4" />Export All</Button>
          </div>
          <div className="flex flex-col gap-2 pt-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search student..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="All Classes" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {uniqueClasses.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Average</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{r.studentName}</p>
                      <p className="text-xs font-mono text-muted-foreground">{r.regNo}</p>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="outline">{r.class}</Badge></TableCell>
                  <TableCell className="text-center">{r.position} / {r.outOf}</TableCell>
                  <TableCell><span className={gradeColor(r.grade)}>{r.average.toFixed(1)}%</span></TableCell>
                  <TableCell><span className={gradeColor(r.grade)}>{r.grade}</span></TableCell>
                  <TableCell>
                    <Badge variant="outline" className={r.status === "published" ? "bg-accent/10 text-accent border-accent/30" : "bg-yellow-500/10 text-yellow-700 border-yellow-400/30"}>
                      {r.status === "published" ? "Published" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="outline" size="sm" className="h-7 gap-1 text-xs" onClick={() => setSelectedReport(r)}>
                        <FileText className="h-3 w-3" />View
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                        <Printer className="h-3 w-3" />Print
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Report Card Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Report Card — {selectedReport?.studentName}</DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              {/* Header info */}
              <div className="rounded-lg border bg-primary/5 p-4 text-center">
                <p className="text-lg font-bold text-primary">FARUKAKTAS SCHOOL</p>
                <p className="text-sm text-muted-foreground">Student Academic Report — {selectedReport.term}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Name:</span> <span className="font-medium">{selectedReport.studentName}</span></div>
                <div><span className="text-muted-foreground">Reg. No.:</span> <span className="font-mono">{selectedReport.regNo}</span></div>
                <div><span className="text-muted-foreground">Class:</span> <span className="font-medium">{selectedReport.class}</span></div>
                <div><span className="text-muted-foreground">Position:</span> <span className="font-medium">{selectedReport.position} of {selectedReport.outOf}</span></div>
              </div>
              <Separator />
              {/* Subject scores */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-center">CA (30)</TableHead>
                    <TableHead className="text-center">Exam (70)</TableHead>
                    <TableHead className="text-center">Total</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                    <TableHead className="text-center">Position</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedReport.subjects.map((s) => (
                    <TableRow key={s.name}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell className="text-center">{s.ca}</TableCell>
                      <TableCell className="text-center">{s.exam}</TableCell>
                      <TableCell className="text-center font-semibold">{s.total}</TableCell>
                      <TableCell className={`text-center ${gradeColor(s.grade)}`}>{s.grade}</TableCell>
                      <TableCell className="text-center">{s.position}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Separator />
              <div className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3">
                <span className="font-medium">Overall Average</span>
                <span className={`text-xl font-bold ${gradeColor(selectedReport.grade)}`}>
                  {selectedReport.average.toFixed(1)}% — {selectedReport.grade}
                </span>
              </div>
              <Progress value={selectedReport.average} className="h-2" />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" className="gap-2"><Printer className="h-4 w-4" />Print</Button>
                <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Download PDF</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
