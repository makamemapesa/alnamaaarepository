"use client"

import { useState, useEffect } from "react"
import { api, getResults } from "@/lib/api-client"
import { Edit, CreditCard, TrendingUp, DollarSign, BookOpen, Plus } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function FeeStructurePage() {
  const [fees, setFees] = useState<any[]>([])
  const [editTarget, setEditTarget] = useState<any>(null)
  const [form, setForm] = useState({ tuition: "", boarding: "", development: "", books: "" })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    api.get("/api/fees/structure/").then(r => setFees(getResults(r.data))).catch(() => {})
  }, [])

  const openEdit = (f: any) => {
    setEditTarget(f)
    setForm({ tuition: String(f.tuition), boarding: String(f.boarding), development: String(f.development), books: String(f.books) })
    setOpen(true)
  }

  const handleSave = () => {
    if (!editTarget) return
    const tuition = parseInt(form.tuition)
    const boarding = parseInt(form.boarding)
    const development = parseInt(form.development)
    const books = parseInt(form.books)
    const total = tuition + boarding + development + books
    api.patch(`/api/fees/structure/${editTarget.id}/`, { tuition, boarding, development, books })
      .then(r => setFees((prev) => prev.map((f) => f.id === editTarget.id ? { ...f, ...r.data } : f)))
      .catch(() => setFees((prev) => prev.map((f) => f.id === editTarget.id ? { ...f, tuition, boarding, development, books, total } : f)))
    setOpen(false)
  }

  const fmt = (n: number) => `₦${(n ?? 0).toLocaleString()}`

  const totalRevenue = fees.reduce((sum: number, f: any) => sum + (f.total ?? 0), 0)
  const avgFee = fees.length > 0 ? Math.round(totalRevenue / fees.length) : 0
  const highestFee = fees.length > 0 ? Math.max(...fees.map((f: any) => f.total ?? 0)) : 0

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <DashboardHeader title="Fee Structure" description="Manage tuition and boarding fee schedules for all class levels." />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Class Levels",    value: fees.length,    icon: BookOpen,    color: "text-primary",     bg: "bg-primary/10" },
          { label: "Average Fee",     value: fmt(avgFee),    icon: DollarSign,  color: "text-accent",      bg: "bg-accent/10" },
          { label: "Highest Fee",     value: fmt(highestFee), icon: TrendingUp, color: "text-blue-600",    bg: "bg-blue-500/10" },
          { label: "Academic Session", value: "2025/2026",   icon: CreditCard,  color: "text-purple-600",  bg: "bg-purple-500/10" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className={`rounded-lg p-2 ${bg}`}><Icon className={`h-5 w-5 ${color}`} /></div>
              <div><p className="text-xl font-bold">{value}</p><p className="text-sm text-muted-foreground">{label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fee Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fees.map((f) => (
          <Card key={f.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{f.className || f.class || f.studentClass || f.level}</CardTitle>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">{f.session}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "Tuition",      value: f.tuition },
                { label: "Boarding",     value: f.boarding },
                { label: "Development",  value: f.development },
                { label: "Books",        value: f.books },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span>{fmt(value)}</span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary text-lg">{fmt(f.total)}</span>
              </div>
              <Button variant="outline" size="sm" className="w-full gap-1 mt-2" onClick={() => openEdit(f)}>
                <Edit className="h-3.5 w-3.5" />Edit Fees
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Comparison Table</CardTitle>
          <CardDescription>Side-by-side comparison of fees across all class levels</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead className="text-right">Tuition</TableHead>
                <TableHead className="text-right hidden sm:table-cell">Boarding</TableHead>
                <TableHead className="text-right hidden sm:table-cell">Development</TableHead>
                <TableHead className="text-right hidden sm:table-cell">Books</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fees.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium">{f.className || f.class || f.studentClass || f.level}</TableCell>
                  <TableCell className="text-right">{fmt(f.tuition)}</TableCell>
                  <TableCell className="text-right hidden sm:table-cell">{fmt(f.boarding)}</TableCell>
                  <TableCell className="text-right hidden sm:table-cell">{fmt(f.development)}</TableCell>
                  <TableCell className="text-right hidden sm:table-cell">{fmt(f.books)}</TableCell>
                  <TableCell className="text-right font-semibold text-primary">{fmt(f.total)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(f)}>
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Fee Structure — {editTarget?.className || editTarget?.class || editTarget?.level}</DialogTitle>
            <DialogDescription>Update the fee components for {editTarget?.className || editTarget?.class || editTarget?.level}. All amounts in Nigerian Naira (₦).</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            {(["tuition", "boarding", "development", "books"] as const).map((field) => (
              <div key={field} className="grid gap-1.5">
                <Label className="capitalize">{field} (₦)</Label>
                <Input
                  type="number"
                  value={form[field]}
                  onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                  placeholder="Enter amount"
                />
              </div>
            ))}
            <div className="rounded-lg border bg-muted/40 p-3 flex justify-between font-semibold">
              <span>Computed Total</span>
              <span className="text-primary">
                {fmt(["tuition","boarding","development","books"].reduce((s, k) => s + (parseInt((form as Record<string,string>)[k]) || 0), 0))}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
