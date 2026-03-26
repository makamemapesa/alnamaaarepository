"use client"
import { useState } from "react"
import { Download, Filter, FileText, Plus, MoreHorizontal } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { classes, recentStudents as students } from "@/lib/mock-data"

export default function ReportCardsPage() {
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedTerm, setSelectedTerm] = useState("term2")

  const filteredStudents = selectedClass ? students.filter((s) => s.class === selectedClass) : students

  return (
    <>
      <DashboardHeader
        title="Report Cards"
        description="Generate and manage student report cards"
      />
      <div className="p-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Total Students", value: students.length },
            { label: "Reports Generated", value: "234" },
            { label: "Pending", value: students.length - 234 },
            { label: "Printed", value: "198" },
          ].map((item) => (
            <Card key={item.label}>
              <CardContent className="p-4">
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Report Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Reg Number</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Average</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.slice(0, 10).map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.regNo}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{(Math.random() * 40 + 60).toFixed(1)}%</TableCell>
                      <TableCell>
                        <Badge variant="default">Complete</Badge>
                      </TableCell>
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
