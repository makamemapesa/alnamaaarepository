"use client"

import { useState } from "react"
import {
  Search, AlertTriangle, Send, CheckCircle2, Clock, DollarSign, TrendingDown,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog"

const fmt = (n: number) => `₦${n.toLocaleString()}`

const outstanding = [
  { id: 1, studentName: "Emmanuel Obi",   regNo: "FISS/2024/002", class: "SS 2B",  totalFee: 205000, amountPaid: 100000, lastPayment: "2026-02-24", daysOverdue: 34 },
  { id: 2, studentName: "Sarah Johnson",  regNo: "FISS/2024/007", class: "JSS 3A", totalFee: 172000, amountPaid: 75000,  lastPayment: "2026-02-21", daysOverdue: 37 },
  { id: 3, studentName: "Grace Nwosu",    regNo: "FISS/2024/005", class: "JSS 2B", totalFee: 160000, amountPaid: 50000,  lastPayment: "2026-02-17", daysOverdue: 41 },
  { id: 4, studentName: "Bola Tinubu",    regNo: "FISS/2024/013", class: "SS 1B",  totalFee: 195000, amountPaid: 0,      lastPayment: "—",          daysOverdue: 58 },
  { id: 5, studentName: "Chioma Eze",     regNo: "FISS/2024/014", class: "JSS 1B", totalFee: 155000, amountPaid: 30000,  lastPayment: "2026-01-30", daysOverdue: 59 },
  { id: 6, studentName: "Samuel Dankwa",  regNo: "FISS/2024/015", class: "SS 3A",  totalFee: 223000, amountPaid: 100000, lastPayment: "2026-01-25", daysOverdue: 64 },
  { id: 7, studentName: "Halima Musa",    regNo: "FISS/2024/016", class: "JSS 2A", totalFee: 160000, amountPaid: 80000,  lastPayment: "2026-01-20", daysOverdue: 69 },
  { id: 8, studentName: "Emeka Okafor",   regNo: "FISS/2024/017", class: "SS 2A",  totalFee: 205000, amountPaid: 0,      lastPayment: "—",          daysOverdue: 88 },
]

function overdueSeverity(days: number) {
  if (days >= 60) return { label: "Critical", class: "bg-destructive/10 text-destructive border-destructive/30" }
  if (days >= 30) return { label: "Overdue",  class: "bg-orange-500/10 text-orange-700 border-orange-400/30" }
  return { label: "Pending", class: "bg-yellow-500/10 text-yellow-700 border-yellow-400/30" }
}

export default function OutstandingPage() {
  const [search, setSearch] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [reminded, setReminded] = useState<number[]>([])
  const [reminderTarget, setReminderTarget] = useState<typeof outstanding[0] | null>(null)

  const filtered = outstanding.filter((s) => {
    const q = search.toLowerCase()
    return (
      (s.studentName.toLowerCase().includes(q) || s.regNo.toLowerCase().includes(q)) &&
      (classFilter === "all" || s.class.startsWith(classFilter))
    )
  })

  const totalOwed    = outstanding.reduce((s, r) => s + (r.totalFee - r.amountPaid), 0)
  const totalStudents = outstanding.length
  const critical      = outstanding.filter((s) => s.daysOverdue >= 60).length
  const avgCollection = Math.round(outstanding.reduce((s, r) => s + (r.amountPaid / r.totalFee) * 100, 0) / outstanding.length)

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <DashboardHeader title="Outstanding Fees" description="Monitor unpaid and partially paid student fees." />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Outstanding", value: fmt(totalOwed),      icon: TrendingDown,   color: "text-destructive",  bg: "bg-destructive/10" },
          { label: "Students Owing",    value: totalStudents,        icon: AlertTriangle,  color: "text-orange-600",   bg: "bg-orange-500/10" },
          { label: "Critical Cases",    value: critical,             icon: Clock,          color: "text-yellow-600",   bg: "bg-yellow-500/10" },
          { label: "Avg. Collection",   value: `${avgCollection}%`,  icon: DollarSign,     color: "text-primary",      bg: "bg-primary/10" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className={`rounded-lg p-2 ${bg}`}><Icon className={`h-5 w-5 ${color}`} /></div>
              <div><p className="text-xl font-bold">{value}</p><p className="text-sm text-muted-foreground">{label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Outstanding Balances</CardTitle>
              <CardDescription>Students with unpaid or partially paid fees</CardDescription>
            </div>
            <Button size="sm" variant="outline" className="gap-1" onClick={() => setReminded(outstanding.map((s) => s.id))}>
              <Send className="h-4 w-4" />Send All Reminders
            </Button>
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
                <SelectItem value="JSS">JSS</SelectItem>
                <SelectItem value="SS">SS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="hidden sm:table-cell">Class</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead className="hidden md:table-cell">Collection</TableHead>
                <TableHead className="hidden lg:table-cell">Last Payment</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => {
                const balance = s.totalFee - s.amountPaid
                const pct = Math.round((s.amountPaid / s.totalFee) * 100)
                const { label, class: cls } = overdueSeverity(s.daysOverdue)
                const sent = reminded.includes(s.id)
                return (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{s.studentName}</p>
                        <p className="text-xs font-mono text-muted-foreground">{s.regNo}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell"><Badge variant="outline">{s.class}</Badge></TableCell>
                    <TableCell className="font-semibold text-destructive">{fmt(balance)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <Progress value={pct} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground">{pct}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{s.lastPayment}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className={cls}>{label}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {sent ? (
                        <span className="flex items-center justify-end gap-1 text-xs text-accent"><CheckCircle2 className="h-3.5 w-3.5" />Sent</span>
                      ) : (
                        <Button size="sm" variant="outline" className="gap-1 h-7 text-xs" onClick={() => { setReminderTarget(s); setReminded((r) => [...r, s.id]) }}>
                          <Send className="h-3 w-3" />Remind
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={!!reminderTarget} onOpenChange={(o) => { if (!o) setReminderTarget(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reminder Sent</DialogTitle>
            <DialogDescription>
              A payment reminder has been sent to {reminderTarget?.studentName} ({reminderTarget?.regNo}) for an outstanding balance of{" "}
              <strong>{reminderTarget ? fmt(reminderTarget.totalFee - reminderTarget.amountPaid) : ""}</strong>.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setReminderTarget(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
