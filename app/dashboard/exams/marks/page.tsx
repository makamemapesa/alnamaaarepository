"use client"

import { useState, useEffect } from "react"
import { api, getResults } from "@/lib/api-client"
import { Save, CheckCircle2, ClipboardList, Users, BookOpen } from "lucide-react"
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
type Marks = Record<string, string>

export default function MarksEntryPage() {
  const [classes, setClasses] = useState<any[]>([])
  const [subjectsList, setSubjectsList] = useState<any[]>([])
  const [allStudents, setAllStudents] = useState<any[]>([])
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedTerm, setSelectedTerm] = useState("Term 2, 2025/2026")
  const [selectedExam, setSelectedExam] = useState("Mid-Term")
  const [marks, setMarks] = useState<Marks>({})
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    api.get("/api/classes/").then(r => setClasses(getResults(r.data))).catch(() => {})
    api.get("/api/subjects/").then(r => setSubjectsList(getResults(r.data))).catch(() => {})
    api.get("/api/students/?page_size=500").then(r => setAllStudents(getResults(r.data))).catch(() => {})
  }, [])

  const classStudents = allStudents.filter((s) => (s.className || s.class) === selectedClass).map((s) => ({
    id: String(s.id),
    name: [s.firstName, s.lastName].filter(Boolean).join(" ") || s.name,
    regNo: s.regNo,
  }))
  const selectedClassData = classes.find((c) => c.name === selectedClass)
  const activeSubjects = selectedClassData
    ? subjectsList.filter((s) => s.status === "active" && (selectedClassData.subjectNames || selectedClassData.subjects || []).includes(s.name))
    : subjectsList.filter((s) => s.status === "active")
  const terms = ["Term 1, 2025/2026", "Term 2, 2025/2026", "Term 3, 2025/2026"]
  const examTypes = ["CA 1", "CA 2", "Mid-Term", "End of Term"]

  const setMark = (studentId: string, value: string) => {
    const num = parseInt(value)
    if (value === "" || (num >= 0 && num <= 100)) {
      setMarks((m) => ({ ...m, [studentId]: value }))
      setSaved(false)
    }
  }

  const handleSave = () => {
    const payload = {
      marks: classStudents
        .filter((s) => marks[s.id] !== undefined && marks[s.id] !== "")
        .map((s) => ({
          student: s.id,
          subject: selectedSubject,
          student_class: selectedClass,
          term: selectedTerm,
          exam_type: selectedExam,
          score: parseInt(marks[s.id]),
        }))
    }
    api.post("/api/exam-marks/bulk_save/", payload).catch(() => {})
    setSaved(true)
  }

  const filledCount = classStudents.filter((s) => marks[s.id] !== undefined && marks[s.id] !== "").length
  const avgMark = classStudents.length > 0
    ? (classStudents.reduce((sum, s) => sum + (parseFloat(marks[s.id] || "0")), 0) / classStudents.length).toFixed(1)
    : "—"

  const getGrade = (score: number) => {
    if (score >= 75) return { grade: "A", color: "text-accent" }
    if (score >= 65) return { grade: "B", color: "text-blue-600" }
    if (score >= 55) return { grade: "C", color: "text-yellow-600" }
    if (score >= 45) return { grade: "D", color: "text-orange-600" }
    return { grade: "F", color: "text-destructive" }
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <DashboardHeader title="Marks Entry" description="Enter examination and assessment scores for students." />

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Select Class & Subject
          </CardTitle>
          <CardDescription>Choose the class, subject, and exam type before entering marks.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Academic Term</span>
              <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{terms.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Exam Type</span>
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{examTypes.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Class</span>
              <Select value={selectedClass} onValueChange={(v) => { setSelectedClass(v); setSelectedSubject(""); setMarks({}) }}>
                <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                <SelectContent>{classes.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">Subject</span>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                <SelectContent>{activeSubjects.map((s) => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary stats */}
      {selectedClass && selectedSubject && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total Students",  value: classStudents.length, icon: Users,        color: "text-primary",     bg: "bg-primary/10" },
            { label: "Marks Entered",   value: filledCount,          icon: ClipboardList, color: "text-accent",      bg: "bg-accent/10" },
            { label: "Remaining",       value: classStudents.length - filledCount, icon: BookOpen, color: "text-yellow-600", bg: "bg-yellow-500/10" },
            { label: "Class Average",   value: avgMark,              icon: CheckCircle2,  color: "text-blue-600",    bg: "bg-blue-500/10" },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <Card key={label}>
              <CardContent className="flex items-center gap-4 pt-6">
                <div className={`rounded-lg p-2 ${bg}`}><Icon className={`h-5 w-5 ${color}`} /></div>
                <div><p className="text-2xl font-bold">{value}</p><p className="text-sm text-muted-foreground">{label}</p></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Marks Table */}
      {selectedClass && selectedSubject ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedSubject} — {selectedClass}</CardTitle>
                <CardDescription>{selectedExam} · {selectedTerm} · Score out of 100</CardDescription>
              </div>
              <Button onClick={handleSave} className="gap-2" disabled={filledCount === 0}>
                {saved ? <><CheckCircle2 className="h-4 w-4" /> Saved</> : <><Save className="h-4 w-4" /> Save Marks</>}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Reg. No.</TableHead>
                  <TableHead>Score (/100)</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Remark</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classStudents.map((student, index) => {
                  const score = parseFloat(marks[student.id] || "")
                  const { grade, color } = !isNaN(score) ? getGrade(score) : { grade: "—", color: "text-muted-foreground" }
                  const remark = !isNaN(score)
                    ? score >= 75 ? "Excellent" : score >= 65 ? "Good" : score >= 55 ? "Average" : score >= 45 ? "Below Average" : "Fail"
                    : "—"
                  return (
                    <TableRow key={student.id}>
                      <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{student.regNo}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          className="w-20 h-8 text-center"
                          placeholder="—"
                          value={marks[student.id] ?? ""}
                          onChange={(e) => setMark(student.id, e.target.value)}
                        />
                      </TableCell>
                      <TableCell><span className={`font-semibold ${color}`}>{grade}</span></TableCell>
                      <TableCell><span className="text-sm text-muted-foreground">{remark}</span></TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <ClipboardList className="h-12 w-12 text-muted-foreground/40" />
            <p className="text-lg font-medium text-muted-foreground">Select a class and subject to begin entering marks</p>
            <p className="text-sm text-muted-foreground">Use the selectors above to choose the class and subject.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
