"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload, Save, Heart } from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { donors } from "@/lib/mock-data"

const activeDonors = donors.filter((d) => d.status === "active")

export default function RegisterStudentPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [hasDonor, setHasDonor] = useState(false)
  const [selectedDonor, setSelectedDonor] = useState("")
  const [donorNumber, setDonorNumber] = useState("")
  const [isOrphan, setIsOrphan] = useState(false)

  return (
    <>
      <DashboardHeader
        title="Student Registration"
        description="Register a new student into the system"
      />

      <div className="p-6">
        <Link href="/dashboard/students">
          <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Students
          </Button>
        </Link>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            {["Personal Info", "Parent/Guardian", "Academic Details", "Documents"].map((label, index) => (
              <div key={label} className="flex items-center gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                      step > index + 1
                        ? "bg-accent text-accent-foreground"
                        : step === index + 1
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${step === index + 1 ? "text-foreground" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                </div>
                {index < 3 && (
                  <div className={`flex-1 h-0.5 ${step > index + 1 ? "bg-accent" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: "var(--font-heading)" }}>Personal Information</CardTitle>
              <CardDescription>Enter the student&apos;s personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label>First Name *</Label>
                  <Input placeholder="Enter first name" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Last Name *</Label>
                  <Input placeholder="Enter last name" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Middle Name</Label>
                  <Input placeholder="Enter middle name" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Date of Birth *</Label>
                  <Input type="date" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Gender *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Blood Group</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                        <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Religion</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select religion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="islam">Islam</SelectItem>
                      <SelectItem value="christianity">Christianity</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>State of Origin</Label>
                  <Input placeholder="Enter state of origin" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <Label>Residential Address *</Label>
                  <Textarea placeholder="Enter full address" rows={3} />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <Label>Orphan Status</Label>
                  <div className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
                    <Checkbox
                      id="isOrphan"
                      checked={isOrphan}
                      onCheckedChange={(v) => setIsOrphan(!!v)}
                    />
                    <Label htmlFor="isOrphan" className="cursor-pointer font-normal">
                      This student is an orphan
                    </Label>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={() => setStep(2)}>
                  Next Step
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Parent/Guardian */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: "var(--font-heading)" }}>Parent / Guardian Information</CardTitle>
              <CardDescription>Enter the parent or guardian&apos;s details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label>Full Name *</Label>
                  <Input placeholder="Enter parent/guardian name" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Relationship *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="father">Father</SelectItem>
                      <SelectItem value="mother">Mother</SelectItem>
                      <SelectItem value="guardian">Guardian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Phone Number *</Label>
                  <Input type="tel" placeholder="+234 XXX XXX XXXX" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="Enter email" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Occupation</Label>
                  <Input placeholder="Enter occupation" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Office Address</Label>
                  <Input placeholder="Enter office address" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <Label>Home Address</Label>
                  <Textarea placeholder="Enter home address" rows={3} />
                </div>
              </div>

              <Separator className="my-6" />

              <p className="text-sm font-medium text-muted-foreground mb-4">Emergency Contact (if different from parent)</p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label>Emergency Contact Name</Label>
                  <Input placeholder="Enter name" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Emergency Contact Phone</Label>
                  <Input type="tel" placeholder="+234 XXX XXX XXXX" />
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>Previous</Button>
                <Button onClick={() => setStep(3)}>Next Step</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Academic Details */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: "var(--font-heading)" }}>Academic Details</CardTitle>
              <CardDescription>Configure class and academic information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label>Admission Class *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {["JSS 1A", "JSS 1B", "JSS 2A", "JSS 2B", "JSS 3A", "JSS 3B", "SS 1A", "SS 1B", "SS 2A", "SS 2B", "SS 3A", "SS 3B"].map((cls) => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Academic Session *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select session" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025-2026">2025/2026</SelectItem>
                      <SelectItem value="2026-2027">2026/2027</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Admission Date *</Label>
                  <Input type="date" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Student Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Day Student</SelectItem>
                      <SelectItem value="boarding">Boarding Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Previous School</Label>
                  <Input placeholder="Enter previous school name" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Previous Class</Label>
                  <Input placeholder="Enter previous class" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <Label>Registration Number *</Label>
                  <Input placeholder="e.g. FISS/2026/157" />
                  <p className="text-xs text-muted-foreground">Enter the student&apos;s registration number manually.</p>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Donor / Sponsor Section */}
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="hasDonor"
                    checked={hasDonor}
                    onCheckedChange={(v) => {
                      setHasDonor(!!v)
                      if (!v) { setSelectedDonor(""); setDonorNumber("") }
                    }}
                  />
                  <Label htmlFor="hasDonor" className="flex cursor-pointer items-center gap-2 font-medium">
                    <Heart className="h-4 w-4 text-pink-500" />
                    This student has a donor / sponsor
                  </Label>
                </div>

                {hasDonor && (
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label>Select Donor *</Label>
                      <Select value={selectedDonor} onValueChange={setSelectedDonor}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a donor from the list" />
                        </SelectTrigger>
                        <SelectContent>
                          {activeDonors.map((d) => (
                            <SelectItem key={d.id} value={d.id}>
                              <span className="font-medium">{d.name}</span>
                              <span className="ml-2 text-xs text-muted-foreground">({d.type})</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedDonor && (() => {
                        const d = activeDonors.find((x) => x.id === selectedDonor)
                        return d ? (
                          <p className="text-xs text-muted-foreground">
                            Contact: {d.contact} &bull; {d.phone}
                          </p>
                        ) : null
                      })()}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Student Donor Number *</Label>
                      <Input
                        placeholder="e.g. DON-2026-042"
                        value={donorNumber}
                        onChange={(e) => setDonorNumber(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        The reference number assigned to this student by the donor
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>Previous</Button>
                <Button onClick={() => setStep(4)}>Next Step</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Documents */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: "var(--font-heading)" }}>Document Uploads</CardTitle>
              <CardDescription>Upload required documents for the student record</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[
                  { label: "Passport Photograph *", accept: "image/*" },
                  { label: "Birth Certificate *", accept: ".pdf,image/*" },
                  { label: "Previous School Report", accept: ".pdf,image/*" },
                  { label: "Transfer Certificate", accept: ".pdf,image/*" },
                  { label: "Medical Certificate", accept: ".pdf,image/*" },
                  { label: "Other Documents", accept: ".pdf,image/*" },
                ].map((doc) => (
                  <div key={doc.label} className="flex flex-col gap-2">
                    <Label>{doc.label}</Label>
                    <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border p-6 hover:border-primary/30 transition-colors cursor-pointer">
                      <div className="flex flex-col items-center gap-2 text-center">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Click to upload</p>
                          <p className="text-[10px] text-muted-foreground/60">PNG, JPG, PDF up to 5MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="rounded-lg bg-accent/10 border border-accent/20 p-4">
                <p className="text-sm font-medium text-card-foreground mb-1">Ready to Register</p>
                <p className="text-xs text-muted-foreground">
                  Review all information before submitting. The student will receive an auto-generated registration number, and the parent/guardian will be notified via email.
                </p>
              </div>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>Previous</Button>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Save className="mr-2 h-4 w-4" /> Complete Registration
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
