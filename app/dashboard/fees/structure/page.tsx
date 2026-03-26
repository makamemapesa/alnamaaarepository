"use client"
import { useState } from "react"
import { Filter, Plus, MoreHorizontal, DollarSign, Users, TrendingUp } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { classes, feeStructure as feeStructures } from "@/lib/mock-data"

export default function FeeStructurePage() {
  const [selectedLevel, setSelectedLevel] = useState("all")

  const filteredStructures = feeStructures.filter((fee) => {
    if (selectedLevel === "all") return true
    if (selectedLevel === "jss") return fee.class.startsWith("JSS")
    if (selectedLevel === "sss") return fee.class.startsWith("SS")
    return true
  })

  const totalAmount = feeStructures.reduce((sum, fee) => sum + fee.total, 0)
  const averageFee = totalAmount / feeStructures.length || 0

  return (
    <>
      <DashboardHeader
        title="Fee Structure"
        description="Manage school fee schedules and rates"
      />
      <div className="p-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Total Classes", value: classes.length },
            { label: "Fee Levels", value: feeStructures.length },
            { label: "Average Fee", value: `₦${averageFee.toLocaleString()}` },
            { label: "Total Structure", value: `₦${totalAmount.toLocaleString()}` },
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
            <CardTitle className="text-base">Fee Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Tuition</TableHead>
                    <TableHead>Boarding</TableHead>
                    <TableHead>Development</TableHead>
                    <TableHead>Books</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStructures.map((fee) => (
                    <TableRow key={fee.class}>
                      <TableCell className="font-medium">{fee.class}</TableCell>
                      <TableCell>₦{fee.tuition.toLocaleString()}</TableCell>
                      <TableCell>₦{fee.boarding.toLocaleString()}</TableCell>
                      <TableCell>₦{fee.development.toLocaleString()}</TableCell>
                      <TableCell>₦{fee.books.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-bold">₦{fee.total.toLocaleString()}</TableCell>
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
