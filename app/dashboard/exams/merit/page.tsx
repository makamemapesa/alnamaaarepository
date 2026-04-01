"use client"

import { useState } from "react"
import { Trophy, Medal, Award, Download, Search } from "lucide-react"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const meritList = [
  { id: "M001",  name: "Aisha Garba",       regNo: "FISS/2024/011", class: "JSS 2A", average: 93.00, grade: "A+", position: 1,  math: 96, english: 92, science: 90, total: 372 },
  { id: "M002",  name: "David Adamu",        regNo: "FISS/2024/004", class: "SS 3A",  average: 90.00, grade: "A+", position: 2,  math: 92, english: 88, science: 95, total: 360 },
  { id: "M003",  name: "Mohammed Ali",       regNo: "FISS/2024/006", class: "SS 1A",  average: 88.75, grade: "A",  position: 3,  math: 88, english: 90, science: 85, total: 355 },
  { id: "M004",  name: "Peter Okoro",        regNo: "FISS/2024/008", class: "SS 2A",  average: 84.75, grade: "A",  position: 4,  math: 88, english: 76, science: 91, total: 339 },
  { id: "M005",  name: "Amina Hassan",       regNo: "FISS/2024/001", class: "JSS 3A", average: 85.75, grade: "A",  position: 5,  math: 85, english: 78, science: 92, total: 343 },
  { id: "M006",  name: "Tunde Fashola",      regNo: "FISS/2024/012", class: "SS 3B",  average: 79.50, grade: "B+", position: 6,  math: 79, english: 82, science: 77, total: 318 },
  { id: "M007",  name: "Grace Nwosu",        regNo: "FISS/2024/005", class: "JSS 2B", average: 78.75, grade: "B+", position: 7,  math: 78, english: 82, science: 75, total: 315 },
  { id: "M008",  name: "Khadija Bello",      regNo: "FISS/2024/009", class: "JSS 1A", average: 73.75, grade: "B",  position: 8,  math: 74, english: 80, science: 69, total: 295 },
  { id: "M009",  name: "Emmanuel Obi",       regNo: "FISS/2024/002", class: "SS 2B",  average: 71.25, grade: "B",  position: 9,  math: 72, english: 65, science: 78, total: 285 },
  { id: "M010",  name: "Fatima Yusuf",       regNo: "FISS/2024/003", class: "JSS 1A", average: 61.25, grade: "C",  position: 10, math: 60, english: 55, science: 68, total: 245 },
  { id: "M011",  name: "Sarah Johnson",      regNo: "FISS/2024/007", class: "JSS 3A", average: 53.75, grade: "D",  position: 11, math: 55, english: 58, science: 50, total: 215 },
  { id: "M012",  name: "Chukwuemeka Ike",    regNo: "FISS/2024/010", class: "SS 1B",  average: 43.75, grade: "F",  position: 12, math: 42, english: 38, science: 50, total: 175 },
]

const positionIcon = (pos: number) => {
  if (pos === 1) return <Trophy className="h-5 w-5 text-yellow-500" />
  if (pos === 2) return <Medal className="h-5 w-5 text-slate-400" />
  if (pos === 3) return <Award className="h-5 w-5 text-amber-600" />
  return <span className="text-sm font-bold text-muted-foreground w-5 text-center">{pos}</span>
}

const gradeColor = (grade: string) => {
  if (grade.startsWith("A")) return "text-accent font-semibold"
  if (grade.startsWith("B")) return "text-blue-600 font-semibold"
  if (grade.startsWith("C")) return "text-yellow-600 font-semibold"
  if (grade.startsWith("D")) return "text-orange-600 font-semibold"
  return "text-destructive font-semibold"
}

export default function MeritListPage() {
  const [search, setSearch] = useState("")
  const [classFilter, setClassFilter] = useState("all")

  const filtered = meritList.filter((s) => {
    const q = search.toLowerCase()
    return (
      (s.name.toLowerCase().includes(q) || s.regNo.toLowerCase().includes(q)) &&
      (classFilter === "all" || s.class === classFilter)
    )
  })

  const uniqueClasses = Array.from(new Set(meritList.map((s) => s.class))).sort()
  const topThree = meritList.slice(0, 3)
  const avgScore = (meritList.reduce((sum, s) => sum + s.average, 0) / meritList.length).toFixed(1)

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <DashboardHeader title="Merit List" description="Overall school ranking of students based on examination performance." />

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {topThree.map((s) => (
          <Card key={s.id} className={s.position === 1 ? "border-yellow-400/60 bg-yellow-500/5" : s.position === 2 ? "border-slate-400/60 bg-slate-500/5" : "border-amber-500/60 bg-amber-500/5"}>
            <CardContent className="flex flex-col items-center py-6 gap-3">
              <div className="flex items-center gap-2">
                {positionIcon(s.position)}
                <span className="text-lg font-bold">#{s.position}</span>
              </div>
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                  {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="font-semibold">{s.name}</p>
                <p className="text-sm text-muted-foreground">{s.class}</p>
              </div>
              <span className={`text-2xl font-bold ${gradeColor(s.grade)}`}>{s.average.toFixed(1)}%</span>
              <Badge variant="outline" className={s.position === 1 ? "border-yellow-400 text-yellow-700 bg-yellow-500/10" : ""}>Grade {s.grade}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Students", value: meritList.length },
          { label: "Highest Score",  value: `${meritList[0].average}%` },
          { label: "School Average", value: `${avgScore}%` },
          { label: "Pass Rate",      value: `${Math.round((meritList.filter(s => s.grade !== "F").length / meritList.length) * 100)}%` },
        ].map(({ label, value }) => (
          <Card key={label}>
            <CardContent className="pt-6">
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Merit Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Full Merit List</CardTitle>
              <CardDescription>Overall school ranking · Term 2, 2025/2026</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1"><Download className="h-4 w-4" />Export</Button>
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
                <TableHead className="w-12">Rank</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead className="hidden md:table-cell">Maths</TableHead>
                <TableHead className="hidden md:table-cell">English</TableHead>
                <TableHead className="hidden md:table-cell">Science</TableHead>
                <TableHead>Average</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead className="hidden sm:table-cell">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id} className={s.position <= 3 ? "bg-muted/20" : ""}>
                  <TableCell>
                    <div className="flex items-center justify-center">{positionIcon(s.position)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{s.name}</p>
                        <p className="text-xs font-mono text-muted-foreground">{s.regNo}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="outline">{s.class}</Badge></TableCell>
                  <TableCell className="hidden md:table-cell">{s.math}</TableCell>
                  <TableCell className="hidden md:table-cell">{s.english}</TableCell>
                  <TableCell className="hidden md:table-cell">{s.science}</TableCell>
                  <TableCell><span className={gradeColor(s.grade)}>{s.average.toFixed(1)}%</span></TableCell>
                  <TableCell><span className={gradeColor(s.grade)}>{s.grade}</span></TableCell>
                  <TableCell className="hidden sm:table-cell w-32">
                    <Progress value={s.average} className="h-1.5" />
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
