"use client"

import { useState } from "react"
import {
  School, BookOpen, Shield, Bell, Save, CheckCircle2,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

function SavedBanner() {
  return (
    <div className="flex items-center gap-2 text-sm text-accent">
      <CheckCircle2 className="h-4 w-4" />
      <span>Settings saved successfully</span>
    </div>
  )
}

export default function SettingsPage() {
  const [saved, setSaved] = useState<string | null>(null)

  // School Info
  const [school, setSchool] = useState({
    name: "Federal Integrated School of Science (FISS)",
    shortName: "FISS",
    email: "admin@farukaktas.edu",
    phone: "+234 800 000 0000",
    address: "1 School Road, Farukaktas, Nigeria",
    motto: "Knowledge, Integrity, Excellence",
    website: "https://farukaktas.edu",
  })

  // Academic Settings
  const [academic, setAcademic] = useState({
    currentSession: "2025/2026",
    currentTerm: "Term 2",
    termStart: "2026-01-13",
    termEnd: "2026-04-18",
    gradingA: "70",
    gradingB: "60",
    gradingC: "50",
    gradingD: "40",
  })

  // Security
  const [security, setSecurity] = useState({
    minPasswordLength: "8",
    requireUppercase: true,
    requireNumbers: true,
    sessionTimeout: "60",
    twoFactor: false,
  })

  // Notifications
  const [notifSettings, setNotifSettings] = useState({
    emailOnPayment: true,
    emailOnResults: true,
    emailOnAbsence: false,
    smsOnPayment: false,
    smsOnAbsence: true,
    weeklyReport: true,
  })

  const save = (tab: string) => {
    setSaved(tab)
    setTimeout(() => setSaved(null), 3000)
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <DashboardHeader title="Settings" description="Configure school information, academic terms, security and notification preferences." />

      <Tabs defaultValue="school">
        <TabsList className="mb-2">
          <TabsTrigger value="school" className="gap-1.5"><School className="h-4 w-4" />School Info</TabsTrigger>
          <TabsTrigger value="academic" className="gap-1.5"><BookOpen className="h-4 w-4" />Academic</TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5"><Shield className="h-4 w-4" />Security</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5"><Bell className="h-4 w-4" />Notifications</TabsTrigger>
        </TabsList>

        {/* ── School Info ── */}
        <TabsContent value="school">
          <Card>
            <CardHeader>
              <CardTitle>School Information</CardTitle>
              <CardDescription>Basic details about the school. Used across the system and in printed documents.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5 sm:col-span-2">
                  <Label>Full School Name</Label>
                  <Input value={school.name} onChange={(e) => setSchool((s) => ({ ...s, name: e.target.value }))} />
                </div>
                <div className="grid gap-1.5">
                  <Label>Short Name / Abbreviation</Label>
                  <Input value={school.shortName} onChange={(e) => setSchool((s) => ({ ...s, shortName: e.target.value }))} />
                </div>
                <div className="grid gap-1.5">
                  <Label>School Email</Label>
                  <Input type="email" value={school.email} onChange={(e) => setSchool((s) => ({ ...s, email: e.target.value }))} />
                </div>
                <div className="grid gap-1.5">
                  <Label>Phone Number</Label>
                  <Input value={school.phone} onChange={(e) => setSchool((s) => ({ ...s, phone: e.target.value }))} />
                </div>
                <div className="grid gap-1.5">
                  <Label>Website</Label>
                  <Input value={school.website} onChange={(e) => setSchool((s) => ({ ...s, website: e.target.value }))} />
                </div>
                <div className="grid gap-1.5 sm:col-span-2">
                  <Label>Address</Label>
                  <Textarea rows={2} value={school.address} onChange={(e) => setSchool((s) => ({ ...s, address: e.target.value }))} />
                </div>
                <div className="grid gap-1.5 sm:col-span-2">
                  <Label>School Motto</Label>
                  <Input value={school.motto} onChange={(e) => setSchool((s) => ({ ...s, motto: e.target.value }))} />
                </div>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <Button className="gap-1.5" onClick={() => save("school")}><Save className="h-4 w-4" />Save Changes</Button>
                {saved === "school" && <SavedBanner />}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Academic ── */}
        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle>Academic Settings</CardTitle>
              <CardDescription>Configure the current academic session, term dates and grading scale.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wide">Current Period</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label>Academic Session</Label>
                    <Select value={academic.currentSession} onValueChange={(v) => setAcademic((a) => ({ ...a, currentSession: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["2024/2025","2025/2026","2026/2027"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1.5">
                    <Label>Current Term</Label>
                    <Select value={academic.currentTerm} onValueChange={(v) => setAcademic((a) => ({ ...a, currentTerm: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["Term 1","Term 2","Term 3"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1.5">
                    <Label>Term Start Date</Label>
                    <Input type="date" value={academic.termStart} onChange={(e) => setAcademic((a) => ({ ...a, termStart: e.target.value }))} />
                  </div>
                  <div className="grid gap-1.5">
                    <Label>Term End Date</Label>
                    <Input type="date" value={academic.termEnd} onChange={(e) => setAcademic((a) => ({ ...a, termEnd: e.target.value }))} />
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <p className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wide">Grading Scale (minimum score for grade)</p>
                <div className="grid gap-4 sm:grid-cols-4">
                  {([["A", "gradingA"], ["B", "gradingB"], ["C", "gradingC"], ["D", "gradingD"]] as [string, keyof typeof academic][]).map(([grade, key]) => (
                    <div key={grade} className="grid gap-1.5">
                      <Label>Grade {grade} (%)</Label>
                      <Input type="number" min={0} max={100} value={academic[key]} onChange={(e) => setAcademic((a) => ({ ...a, [key]: e.target.value }))} />
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">F = below Grade D threshold</p>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <Button className="gap-1.5" onClick={() => save("academic")}><Save className="h-4 w-4" />Save Changes</Button>
                {saved === "academic" && <SavedBanner />}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Security ── */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Password policies, session timeouts and two-factor authentication.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wide">Password Policy</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label>Minimum Password Length</Label>
                    <Input type="number" min={6} max={32} value={security.minPasswordLength} onChange={(e) => setSecurity((s) => ({ ...s, minPasswordLength: e.target.value }))} />
                  </div>
                  <div className="grid gap-1.5">
                    <Label>Session Timeout (minutes)</Label>
                    <Input type="number" min={5} value={security.sessionTimeout} onChange={(e) => setSecurity((s) => ({ ...s, sessionTimeout: e.target.value }))} />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Requirements</p>
                {[
                  { key: "requireUppercase", label: "Require uppercase letters", desc: "Passwords must contain at least one uppercase letter" },
                  { key: "requireNumbers",   label: "Require numbers",          desc: "Passwords must contain at least one number" },
                  { key: "twoFactor",        label: "Two-Factor Authentication",desc: "Require 2FA for all admin accounts" },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <Switch
                      checked={security[key as keyof typeof security] as boolean}
                      onCheckedChange={(v) => setSecurity((s) => ({ ...s, [key]: v }))}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 pt-2">
                <Button className="gap-1.5" onClick={() => save("security")}><Save className="h-4 w-4" />Save Changes</Button>
                {saved === "security" && <SavedBanner />}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Notifications ── */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose which events trigger email or SMS notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { section: "Email Notifications", items: [
                  { key: "emailOnPayment", label: "Payment Received",     desc: "Email when a fee payment is confirmed" },
                  { key: "emailOnResults", label: "Results Published",    desc: "Email when exam results are released" },
                  { key: "emailOnAbsence", label: "Student Absence Alert",desc: "Email when a student is absent for 3+ days" },
                  { key: "weeklyReport",   label: "Weekly Summary Report",desc: "Email a weekly activity digest every Friday" },
                ]},
                { section: "SMS Notifications", items: [
                  { key: "smsOnPayment", label: "Payment Confirmation", desc: "SMS to parent when fee payment is received" },
                  { key: "smsOnAbsence", label: "Absence Alert",        desc: "SMS to parent when student is absent" },
                ]},
              ].map(({ section, items }) => (
                <div key={section}>
                  <p className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wide">{section}</p>
                  <div className="space-y-4">
                    {items.map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium">{label}</p>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                        <Switch
                          checked={notifSettings[key as keyof typeof notifSettings]}
                          onCheckedChange={(v) => setNotifSettings((n) => ({ ...n, [key]: v }))}
                        />
                      </div>
                    ))}
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
              <div className="flex items-center gap-4">
                <Button className="gap-1.5" onClick={() => save("notifications")}><Save className="h-4 w-4" />Save Changes</Button>
                {saved === "notifications" && <SavedBanner />}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
