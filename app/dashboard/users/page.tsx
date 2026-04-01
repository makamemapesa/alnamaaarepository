"use client"

import { useState, useEffect } from "react"
import { api, getResults } from "@/lib/api-client"
import {
  Search,
  Plus,
  MoreHorizontal,
  Shield,
  UserCog,
  GraduationCap,
  Calculator,
  Users as UsersIcon,
  User,
  Filter,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const roleLabels: Record<string, string> = {
  super_admin: "Super Administrator",
  admin: "School Administrator",
  teacher: "Teacher",
  accountant: "Accountant",
  parent: "Parent",
}

const roleIcons: Record<string, React.ElementType> = {
  "super_admin": Shield,
  "admin": UserCog,
  "teacher": GraduationCap,
  "accountant": Calculator,
  "parent": UsersIcon,
  "student": User,
  // legacy labels for backwards compat
  "Super Administrator": Shield,
  "School Administrator": UserCog,
  "Teacher": GraduationCap,
  "Accountant": Calculator,
  "Parent": UsersIcon,
  "Student": User,
}

const roleColors: Record<string, string> = {
  "super_admin": "bg-primary/10 text-primary",
  "admin": "bg-accent/10 text-accent",
  "teacher": "bg-chart-3/10 text-chart-3",
  "accountant": "bg-chart-4/10 text-chart-4",
  "parent": "bg-chart-5/10 text-chart-5",
  // legacy labels
  "Super Administrator": "bg-primary/10 text-primary",
  "School Administrator": "bg-accent/10 text-accent",
  "Teacher": "bg-chart-3/10 text-chart-3",
  "Accountant": "bg-chart-4/10 text-chart-4",
  "Parent": "bg-chart-5/10 text-chart-5",
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [usersData, setUsersData] = useState<any[]>([])

  useEffect(() => {
    api.get("/api/users/").then(r => setUsersData(getResults(r.data))).catch(() => {})
  }, [])

  const getDisplayName = (user: any) =>
    [user.firstName, user.lastName].filter(Boolean).join(" ") || user.username || user.email || "Unknown"

  const filteredUsers = usersData.filter((user) => {
    const displayName = getDisplayName(user)
    const matchesSearch = displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const roleCounts = {
    all: usersData.length,
    super_admin: usersData.filter((u) => u.role === "super_admin").length,
    admin: usersData.filter((u) => u.role === "admin").length,
    teacher: usersData.filter((u) => u.role === "teacher").length,
    accountant: usersData.filter((u) => u.role === "accountant").length,
    parent: usersData.filter((u) => u.role === "parent").length,
  }

  return (
    <>
      <DashboardHeader
        title="User Management"
        description="Manage all system users and their access permissions"
      />

      <div className="p-6 flex flex-col gap-6">
        {/* Role Overview Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {[
            { role: "All Users", count: usersData.length, icon: UsersIcon, color: "bg-secondary text-secondary-foreground" },
            { role: "Super Admin", count: roleCounts.super_admin, icon: Shield, color: "bg-primary/10 text-primary" },
            { role: "Admin", count: roleCounts.admin, icon: UserCog, color: "bg-accent/10 text-accent" },
            { role: "Teachers", count: roleCounts.teacher, icon: GraduationCap, color: "bg-chart-3/10 text-chart-3" },
            { role: "Accountants", count: roleCounts.accountant, icon: Calculator, color: "bg-chart-4/10 text-chart-4" },
            { role: "Parents", count: roleCounts.parent, icon: UsersIcon, color: "bg-chart-5/10 text-chart-5" },
          ].map((item) => (
            <Card key={item.role} className="cursor-pointer hover:border-primary/20 transition-colors">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.count}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{item.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User Management Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base font-semibold">System Users</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle style={{ fontFamily: "var(--font-heading)" }}>Add New User</DialogTitle>
                    <DialogDescription>
                      Create a new user account with role-based access
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 py-4">
                    <div className="flex flex-col gap-2">
                      <Label>Full Name</Label>
                      <Input placeholder="Enter full name" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Email</Label>
                      <Input type="email" placeholder="Enter email address" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Role</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="super_admin">Super Administrator</SelectItem>
                          <SelectItem value="admin">School Administrator</SelectItem>
                          <SelectItem value="teacher">Teacher</SelectItem>
                          <SelectItem value="accountant">Accountant</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Temporary Password</Label>
                      <Input type="password" placeholder="Set a temporary password" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Create User</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users by name or email..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="accountant">Accountant</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/50">
                    <TableHead className="text-xs font-semibold">User</TableHead>
                    <TableHead className="text-xs font-semibold">Role</TableHead>
                    <TableHead className="text-xs font-semibold hidden md:table-cell">Last Login</TableHead>
                    <TableHead className="text-xs font-semibold">Status</TableHead>
                    <TableHead className="text-xs font-semibold w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => {
                    const displayName = getDisplayName(user)
                    const displayRole = roleLabels[user.role] || user.role || ""
                    const userStatus = user.isActive === false ? "inactive" : user.status || "active"
                    const RoleIcon = roleIcons[user.role] || User
                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                                {displayName.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-card-foreground">{displayName}</p>
                              <p className="text-[11px] text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={`text-[11px] ${roleColors[user.role] || ""}`}>
                            <RoleIcon className="mr-1 h-3 w-3" />
                            {displayRole}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="text-sm text-muted-foreground">
                            {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString("en-NG") : "Never"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={`text-[11px] ${
                              userStatus === "active"
                                ? "bg-accent/10 text-accent"
                                : "bg-destructive/10 text-destructive"
                            }`}
                          >
                            {userStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit User</DropdownMenuItem>
                              <DropdownMenuItem>Reset Password</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Deactivate User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
