"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className="transition-all duration-300 md:ml-64">
        {children}
      </main>
    </div>
  )
}
