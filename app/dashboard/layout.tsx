import { SidebarWrapper } from "@/components/sidebar-wrapper"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SidebarWrapper />
      <main className="transition-all duration-300 md:ml-64">
        {children}
      </main>
    </div>
  )
}
