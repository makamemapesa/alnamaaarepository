"use client"

import { useState } from "react"
import {
  Search,
  Download,
  Filter,
  Plus,
  MoreHorizontal,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
import { examResults, recentStudents as students, subjects, classes } from "@/lib/mock-data"

export default function MarksEntryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")

  const filteredMarks = examResults.filter((exam) => {
    const matchesClass = !selectedClass || exam.classId === selectedClass
    const matchesSubject = !selectedSubject || exam.subjectId === selectedSubject
    return matchesClass && matchesSubject
  })

  return (
    <>
      <DashboardHeader
        title="Marks Entry"
        description="Record and manage student examination marks"
      />

      <div className="p-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Total Exams", value: examResults.length, color: "bg-primary/10 text-primary" },
            { label: "Classes", value: classes.length, color: "bg-accent/10 text-accent" },
            { label: "Subjects", value: subjects.length, color: "bg-chart-3/10 text-chart-3" },
            { label: "Students", value: students.length, color: "bg-chart-4/10 text-chart-4" },
          ].map((item) => (
            <Card key={item.label}>
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                  <p className="text-sm font-bold">{item.value}</p>
                </div>
                <p className="text-[11px] text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Enter Marks</CardTitle>
                <CardDescription>Record examination marks for students</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" /> New Entry
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMarks.length > 0 ? (
                    filteredMarks.slice(0, 10).map((exam) => {
                      const student = students.find((s) => s.id === exam.studentId)
                      const subject = subjects.find((s) => s.id === exam.subjectId)
                      const cls = classes.find((c) => c.id === exam.classId)
                      return (
                        <TableRow key={exam.id}>
                          <TableCell className="font-medium">{student?.name}</TableCell>
                          <TableCell>{cls?.name}</TableCell>
                          <TableCell>{subject?.name}</TableCell>
                          <TableCell>{exam.marks}</TableCell>
                          <TableCell>{exam.grade}</TableCell>
                          <TableCell>
                            <Badge variant={exam.status === "completed" ? "default" : "secondary"}>
                              {exam.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No marks found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
