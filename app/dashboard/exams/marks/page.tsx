"use client"

import { useState } from "react"
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
import { classesExtended, subjects, recentStudents } from "@/lib/mock-data"

const allStudents = [
  // JSS 1A
  { id: "STU003", name: "Fatima Yusuf",        regNo: "FISS/2024/003", class: "JSS 1A" },
  { id: "STU009", name: "Khadija Bello",        regNo: "FISS/2024/009", class: "JSS 1A" },
  { id: "STU015", name: "Yusuf Bello",          regNo: "FISS/2024/015", class: "JSS 1A" },
  { id: "STU016", name: "Zainab Musa",          regNo: "FISS/2024/016", class: "JSS 1A" },
  { id: "STU017", name: "Umar Ibrahim",         regNo: "FISS/2024/017", class: "JSS 1A" },
  // JSS 1B
  { id: "STU018", name: "Hafsa Ahmed",          regNo: "FISS/2024/018", class: "JSS 1B" },
  { id: "STU019", name: "Sulaiman Kano",        regNo: "FISS/2024/019", class: "JSS 1B" },
  { id: "STU020", name: "Rebecca Afolabi",      regNo: "FISS/2024/020", class: "JSS 1B" },
  { id: "STU021", name: "Joseph Eze",           regNo: "FISS/2024/021", class: "JSS 1B" },
  { id: "STU022", name: "Maryam Lawal",         regNo: "FISS/2024/022", class: "JSS 1B" },
  // JSS 2A
  { id: "STU011", name: "Aisha Garba",          regNo: "FISS/2024/011", class: "JSS 2A" },
  { id: "STU023", name: "Abdullahi Danladi",    regNo: "FISS/2024/023", class: "JSS 2A" },
  { id: "STU024", name: "Chisom Obi",           regNo: "FISS/2024/024", class: "JSS 2A" },
  { id: "STU025", name: "Taiwo Adeleke",        regNo: "FISS/2024/025", class: "JSS 2A" },
  { id: "STU026", name: "Nkechi Achebe",        regNo: "FISS/2024/026", class: "JSS 2A" },
  // JSS 2B
  { id: "STU027", name: "Hanan Mohammed",       regNo: "FISS/2024/027", class: "JSS 2B" },
  { id: "STU028", name: "Segun Adeyemi",        regNo: "FISS/2024/028", class: "JSS 2B" },
  { id: "STU029", name: "Gloria Nwachukwu",     regNo: "FISS/2024/029", class: "JSS 2B" },
  { id: "STU030", name: "Ismail Hassan",        regNo: "FISS/2024/030", class: "JSS 2B" },
  { id: "STU031", name: "Patience Okafor",      regNo: "FISS/2024/031", class: "JSS 2B" },
  // JSS 3A
  { id: "STU001", name: "Amina Hassan",         regNo: "FISS/2024/001", class: "JSS 3A" },
  { id: "STU007", name: "Sarah Johnson",        regNo: "FISS/2024/007", class: "JSS 3A" },
  { id: "STU014", name: "Ngozi Peters",         regNo: "FISS/2024/014", class: "JSS 3A" },
  { id: "STU032", name: "Bilal Usman",          regNo: "FISS/2024/032", class: "JSS 3A" },
  { id: "STU033", name: "Esther Olawale",       regNo: "FISS/2024/033", class: "JSS 3A" },
  // JSS 3B
  { id: "STU034", name: "Bashir Yakubu",        regNo: "FISS/2024/034", class: "JSS 3B" },
  { id: "STU035", name: "Adaeze Nwosu",         regNo: "FISS/2024/035", class: "JSS 3B" },
  { id: "STU036", name: "Kayode Abiodun",       regNo: "FISS/2024/036", class: "JSS 3B" },
  { id: "STU037", name: "Rukkayat Shehu",       regNo: "FISS/2024/037", class: "JSS 3B" },
  { id: "STU038", name: "Emeka Chukwu",         regNo: "FISS/2024/038", class: "JSS 3B" },
  // SS 1A
  { id: "STU006", name: "Mohammed Ali",         regNo: "FISS/2024/006", class: "SS 1A" },
  { id: "STU013", name: "Chidi Okonkwo",        regNo: "FISS/2024/013", class: "SS 1A" },
  { id: "STU039", name: "Fatimah Bello",        regNo: "FISS/2024/039", class: "SS 1A" },
  { id: "STU040", name: "Lukman Adeniyi",       regNo: "FISS/2024/040", class: "SS 1A" },
  { id: "STU041", name: "Naomi Idowu",          regNo: "FISS/2024/041", class: "SS 1A" },
  // SS 1B
  { id: "STU042", name: "Salihu Garba",         regNo: "FISS/2024/042", class: "SS 1B" },
  { id: "STU043", name: "Blessing Ochi",        regNo: "FISS/2024/043", class: "SS 1B" },
  { id: "STU044", name: "Ibrahima Toure",       regNo: "FISS/2024/044", class: "SS 1B" },
  { id: "STU045", name: "Chiamaka Okonjo",      regNo: "FISS/2024/045", class: "SS 1B" },
  { id: "STU046", name: "David Musa",           regNo: "FISS/2024/046", class: "SS 1B" },
  // SS 2A
  { id: "STU008", name: "Peter Okoro",          regNo: "FISS/2024/008", class: "SS 2A" },
  { id: "STU047", name: "Asmau Shehu",          regNo: "FISS/2024/047", class: "SS 2A" },
  { id: "STU048", name: "Felix Egwu",           regNo: "FISS/2024/048", class: "SS 2A" },
  { id: "STU049", name: "Hadija Yaro",          regNo: "FISS/2024/049", class: "SS 2A" },
  { id: "STU050", name: "Kenneth Eze",          regNo: "FISS/2024/050", class: "SS 2A" },
  // SS 2B
  { id: "STU002", name: "Emmanuel Obi",         regNo: "FISS/2024/002", class: "SS 2B" },
  { id: "STU051", name: "Mariam Karimi",        regNo: "FISS/2024/051", class: "SS 2B" },
  { id: "STU052", name: "Solomon Asante",       regNo: "FISS/2024/052", class: "SS 2B" },
  { id: "STU053", name: "Faridah Nuhu",         regNo: "FISS/2024/053", class: "SS 2B" },
  { id: "STU054", name: "Babatunde Coker",      regNo: "FISS/2024/054", class: "SS 2B" },
  // SS 3A
  { id: "STU055", name: "Zakariyya Bello",      regNo: "FISS/2024/055", class: "SS 3A" },
  { id: "STU056", name: "Chinwe Obi",           regNo: "FISS/2024/056", class: "SS 3A" },
  { id: "STU057", name: "Taofeeq Salami",       regNo: "FISS/2024/057", class: "SS 3A" },
  { id: "STU058", name: "Habiba Idris",         regNo: "FISS/2024/058", class: "SS 3A" },
  { id: "STU059", name: "Osaro Ighile",         regNo: "FISS/2024/059", class: "SS 3A" },
  // SS 3B
  { id: "STU012", name: "Tunde Fashola",        regNo: "FISS/2024/012", class: "SS 3B" },
  { id: "STU060", name: "Halima Goni",          regNo: "FISS/2024/060", class: "SS 3B" },
  { id: "STU061", name: "Charles Obi",          regNo: "FISS/2024/061", class: "SS 3B" },
  { id: "STU062", name: "Aminata Diallo",       regNo: "FISS/2024/062", class: "SS 3B" },
  { id: "STU063", name: "Stephen Nweke",        regNo: "FISS/2024/063", class: "SS 3B" },
]

type Marks = Record<string, string>

export default function MarksEntryPage() {
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedTerm, setSelectedTerm] = useState("Term 2, 2025/2026")
  const [selectedExam, setSelectedExam] = useState("Mid-Term")
  const [marks, setMarks] = useState<Marks>({})
  const [saved, setSaved] = useState(false)

  const classStudents = allStudents.filter((s) => s.class === selectedClass)
  const selectedClassData = classesExtended.find((c) => c.name === selectedClass)
  const activeSubjects = selectedClassData
    ? subjects.filter((s) => s.status === "active" && selectedClassData.subjects.includes(s.name))
    : subjects.filter((s) => s.status === "active")
  const terms = ["Term 1, 2025/2026", "Term 2, 2025/2026", "Term 3, 2025/2026"]
  const examTypes = ["CA 1", "CA 2", "Mid-Term", "End of Term"]

  const setMark = (studentId: string, value: string) => {
    const num = parseInt(value)
    if (value === "" || (num >= 0 && num <= 100)) {
      setMarks((m) => ({ ...m, [studentId]: value }))
      setSaved(false)
    }
  }

  const handleSave = () => setSaved(true)

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
                <SelectContent>{classesExtended.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
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
