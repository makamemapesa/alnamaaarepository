"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardList,
  CreditCard,
  Bell,
  Settings,
  ChevronDown,
  Menu,
  X,
  LogOut,
  School,
  BarChart3,
  FileText,
  UserCog,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "User Management",
    href: "/dashboard/users",
    icon: UserCog,
  },
  {
    label: "Students",
    icon: GraduationCap,
    children: [
      { label: "All Students", href: "/dashboard/students" },
      { label: "New Registration", href: "/dashboard/students/register" },
      { label: "Promotions", href: "/dashboard/students/promotions" },
    ],
  },
  {
    label: "Academics",
    icon: BookOpen,
    children: [
      { label: "Classes", href: "/dashboard/academics/classes" },
      { label: "Subjects", href: "/dashboard/academics/subjects" },
      { label: "Teacher Assignment", href: "/dashboard/academics/assignments" },
    ],
  },
  {
    label: "Examinations",
    icon: ClipboardList,
    children: [
      { label: "Marks Entry", href: "/dashboard/exams/marks" },
      { label: "Results", href: "/dashboard/exams/results" },
      { label: "Report Cards", href: "/dashboard/exams/reports" },
      { label: "Merit List", href: "/dashboard/exams/merit" },
    ],
  },
  {
    label: "Fees & Payments",
    icon: CreditCard,
    children: [
      { label: "Fee Structure", href: "/dashboard/fees/structure" },
      { label: "Payments", href: "/dashboard/fees/payments" },
      { label: "Outstanding", href: "/dashboard/fees/outstanding" },
    ],
  },
  {
    label: "Reports & Analytics",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    label: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
    badge: 2,
  },
  {
    label: "Audit Logs",
    href: "/dashboard/audit",
    icon: Shield,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

interface NavItemProps {
  item: (typeof navigation)[number]
  collapsed: boolean
}

function NavItem({ item, collapsed }: NavItemProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const Icon = item.icon

  const isActive = item.href
    ? pathname === item.href
    : item.children?.some((child) => pathname === child.href)

  if (item.children) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </>
            )}
          </button>
        </CollapsibleTrigger>
        {!collapsed && (
          <CollapsibleContent className="pl-8 pt-1">
            <div className="flex flex-col gap-0.5 border-l-2 border-sidebar-border pl-3">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors",
                    pathname === child.href
                      ? "text-sidebar-primary font-medium"
                      : "text-sidebar-foreground/60 hover:text-sidebar-foreground"
                  )}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </CollapsibleContent>
        )}
      </Collapsible>
    )
  }

  return (
    <Link
      href={item.href!}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-primary"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed && <span className="flex-1">{item.label}</span>}
      {!collapsed && item.badge && (
        <Badge className="bg-accent text-accent-foreground h-5 px-1.5 text-xs">
          {item.badge}
        </Badge>
      )}
    </Link>
  )
}

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-3 z-50 md:hidden text-foreground"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span className="sr-only">Toggle navigation</span>
      </Button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300",
          collapsed ? "w-[68px]" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold text-sm">
            F
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight">FISS</span>
              <span className="text-[10px] text-sidebar-foreground/60 leading-none">
                School Management
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto hidden h-7 w-7 text-sidebar-foreground/60 hover:text-sidebar-foreground md:flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-3">
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => (
              <NavItem key={item.label} item={item} collapsed={collapsed} />
            ))}
          </nav>
        </ScrollArea>

        <Separator className="bg-sidebar-border" />

        {/* User section */}
        <div className="p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-sidebar-accent">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs">
                    IF
                  </AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <div className="flex-1 text-left">
                    <p className="text-xs font-medium leading-tight">Ibrahim Farukaktas</p>
                    <p className="text-[10px] text-sidebar-foreground/60">Super Admin</p>
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </>
  )
}
