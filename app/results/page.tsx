"use client"
import { useState } from "react"
import { Search, Download, Filter, AlertCircle } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { exams, students } from "@/lib/mock-data"

export default function PublicResultsPage() {
  const [regNumber, setRegNumber] = useState("")
  const [selectedTerm, setSelectedTerm] = useState("term2")
  const [searchPerformed, setSearchPerformed] = useState(false)

  const studentResult = students.find((s) => s.regNumber.toLowerCase() === regNumber.toLowerCase())
  const studentExams = studentResult ? exams.filter((e) => e.studentId === studentResult.id) : []

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchPerformed(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FISS
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Student Results Portal</h1>
          <p className="text-muted-foreground">Check your examination results here</p>
        </div>

        {/* Search Card */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Search Your Results</CardTitle>
              <CardDescription>Enter your registration number to view your results</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-sm font-medium">Registration Number</label>
                    <Input
                      placeholder="e.g., FSS/2024/001"
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                      className="text-base"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Term</label>
                    <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="term1">Term 1</SelectItem>
                        <SelectItem value="term2">Term 2</SelectItem>
                        <SelectItem value="term3">Term 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  <Search className="mr-2 h-4 w-4" /> Search Results
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Results Display */}
        {searchPerformed && (
          <div className="max-w-4xl mx-auto">
            {!studentResult ? (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-6">
                  <Alert variant="default">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No Results Found</AlertTitle>
                    <AlertDescription>
                      No student found with registration number "{regNumber}". Please check and try again.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ) : studentExams.length === 0 ? (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-6">
                  <Alert variant="default">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No Exams Recorded</AlertTitle>
                    <AlertDescription>
                      No examination results are available for this student in {selectedTerm}.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Student Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Student Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-semibold">{studentResult.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Reg Number</p>
                        <p className="font-semibold">{studentResult.regNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Class</p>
                        <p className="font-semibold">{studentResult.classId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Term</p>
                        <p className="font-semibold">Term 2</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Results Table */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-base">Examination Results</CardTitle>
                        <CardDescription>Subject-wise marks and grades</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" /> Download
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead className="text-right">Marks</TableHead>
                            <TableHead className="text-right">Grade</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {studentExams.map((exam) => {
                            const passed = parseInt(exam.marks) >= 50
                            return (
                              <TableRow key={exam.id}>
                                <TableCell className="font-medium">Subject</TableCell>
                                <TableCell className="text-right font-semibold">{exam.marks}%</TableCell>
                                <TableCell className="text-right font-semibold">{exam.grade}</TableCell>
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

                {/* Summary Stats */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {[
                    { label: "Total Subjects", value: studentExams.length },
                    { label: "Average Score", value: `${(studentExams.reduce((sum, e) => sum + parseInt(e.marks), 0) / studentExams.length).toFixed(1)}%` },
                    { label: "Passed", value: studentExams.filter((e) => parseInt(e.marks) >= 50).length },
                    { label: "Failed", value: studentExams.filter((e) => parseInt(e.marks) < 50).length },
                  ].map((item, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-4">
                        <p className="text-2xl font-bold">{item.value}</p>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 text-center">
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          </div>
        )}

        {!searchPerformed && (
          <div className="max-w-4xl mx-auto text-center py-12">
            <p className="text-muted-foreground mb-4">
              Tip: You can find your registration number on your admission letter or student ID card.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
