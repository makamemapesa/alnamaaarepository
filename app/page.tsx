import Link from "next/link"
import {
  GraduationCap,
  Users,
  BookOpen,
  Shield,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  Building,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              F
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                Farukaktas School
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {["Home", "About", "Admissions", "News", "Contact"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/results">
              <Button variant="outline" size="sm" className="text-xs">
                Results Portal
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="text-xs">
                Staff Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-24 lg:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.30_0.10_250)_0%,oklch(0.20_0.08_250)_50%,oklch(0.35_0.12_250)_100%)]" />
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full border border-primary-foreground/5" />
        <div className="absolute -bottom-60 -left-40 h-[800px] w-[800px] rounded-full border border-primary-foreground/5" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10">
              Admissions Open for 2026/2027
            </Badge>
            <h1
              className="text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl text-balance"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Building Future Leaders Through{" "}
              <span className="text-accent">Excellence</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80 max-w-2xl mx-auto text-pretty">
              Farukaktas School provides world-class education with modern facilities, experienced teachers, and a nurturing environment that inspires every child to achieve their full potential.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Apply for Admission <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/results">
                <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                  Check Results
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Students", value: "1,247+", icon: GraduationCap },
              { label: "Qualified Teachers", value: "68+", icon: Users },
              { label: "Pass Rate", value: "87.5%", icon: Award },
              { label: "Years of Excellence", value: "15+", icon: Building },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-5 text-center backdrop-blur-sm"
              >
                <stat.icon className="mx-auto h-6 w-6 text-accent mb-2" />
                <p className="text-2xl font-bold text-primary-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                  {stat.value}
                </p>
                <p className="text-xs text-primary-foreground/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <Badge variant="secondary" className="mb-4">About Our School</Badge>
            <h2 className="text-3xl font-bold text-foreground lg:text-4xl text-balance" style={{ fontFamily: "var(--font-heading)" }}>
              Why Choose Farukaktas School
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
              We combine academic excellence with character development, preparing students for success in a rapidly changing world.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Academic Excellence",
                description: "Comprehensive curriculum following national standards with enriched programs in STEM, arts, and languages.",
              },
              {
                icon: Users,
                title: "Experienced Faculty",
                description: "Our 68+ qualified and dedicated teachers bring expertise and passion to create engaging learning experiences.",
              },
              {
                icon: Shield,
                title: "Safe Environment",
                description: "Secure campus with modern facilities, ensuring your child learns and grows in a protected, nurturing space.",
              },
              {
                icon: GraduationCap,
                title: "Holistic Development",
                description: "Beyond academics, we focus on sports, arts, leadership, and moral development for well-rounded students.",
              },
              {
                icon: Award,
                title: "Proven Track Record",
                description: "Consistent 87.5% pass rate in national examinations with multiple award-winning students each year.",
              },
              {
                icon: Building,
                title: "Modern Facilities",
                description: "State-of-the-art laboratories, library, computer lab, sports facilities, and comfortable classrooms.",
              },
            ].map((feature) => (
              <Card key={feature.title} className="group hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-card-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions Section */}
      <section id="admissions" className="bg-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-0">
                Admissions 2026/2027
              </Badge>
              <h2 className="text-3xl font-bold text-foreground lg:text-4xl text-balance" style={{ fontFamily: "var(--font-heading)" }}>
                Join Our Growing Community
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
                We are now accepting applications for the upcoming academic session. Secure your child&apos;s place in one of the finest educational institutions.
              </p>

              <div className="mt-8 flex flex-col gap-4">
                {[
                  "JSS 1 - JSS 3 (Junior Secondary School)",
                  "SS 1 - SS 3 (Senior Secondary School)",
                  "Both day and boarding options available",
                  "Scholarship programs for exceptional students",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <ChevronRight className="h-3 w-3" />
                    </div>
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-3">
                <Button>
                  Start Application <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline">Download Prospectus</Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="text-xl font-semibold text-card-foreground mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                Admission Requirements
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { step: "01", title: "Birth Certificate", desc: "Original and photocopy of birth certificate" },
                  { step: "02", title: "Previous Records", desc: "Last school report card and transfer certificate" },
                  { step: "03", title: "Entrance Examination", desc: "Pass our entrance examination in core subjects" },
                  { step: "04", title: "Interview", desc: "Student and parent/guardian interview session" },
                  { step: "05", title: "Registration", desc: "Complete registration and fee payment" },
                ].map((req) => (
                  <div key={req.step} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">
                      {req.step}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">{req.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{req.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <Badge variant="secondary" className="mb-4">Latest Updates</Badge>
            <h2 className="text-3xl font-bold text-foreground lg:text-4xl text-balance" style={{ fontFamily: "var(--font-heading)" }}>
              News & Announcements
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                category: "Achievement",
                title: "Farukaktas School Wins Inter-School Science Competition",
                excerpt: "Our students showcased exceptional talent at the regional science fair, bringing home the gold trophy in both junior and senior categories.",
                date: "Feb 20, 2026",
              },
              {
                category: "Infrastructure",
                title: "New Computer Lab Inaugurated",
                excerpt: "The state-of-the-art computer laboratory with 50 workstations was officially opened by the school board chairman.",
                date: "Feb 15, 2026",
              },
              {
                category: "Admissions",
                title: "Admissions Open for 2026/2027 Session",
                excerpt: "We are now accepting applications for new students. Limited spaces available across all JSS and SS classes.",
                date: "Feb 10, 2026",
              },
            ].map((article) => (
              <Card key={article.title} className="group overflow-hidden hover:border-primary/20 transition-colors">
                <div className="h-48 bg-muted flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground/30" />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-[10px]">{article.category}</Badge>
                    <span className="text-[10px] text-muted-foreground">{article.date}</span>
                  </div>
                  <h3 className="text-base font-semibold text-card-foreground leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <Button variant="ghost" className="mt-3 p-0 h-auto text-xs text-primary">
                    Read More <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-0">Get in Touch</Badge>
              <h2 className="text-3xl font-bold text-foreground lg:text-4xl text-balance" style={{ fontFamily: "var(--font-heading)" }}>
                Contact Information
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
                We are always here to answer your questions and provide the information you need about our school.
              </p>

              <div className="mt-8 flex flex-col gap-5">
                {[
                  { icon: MapPin, label: "Address", value: "123 Education Lane, Kaduna, Nigeria" },
                  { icon: Phone, label: "Phone", value: "+234 801 234 5678" },
                  { icon: Mail, label: "Email", value: "info@farukaktas.edu" },
                  { icon: Clock, label: "Office Hours", value: "Mon - Fri: 8:00 AM - 4:00 PM" },
                ].map((contact) => (
                  <div key={contact.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <contact.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{contact.label}</p>
                      <p className="text-sm font-medium text-foreground mt-0.5">{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Send us a Message
                </h3>
                <form className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First Name" className="bg-secondary" />
                    <Input placeholder="Last Name" className="bg-secondary" />
                  </div>
                  <Input placeholder="Email Address" type="email" className="bg-secondary" />
                  <Input placeholder="Phone Number" className="bg-secondary" />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="flex w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  <Button className="w-full">
                    Send Message <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold text-sm">
                  F
                </div>
                <span className="text-sm font-bold text-primary-foreground">Farukaktas School</span>
              </div>
              <p className="text-xs text-primary-foreground/60 leading-relaxed">
                Building future leaders through excellence in education, character, and innovation since 2011.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-primary-foreground mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {["About Us", "Admissions", "Academics", "Contact"].map((link) => (
                  <a key={link} href="#" className="text-xs text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-primary-foreground mb-3">Portals</h4>
              <div className="flex flex-col gap-2">
                {["Student Portal", "Parent Portal", "Teacher Portal", "Results Portal"].map((link) => (
                  <a key={link} href="#" className="text-xs text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-primary-foreground mb-3">Contact</h4>
              <div className="flex flex-col gap-2 text-xs text-primary-foreground/60">
                <span>123 Education Lane, Kaduna</span>
                <span>+234 801 234 5678</span>
                <span>info@farukaktas.edu</span>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center">
            <p className="text-xs text-primary-foreground/40">
              2026 Farukaktas Integrated School System (FISS). All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
