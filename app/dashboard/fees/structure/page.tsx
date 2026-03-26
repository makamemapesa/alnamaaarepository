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
import { classes, feeStructures } from "@/lib/mock-data"

export default function FeeStructurePage() {
  const [selectedLevel, setSelectedLevel] = useState("jss1")

  const filteredStructures = feeStructures.filter((fee) => {
    if (!selectedLevel) return true
    return fee.level === selectedLevel
  })

  const totalAmount = filteredStructures.reduce((sum, fee) => sum + fee.amount, 0)

  return (
    <>
      <DashboardHeader
        title="Fee Structure"
        description="Manage school fee schedules and rates"
      />
      <div className="p-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Total Levels", value: classes.length },
            { label: "Fee Levels", value: feeStructures.length },
            { label: "Average Fee", value: `${(totalAmount / filteredStructures.length || 0).toFixed(0)}` },
            { label: "Total Annual", value: `${totalAmount.toLocaleString()}` },
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
            <CardTitle className="text-base">Fee Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Level</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount ()</TableHead>
                    <TableHead>Term</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStructures.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell className="font-medium">{fee.level.toUpperCase()}</TableCell>
                      <TableCell>{fee.description}</TableCell>
                      <TableCell>{fee.amount.toLocaleString()}</TableCell>
                      <TableCell>{fee.term}</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
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
