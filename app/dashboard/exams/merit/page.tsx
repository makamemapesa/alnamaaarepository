"use client"
import { useState } from "react"
import { Trophy, Filter, Download, Medal } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { classes, students, exams } from "@/lib/mock-data"

export default function MeritListPage() {
  const [selectedClass, setSelectedClass] = useState("")

  const studentAverages = students.map((student) => {
    const studentExams = exams.filter((e) => e.studentId === student.id)
    const avgScore = studentExams.length > 0 ? studentExams.reduce((sum, e) => sum + parseInt(e.marks), 0) / studentExams.length : 0
    return { ...student, averageScore: avgScore }
  })

  const filteredStudents = selectedClass ? studentAverages.filter((s) => s.classId === selectedClass) : studentAverages
  const meritList = filteredStudents.sort((a, b) => b.averageScore - a.averageScore).slice(0, 50)
  const topThree = meritList.slice(0, 3)
  const others = meritList.slice(3)

  return (
    <>
      <DashboardHeader
        title="Merit List"
        description="View top-performing students"
      />
      <div className="p-6 flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {topThree.map((student, idx) => (
            <Card key={student.id}>
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <div className="text-4xl">{idx === 0 ? "" : idx === 1 ? "" : ""}</div>
                <div>
                  <p className="text-xl font-bold">{student.name}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{student.averageScore.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">Average Score</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Merit Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Average Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {others.map((student, idx) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-bold">{idx + 4}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.classId}</TableCell>
                      <TableCell>{student.averageScore.toFixed(1)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
