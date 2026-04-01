"use client"

import { useState, useEffect } from "react"
import {
  Search, Plus, Download, CheckCircle2, Clock, CreditCard, Banknote, Smartphone, DollarSign,
} from "lucide-react"
import { api, getResults } from "@/lib/api-client"
import { exportCSV } from "@/lib/utils"
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
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const fmt = (n: number) => `₦${n.toLocaleString()}`

const methodIcon = (method: string) => {
  if (method === "Bank Transfer") return <CreditCard className="h-4 w-4 text-blue-500" />
  if (method === "Cash") return <Banknote className="h-4 w-4 text-green-600" />
  return <Smartphone className="h-4 w-4 text-purple-500" />
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ studentName: "", regNo: "", class: "", amount: "", method: "Bank Transfer", term: "Term 2, 2025/2026", receiptNo: "", category: "Full Payment" })

  useEffect(() => {
    api.get("/api/fees/payments/").then(r => setPayments(getResults(r.data))).catch(() => {})
  }, [])

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase()
    return (
      (p.studentName.toLowerCase().includes(q) || p.regNo.toLowerCase().includes(q)) &&
      (statusFilter === "all" || p.status === statusFilter) &&
      (methodFilter === "all" || p.method === methodFilter)
    )
  })

  const confirmed = payments.filter((p) => p.status === "confirmed")
  const totalCollected = confirmed.reduce((s, p) => s + p.amount, 0)
  const pending = payments.filter((p) => p.status === "pending")
  const totalPending = pending.reduce((s, p) => s + p.amount, 0)

  const handleAdd = () => {
    setPayments((prev) => [{
      id: `PAY${Date.now()}`,
      studentName: form.studentName,
      regNo: form.regNo,
      class: form.class,
      amount: parseInt(form.amount) || 0,
      date: new Date().toISOString().split("T")[0],
      method: form.method as "Bank Transfer" | "Cash" | "Mobile Money",
      status: "pending" as const,
      term: form.term,
      receiptNo: form.receiptNo,
      category: form.category,
    }, ...prev])
    setOpen(false)
    setForm({ studentName: "", regNo: "", class: "", amount: "", method: "Bank Transfer", term: "Term 2, 2025/2026", receiptNo: "", category: "Full Payment" })
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <DashboardHeader title="Fee Payments" description="Record and track all student fee payments." />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Payments",    value: payments.length,          icon: DollarSign,   color: "text-primary",     bg: "bg-primary/10" },
          { label: "Confirmed",         value: confirmed.length,          icon: CheckCircle2, color: "text-accent",      bg: "bg-accent/10" },
          { label: "Pending",           value: pending.length,            icon: Clock,        color: "text-yellow-600",  bg: "bg-yellow-500/10" },
          { label: "Total Collected",   value: fmt(totalCollected),       icon: CreditCard,   color: "text-blue-600",    bg: "bg-blue-500/10" },
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
              <CardTitle>Payment Records</CardTitle>
              <CardDescription>All fee payment transactions</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1" onClick={() => exportCSV(filtered, "payments.csv")}><Download className="h-4 w-4" />Export</Button>
              <Button size="sm" className="gap-1" onClick={() => setOpen(true)}><Plus className="h-4 w-4" />Record Payment</Button>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search student..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="All Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-full sm:w-44"><SelectValue placeholder="All Methods" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Mobile Money">Mobile Money</SelectItem>
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
                <TableHead>Amount</TableHead>
                <TableHead className="hidden md:table-cell">Receipt No.</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Method</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden lg:table-cell">Term</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{p.studentName}</p>
                      <p className="text-xs font-mono text-muted-foreground">{p.regNo}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell"><Badge variant="outline">{p.className || p.class}</Badge></TableCell>
                  <TableCell className="font-semibold text-primary">{fmt(p.amount)}</TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-xs text-muted-foreground">{p.receiptNo}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className="text-xs">{p.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">{methodIcon(p.method)}{p.method}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{p.date}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{p.term}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={p.status === "confirmed" ? "bg-accent/10 text-accent border-accent/30" : "bg-yellow-500/10 text-yellow-700 border-yellow-400/30"}>
                      {p.status === "confirmed" ? "Confirmed" : "Pending"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Payment Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record New Payment</DialogTitle>
            <DialogDescription>Enter payment details. Status will be set to Pending until confirmed.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label>Student Name</Label>
                <Input value={form.studentName} onChange={(e) => setForm((f) => ({ ...f, studentName: e.target.value }))} placeholder="Full name" />
              </div>
              <div className="grid gap-1.5">
                <Label>Reg. Number</Label>
                <Input value={form.regNo} onChange={(e) => setForm((f) => ({ ...f, regNo: e.target.value }))} placeholder="FISS/2024/XXX" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label>Class</Label>
                <Input value={form.class} onChange={(e) => setForm((f) => ({ ...f, class: e.target.value }))} placeholder="e.g. JSS 3A" />
              </div>
              <div className="grid gap-1.5">
                <Label>Amount (₦)</Label>
                <Input type="number" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} placeholder="0" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label>Receipt Number</Label>
                <Input value={form.receiptNo} onChange={(e) => setForm((f) => ({ ...f, receiptNo: e.target.value }))} placeholder="e.g. RCP-011" />
              </div>
              <div className="grid gap-1.5">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Full Payment","Tuition","Boarding","Development Levy","Books & Stationery","Miscellaneous"].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>Payment Method</Label>
              <Select value={form.method} onValueChange={(v) => setForm((f) => ({ ...f, method: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label>Term</Label>
              <Select value={form.term} onValueChange={(v) => setForm((f) => ({ ...f, term: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Term 1, 2025/2026","Term 2, 2025/2026","Term 3, 2025/2026"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={!form.studentName || !form.amount}>Record Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
