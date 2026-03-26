"use client"
import { useState } from "react"
import { Search, Download, Filter, TrendingUp, Award, MoreHorizontal } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { examResults as exams, recentStudents as students, classes } from "@/lib/mock-data"

export default function ResultsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState("")

  const filteredResults = exams.filter((exam) => {
    const student = students.find((s) => s.id === exam.studentId)
    const matchesClass = !selectedClass || exam.classId === selectedClass
    const matchesSearch = !searchQuery || student?.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesClass && matchesSearch
  })

  const averageGrade = filteredResults.length > 0 ? (filteredResults.reduce((acc, e) => acc + parseInt(e.marks), 0) / filteredResults.length).toFixed(1) : 0

  return (
    <>
      <DashboardHeader
        title="Results"
        description="View and manage examination results"
      />
      <div className="p-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Total Results", value: filteredResults.length, icon: TrendingUp },
            { label: "Average Score", value: averageGrade },
            { label: "Passed", value: filteredResults.filter((r) => parseInt(r.marks) >= 50).length },
            { label: "Failed", value: filteredResults.filter((r) => parseInt(r.marks) < 50).length },
          ].map((item, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <p className="text-lg font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Examination Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.slice(0, 15).map((result) => {
                    const student = students.find((s) => s.id === result.studentId)
                    const cls = classes.find((c) => c.id === result.classId)
                    const passed = parseInt(result.marks) >= 50
                    return (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{student?.name}</TableCell>
                        <TableCell>{cls?.name}</TableCell>
                        <TableCell>{result.marks}%</TableCell>
                        <TableCell>{result.grade}</TableCell>
                        <TableCell>
                          <Badge variant={passed ? "default" : "destructive"}>
                            {passed ? "Pass" : "Fail"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
