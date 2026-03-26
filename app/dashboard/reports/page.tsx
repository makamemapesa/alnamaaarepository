"use client"
import { useState } from "react"
import { BarChart3, Download, Filter, TrendingUp, Users, BookOpen, DollarSign } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const enrollmentData = [{ month: "Jan", students: 1100 }, { month: "Jun", students: 1247 }]
const performanceData = [{ subject: "Math", average: 72 }, { subject: "English", average: 78 }]

export default function ReportsPage() {
  const [reportType, setReportType] = useState("enrollment")

  return (
    <>
      <DashboardHeader
        title="Reports & Analytics"
        description="View comprehensive school analytics and insights"
      />
      <div className="p-6 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Total Enrollment", value: "1,247" },
            { label: "Average Attendance", value: "94.2%" },
            { label: "Total Revenue", value: "45.6M" },
            { label: "Subject Count", value: "14" },
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
    </>
  )
}
