"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { api, getResults } from "@/lib/api-client"
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

export default function RegisterStudentPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [hasDonor, setHasDonor] = useState(false)
  const [selectedDonor, setSelectedDonor] = useState("")
  const [donorsData, setDonorsData] = useState<any[]>([])

  const activeDonors = donorsData.filter((d: any) => d.status === "active")

  useEffect(() => {
    api.get("/api/donors/").then(r => setDonorsData(getResults(r.data))).catch(() => {})
  }, [])
  const [donorNumber, setDonorNumber] = useState("")
  const [isOrphan, setIsOrphan] = useState(false)
  const [form, setForm] = useState({
    firstName: "", lastName: "", middleName: "", dateOfBirth: "",
    gender: "", bloodGroup: "", religion: "", stateOfOrigin: "", address: "",
    parentName: "", relationship: "", parentPhone: "", parentEmail: "",
    occupation: "", officeAddress: "", homeAddress: "",
    emergencyName: "", emergencyPhone: "",
    admissionClass: "", academicSession: "2025-2026", admissionDate: "",
    studentType: "", previousSchool: "", previousClass: "", regNo: "",
  })
  const [files, setFiles] = useState<Record<string, File | null>>({})
  const [submitting, setSubmitting] = useState(false)
  const [classes, setClasses] = useState<any[]>([])

  useEffect(() => {
    api.get("/api/classes/").then(r => setClasses(getResults(r.data))).catch(() => {})
  }, [])

  const setField = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }))

  const DOCS = [
    { key: "passport", label: "Passport Photograph *", accept: "image/*" },
    { key: "birth_certificate", label: "Birth Certificate *", accept: ".pdf,image/*" },
    { key: "school_report", label: "Previous School Report", accept: ".pdf,image/*" },
    { key: "transfer_certificate", label: "Transfer Certificate", accept: ".pdf,image/*" },
    { key: "medical_certificate", label: "Medical Certificate", accept: ".pdf,image/*" },
    { key: "other", label: "Other Documents", accept: ".pdf,image/*" },
  ]

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const payload: any = {
        firstName: form.firstName, lastName: form.lastName, middleName: form.middleName,
        dateOfBirth: form.dateOfBirth, gender: form.gender, bloodGroup: form.bloodGroup,
        religion: form.religion, stateOfOrigin: form.stateOfOrigin, address: form.address,
        isOrphan,
        parentName: form.parentName, relationship: form.relationship,
        parentPhone: form.parentPhone, parentEmail: form.parentEmail,
        occupation: form.occupation, officeAddress: form.officeAddress,
        homeAddress: form.homeAddress, emergencyContactName: form.emergencyName,
        emergencyContactPhone: form.emergencyPhone,
        currentClass: form.admissionClass, academicSession: form.academicSession,
        admissionDate: form.admissionDate, studentType: form.studentType,
        previousSchool: form.previousSchool, previousClass: form.previousClass,
        regNo: form.regNo,
      }
      if (hasDonor && selectedDonor) {
        payload.donor = Number(selectedDonor)
        payload.donorNumber = donorNumber
      }
      const res = await api.post("/api/students/", payload)
      const studentId = res.data.id
      for (const [key, file] of Object.entries(files)) {
        if (!file) continue
        const fd = new FormData()
        fd.append("document_type", key)
        fd.append("file", file)
        await api.post(`/api/students/${studentId}/upload_document/`, fd)
      }
      router.push("/dashboard/students")
    } catch (e) {
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

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
                  <Input placeholder="Enter first name" value={form.firstName} onChange={e => setField("firstName", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Last Name *</Label>
                  <Input placeholder="Enter last name" value={form.lastName} onChange={e => setField("lastName", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Middle Name</Label>
                  <Input placeholder="Enter middle name" value={form.middleName} onChange={e => setField("middleName", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Date of Birth *</Label>
                  <Input type="date" value={form.dateOfBirth} onChange={e => setField("dateOfBirth", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Gender *</Label>
                  <Select value={form.gender} onValueChange={v => setField("gender", v)}>
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
                  <Select value={form.bloodGroup} onValueChange={v => setField("bloodGroup", v)}>
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
                  <Select value={form.religion} onValueChange={v => setField("religion", v)}>
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
                  <Input placeholder="Enter state of origin" value={form.stateOfOrigin} onChange={e => setField("stateOfOrigin", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <Label>Residential Address *</Label>
                  <Textarea placeholder="Enter full address" rows={3} value={form.address} onChange={e => setField("address", e.target.value)} />
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
                  <Input placeholder="Enter parent/guardian name" value={form.parentName} onChange={e => setField("parentName", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Relationship *</Label>
                  <Select value={form.relationship} onValueChange={v => setField("relationship", v)}>
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
                  <Input type="tel" placeholder="+234 XXX XXX XXXX" value={form.parentPhone} onChange={e => setField("parentPhone", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="Enter email" value={form.parentEmail} onChange={e => setField("parentEmail", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Occupation</Label>
                  <Input placeholder="Enter occupation" value={form.occupation} onChange={e => setField("occupation", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Office Address</Label>
                  <Input placeholder="Enter office address" value={form.officeAddress} onChange={e => setField("officeAddress", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <Label>Home Address</Label>
                  <Textarea placeholder="Enter home address" rows={3} value={form.homeAddress} onChange={e => setField("homeAddress", e.target.value)} />
                </div>
              </div>

              <Separator className="my-6" />

              <p className="text-sm font-medium text-muted-foreground mb-4">Emergency Contact (if different from parent)</p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label>Emergency Contact Name</Label>
                  <Input placeholder="Enter name" value={form.emergencyName} onChange={e => setField("emergencyName", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Emergency Contact Phone</Label>
                  <Input type="tel" placeholder="+234 XXX XXX XXXX" value={form.emergencyPhone} onChange={e => setField("emergencyPhone", e.target.value)} />
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
                  <Select value={form.admissionClass} onValueChange={v => setField("admissionClass", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls: any) => (
                        <SelectItem key={cls.id} value={String(cls.id)}>{cls.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Academic Session *</Label>
                  <Select value={form.academicSession} onValueChange={v => setField("academicSession", v)}>
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
                  <Input type="date" value={form.admissionDate} onChange={e => setField("admissionDate", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Student Type *</Label>
                  <Select value={form.studentType} onValueChange={v => setField("studentType", v)}>
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
                  <Input placeholder="Enter previous school name" value={form.previousSchool} onChange={e => setField("previousSchool", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Previous Class</Label>
                  <Input placeholder="Enter previous class" value={form.previousClass} onChange={e => setField("previousClass", e.target.value)} />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <Label>Registration Number *</Label>
                  <Input placeholder="e.g. FISS/2026/157" value={form.regNo} onChange={e => setField("regNo", e.target.value)} />
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
                          {activeDonors.map((d: any) => (
                            <SelectItem key={d.id} value={String(d.id)}>
                              <span className="font-medium">{d.name}</span>
                              <span className="ml-2 text-xs text-muted-foreground">({d.type})</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedDonor && (() => {
                        const d = activeDonors.find((x: any) => String(x.id) === selectedDonor)
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
                {DOCS.map((doc) => (
                  <div key={doc.key} className="flex flex-col gap-2">
                    <Label>{doc.label}</Label>
                    <label
                      htmlFor={`file-${doc.key}`}
                      className="flex items-center justify-center rounded-lg border-2 border-dashed border-border p-6 hover:border-primary/30 transition-colors cursor-pointer"
                    >
                      <div className="flex flex-col items-center gap-2 text-center">
                        {files[doc.key] ? (
                          <>
                            <Upload className="h-8 w-8 text-accent" />
                            <p className="text-xs font-medium text-foreground truncate max-w-[160px]">{files[doc.key]!.name}</p>
                          </>
                        ) : (
                          <>
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <div>
                              <p className="text-xs font-medium text-muted-foreground">Click to upload</p>
                              <p className="text-[10px] text-muted-foreground/60">PNG, JPG, PDF up to 5MB</p>
                            </div>
                          </>
                        )}
                      </div>
                    </label>
                    <input
                      type="file"
                      id={`file-${doc.key}`}
                      accept={doc.accept}
                      className="hidden"
                      onChange={e => setFiles(prev => ({ ...prev, [doc.key]: e.target.files?.[0] ?? null }))}
                    />
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
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleSubmit} disabled={submitting}>
                  <Save className="mr-2 h-4 w-4" /> {submitting ? "Registering..." : "Complete Registration"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
