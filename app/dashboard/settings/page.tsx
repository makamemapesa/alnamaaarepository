"use client"
import { useState } from "react"
import { Settings, Bell, Lock, Palette, ToggleRight, Save, RotateCcw } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [schoolName, setSchoolName] = useState("Farukaktas Integrated School System")
  const [schoolEmail, setSchoolEmail] = useState("info@farukaktas.edu")
  const [theme, setTheme] = useState("light")

  const handleSave = () => {
    alert("Settings saved successfully!")
  }

  return (
    <>
      <DashboardHeader
        title="Settings"
        description="Configure system settings and preferences"
      />
      <div className="p-6 flex flex-col gap-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">School Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label>School Name</Label>
                  <Input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Email Address</Label>
                  <Input type="email" value={schoolEmail} onChange={(e) => setSchoolEmail(e.target.value)} />
                </div>
                <Separator />
                <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
