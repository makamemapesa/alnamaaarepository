"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, School } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.30_0.10_250)_0%,oklch(0.20_0.08_250)_50%,oklch(0.35_0.12_250)_100%)]" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground font-bold text-lg">
              F
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>FISS</h1>
              <p className="text-xs text-primary-foreground/70">Farukaktas Integrated School System</p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-4xl font-bold leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                Manage your school with confidence
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed max-w-md">
                A secure, scalable, and user-friendly platform for managing student records, academic performance, and financial operations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Students Managed", value: "1,247+" },
                { label: "Teachers Active", value: "68" },
                { label: "Uptime", value: "99.9%" },
                { label: "Data Security", value: "256-bit" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-primary-foreground/10 backdrop-blur-sm p-4">
                  <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>{stat.value}</p>
                  <p className="text-xs text-primary-foreground/60 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-primary-foreground/40">
            Farukaktas Integrated School System. All rights reserved.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full border border-primary-foreground/5" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full border border-primary-foreground/5" />
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              F
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>FISS</h1>
              <p className="text-xs text-muted-foreground">Farukaktas Integrated School System</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your account to continue managing your school
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="role" className="text-sm font-medium text-foreground">
                Sign in as
              </Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role" className="bg-card">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">Super Administrator</SelectItem>
                  <SelectItem value="admin">School Administrator</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="accountant">Accountant / Bursar</SelectItem>
                  <SelectItem value="parent">Parent / Guardian</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@farukaktas.edu"
                  className="pl-10 bg-card"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <button type="button" className="text-xs text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 bg-card"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-8 rounded-lg border border-border bg-secondary/50 p-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Demo Credentials</p>
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              <span>Email: admin@farukaktas.edu</span>
              <span>Password: demo123</span>
              <span>Role: Super Administrator</span>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Need help? Contact your school administrator or{" "}
            <a href="#" className="text-primary hover:underline">get support</a>
          </p>
        </div>
      </div>
    </div>
  )
}
