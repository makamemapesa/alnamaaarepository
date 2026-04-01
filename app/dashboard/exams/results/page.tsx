"use client"

import { useState } from "react"
import { Search, Download, TrendingUp, Award, Users, BarChart2 } from "lucide-react"
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
import { Progress } from "@/components/ui/progress"
import { examResults, classesExtended } from "@/lib/mock-data"

const extendedResults = [
  { id: "R001", studentName: "Amina Hassan",     regNo: "FISS/2024/001", class: "JSS 3A", math: 85, english: 78, science: 92, social: 88, total: 343, average: 85.75, grade: "A",  position: 1, status: "passed" as const },
  { id: "R002", studentName: "David Adamu",       regNo: "FISS/2024/004", class: "SS 3A",  math: 92, english: 88, science: 95, social: 85, total: 360, average: 90.00, grade: "A+", position: 1, status: "passed" as const },
  { id: "R003", studentName: "Emmanuel Obi",      regNo: "FISS/2024/002", class: "SS 2B",  math: 72, english: 65, science: 78, social: 70, total: 285, average: 71.25, grade: "B",  position: 5, status: "passed" as const },
  { id: "R004", studentName: "Fatima Yusuf",      regNo: "FISS/2024/003", class: "JSS 1A", math: 60, english: 55, science: 68, social: 62, total: 245, average: 61.25, grade: "C",  position: 12, status: "passed" as const },
  { id: "R005", studentName: "Grace Nwosu",       regNo: "FISS/2024/005", class: "JSS 2B", math: 78, english: 82, science: 75, social: 80, total: 315, average: 78.75, grade: "B+", position: 3, status: "passed" as const },
  { id: "R006", studentName: "Mohammed Ali",      regNo: "FISS/2024/006", class: "SS 1A",  math: 88, english: 90, science: 85, social: 92, total: 355, average: 88.75, grade: "A",  position: 2, status: "passed" as const },
  { id: "R007", studentName: "Sarah Johnson",     regNo: "FISS/2024/007", class: "JSS 3A", math: 55, english: 58, science: 50, social: 52, total: 215, average: 53.75, grade: "D",  position: 18, status: "passed" as const },
  { id: "R008", studentName: "Peter Okoro",       regNo: "FISS/2024/008", class: "SS 2A",  math: 88, english: 76, science: 91, social: 84, total: 339, average: 84.75, grade: "A",  position: 2, status: "passed" as const },
  { id: "R009", studentName: "Khadija Bello",     regNo: "FISS/2024/009", class: "JSS 1A", math: 74, english: 80, science: 69, social: 72, total: 295, average: 73.75, grade: "B",  position: 6, status: "passed" as const },
  { id: "R010", studentName: "Chukwuemeka Ike",   regNo: "FISS/2024/010", class: "SS 1B",  math: 42, english: 38, science: 50, social: 45, total: 175, average: 43.75, grade: "F",  position: 28, status: "failed" as const },
  { id: "R011", studentName: "Aisha Garba",       regNo: "FISS/2024/011", class: "JSS 2A", math: 96, english: 92, science: 90, social: 94, total: 372, average: 93.00, grade: "A+", position: 1, status: "passed" as const },
  { id: "R012", studentName: "Tunde Fashola",     regNo: "FISS/2024/012", class: "SS 3B",  math: 79, english: 82, science: 77, social: 80, total: 318, average: 79.50, grade: "B+", position: 4, status: "passed" as const },
]

const gradeColor = (grade: string) => {
  if (grade.startsWith("A")) return "text-accent font-semibold"
  if (grade.startsWith("B")) return "text-blue-600 font-semibold"
  if (grade.startsWith("C")) return "text-yellow-600 font-semibold"
  if (grade.startsWith("D")) return "text-orange-600 font-semibold"
  return "text-destructive font-semibold"
}

export default function ResultsPage() {
  const [search, setSearch] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [gradeFilter, setGradeFilter] = useState("all")

  const filtered = extendedResults.filter((r) => {
    const q = search.toLowerCase()
    return (
      (r.studentName.toLowerCase().includes(q) || r.regNo.toLowerCase().includes(q)) &&
      (classFilter === "all" || r.class === classFilter) &&
      (gradeFilter === "all" || r.grade.startsWith(gradeFilter))
    )
  })

  const passed = extendedResults.filter((r) => r.status === "passed").length
  const failed = extendedResults.filter((r) => r.status === "failed").length
  const passRate = Math.round((passed / extendedResults.length) * 100)
  const overallAvg = (extendedResults.reduce((s, r) => s + r.average, 0) / extendedResults.length).toFixed(1)
  const uniqueClasses = Array.from(new Set(extendedResults.map((r) => r.class))).sort()

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <DashboardHeader title="Examination Results" description="View and manage student examination results for Term 2, 2025/2026." />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Students",  value: extendedResults.length, icon: Users,      color: "text-primary",     bg: "bg-primary/10" },
          { label: "Passed",          value: passed,                 icon: Award,      color: "text-accent",      bg: "bg-accent/10" },
          { label: "Failed",          value: failed,                 icon: TrendingUp, color: "text-destructive", bg: "bg-destructive/10" },
          { label: "Overall Average", value: `${overallAvg}%`,       icon: BarChart2,  color: "text-blue-600",    bg: "bg-blue-500/10" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className={`rounded-lg p-2 ${bg}`}><Icon className={`h-5 w-5 ${color}`} /></div>
              <div><p className="text-2xl font-bold">{value}</p><p className="text-sm text-muted-foreground">{label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pass rate */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Pass Rate</CardTitle>
            <span className="text-2xl font-bold text-accent">{passRate}%</span>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={passRate} className="h-3" />
          <div className="mt-2 flex gap-6 text-sm text-muted-foreground">
            <span className="text-accent">● Passed: {passed}</span>
            <span className="text-destructive">● Failed: {failed}</span>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Results Table</CardTitle>
              <CardDescription>Mid-Term Examination · Term 2, 2025/2026</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1"><Download className="h-4 w-4" />Export</Button>
          </div>
          <div className="flex flex-col gap-2 pt-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search student or reg. number..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="All Classes" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {uniqueClasses.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-full sm:w-32"><SelectValue placeholder="All Grades" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                {["A", "B", "C", "D", "F"].map((g) => <SelectItem key={g} value={g}>Grade {g}</SelectItem>)}
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
                <TableHead className="hidden md:table-cell">Maths</TableHead>
                <TableHead className="hidden md:table-cell">English</TableHead>
                <TableHead className="hidden md:table-cell">Science</TableHead>
                <TableHead className="hidden md:table-cell">Social</TableHead>
                <TableHead>Average</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
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
                  <TableCell className="hidden md:table-cell">{r.math}</TableCell>
                  <TableCell className="hidden md:table-cell">{r.english}</TableCell>
                  <TableCell className="hidden md:table-cell">{r.science}</TableCell>
                  <TableCell className="hidden md:table-cell">{r.social}</TableCell>
                  <TableCell><span className={gradeColor(r.grade)}>{r.average.toFixed(1)}%</span></TableCell>
                  <TableCell><span className={gradeColor(r.grade)}>{r.grade}</span></TableCell>
                  <TableCell className="text-center">{r.position}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={r.status === "passed" ? "bg-accent/10 text-accent border-accent/30" : "bg-destructive/10 text-destructive border-destructive/30"}>
                      {r.status === "passed" ? "Passed" : "Failed"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
