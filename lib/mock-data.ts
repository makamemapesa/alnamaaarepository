// Mock data for FISS School Management System

export const currentUser = {
  id: "USR001",
  name: "Ibrahim Farukaktas",
  email: "admin@farukaktas.edu",
  role: "super_admin" as const,
  avatar: "/images/avatar-admin.jpg",
}

export const stats = {
  totalStudents: 1247,
  totalTeachers: 68,
  totalClasses: 42,
  totalRevenue: 45_600_000,
  pendingFees: 12_350_000,
  attendanceRate: 94.2,
  passRate: 87.5,
  newAdmissions: 156,
}

export const recentStudents = [
  { id: "STU001", name: "Amina Hassan", class: "JSS 3A", status: "active" as const, feeStatus: "paid" as const, regNo: "FISS/2024/001" },
  { id: "STU002", name: "Emmanuel Obi", class: "SS 2B", status: "active" as const, feeStatus: "partial" as const, regNo: "FISS/2024/002" },
  { id: "STU003", name: "Fatima Yusuf", class: "JSS 1C", status: "active" as const, feeStatus: "unpaid" as const, regNo: "FISS/2024/003" },
  { id: "STU004", name: "David Adamu", class: "SS 3A", status: "active" as const, feeStatus: "paid" as const, regNo: "FISS/2024/004" },
  { id: "STU005", name: "Grace Nwosu", class: "JSS 2B", status: "suspended" as const, feeStatus: "unpaid" as const, regNo: "FISS/2024/005" },
  { id: "STU006", name: "Mohammed Ali", class: "SS 1A", status: "active" as const, feeStatus: "paid" as const, regNo: "FISS/2024/006" },
  { id: "STU007", name: "Sarah Johnson", class: "JSS 3B", status: "active" as const, feeStatus: "partial" as const, regNo: "FISS/2024/007" },
  { id: "STU008", name: "Peter Okoro", class: "SS 2A", status: "active" as const, feeStatus: "paid" as const, regNo: "FISS/2024/008" },
]

export const teachers = [
  { id: "TCH001", name: "Dr. Abubakar Sani", subject: "Mathematics", classes: ["SS 2A", "SS 2B", "SS 3A"], phone: "+234 801 234 5678", email: "asani@farukaktas.edu" },
  { id: "TCH002", name: "Mrs. Ngozi Eze", subject: "English Language", classes: ["JSS 1A", "JSS 1B", "JSS 2A"], phone: "+234 802 345 6789", email: "neze@farukaktas.edu" },
  { id: "TCH003", name: "Mr. Yusuf Ibrahim", subject: "Physics", classes: ["SS 1A", "SS 1B", "SS 2A"], phone: "+234 803 456 7890", email: "yibrahim@farukaktas.edu" },
  { id: "TCH004", name: "Ms. Blessing Okafor", subject: "Biology", classes: ["SS 1A", "SS 2A", "SS 3A"], phone: "+234 804 567 8901", email: "bokafor@farukaktas.edu" },
  { id: "TCH005", name: "Mr. Hassan Musa", subject: "Chemistry", classes: ["SS 1B", "SS 2B", "SS 3B"], phone: "+234 805 678 9012", email: "hmusa@farukaktas.edu" },
  { id: "TCH006", name: "Mrs. Ada Nnamdi", subject: "Economics", classes: ["SS 1A", "SS 2A", "SS 3A"], phone: "+234 806 789 0123", email: "annamdi@farukaktas.edu" },
]

export const classes = [
  { id: "CLS001", name: "JSS 1A", students: 35, classTeacher: "Mrs. Ngozi Eze", section: "Junior" },
  { id: "CLS002", name: "JSS 1B", students: 33, classTeacher: "Mr. Yusuf Ibrahim", section: "Junior" },
  { id: "CLS003", name: "JSS 2A", students: 30, classTeacher: "Mrs. Ada Nnamdi", section: "Junior" },
  { id: "CLS004", name: "JSS 2B", students: 28, classTeacher: "Mr. Hassan Musa", section: "Junior" },
  { id: "CLS005", name: "JSS 3A", students: 32, classTeacher: "Dr. Abubakar Sani", section: "Junior" },
  { id: "CLS006", name: "JSS 3B", students: 30, classTeacher: "Ms. Blessing Okafor", section: "Junior" },
  { id: "CLS007", name: "SS 1A", students: 38, classTeacher: "Mr. Yusuf Ibrahim", section: "Senior" },
  { id: "CLS008", name: "SS 1B", students: 36, classTeacher: "Mr. Hassan Musa", section: "Senior" },
  { id: "CLS009", name: "SS 2A", students: 34, classTeacher: "Dr. Abubakar Sani", section: "Senior" },
  { id: "CLS010", name: "SS 2B", students: 31, classTeacher: "Mrs. Ada Nnamdi", section: "Senior" },
  { id: "CLS011", name: "SS 3A", students: 29, classTeacher: "Ms. Blessing Okafor", section: "Senior" },
  { id: "CLS012", name: "SS 3B", students: 27, classTeacher: "Mrs. Ngozi Eze", section: "Senior" },
]

export const recentPayments = [
  { id: "PAY001", studentName: "Amina Hassan", amount: 150000, date: "2026-02-25", method: "Bank Transfer", status: "confirmed" as const },
  { id: "PAY002", studentName: "David Adamu", amount: 200000, date: "2026-02-24", method: "Cash", status: "confirmed" as const },
  { id: "PAY003", studentName: "Emmanuel Obi", amount: 75000, date: "2026-02-24", method: "Mobile Money", status: "pending" as const },
  { id: "PAY004", studentName: "Mohammed Ali", amount: 150000, date: "2026-02-23", method: "Bank Transfer", status: "confirmed" as const },
  { id: "PAY005", studentName: "Peter Okoro", amount: 200000, date: "2026-02-22", method: "Bank Transfer", status: "confirmed" as const },
  { id: "PAY006", studentName: "Sarah Johnson", amount: 100000, date: "2026-02-21", method: "Cash", status: "pending" as const },
]

export const feeStructure = [
  { class: "JSS 1", tuition: 80000, boarding: 50000, development: 15000, books: 10000, total: 155000 },
  { class: "JSS 2", tuition: 85000, boarding: 50000, development: 15000, books: 10000, total: 160000 },
  { class: "JSS 3", tuition: 90000, boarding: 55000, development: 15000, books: 12000, total: 172000 },
  { class: "SS 1", tuition: 100000, boarding: 60000, development: 20000, books: 15000, total: 195000 },
  { class: "SS 2", tuition: 110000, boarding: 60000, development: 20000, books: 15000, total: 205000 },
  { class: "SS 3", tuition: 120000, boarding: 65000, development: 20000, books: 18000, total: 223000 },
]

export const examResults = [
  { studentName: "Amina Hassan", class: "JSS 3A", math: 85, english: 78, science: 92, social: 88, total: 343, average: 85.75, grade: "A", position: 1 },
  { studentName: "David Adamu", class: "SS 3A", math: 92, english: 88, science: 95, social: 85, total: 360, average: 90, grade: "A+", position: 1 },
  { studentName: "Emmanuel Obi", class: "SS 2B", math: 72, english: 65, science: 78, social: 70, total: 285, average: 71.25, grade: "B", position: 5 },
  { studentName: "Fatima Yusuf", class: "JSS 1C", math: 60, english: 55, science: 68, social: 62, total: 245, average: 61.25, grade: "C", position: 12 },
  { studentName: "Grace Nwosu", class: "JSS 2B", math: 78, english: 82, science: 75, social: 80, total: 315, average: 78.75, grade: "B+", position: 3 },
  { studentName: "Mohammed Ali", class: "SS 1A", math: 88, english: 90, science: 85, social: 92, total: 355, average: 88.75, grade: "A", position: 2 },
]

export const notifications = [
  { id: "NOT001", title: "Fee Payment Reminder", message: "15 students have outstanding fee balances for Term 2", type: "warning" as const, date: "2026-02-27", read: false },
  { id: "NOT002", title: "Results Published", message: "Mid-term examination results for JSS classes have been published", type: "info" as const, date: "2026-02-26", read: false },
  { id: "NOT003", title: "New Student Registration", message: "3 new students have been registered for the current term", type: "success" as const, date: "2026-02-25", read: true },
  { id: "NOT004", title: "System Backup Complete", message: "Daily database backup completed successfully", type: "info" as const, date: "2026-02-25", read: true },
  { id: "NOT005", title: "Teacher Assignment Updated", message: "Class teacher assignments have been updated for Term 2", type: "info" as const, date: "2026-02-24", read: true },
]

export const enrollmentData = [
  { month: "Sep", students: 1180 },
  { month: "Oct", students: 1195 },
  { month: "Nov", students: 1210 },
  { month: "Dec", students: 1215 },
  { month: "Jan", students: 1230 },
  { month: "Feb", students: 1247 },
]

export const revenueData = [
  { month: "Sep", collected: 38_000_000, pending: 15_000_000 },
  { month: "Oct", collected: 40_500_000, pending: 13_500_000 },
  { month: "Nov", collected: 41_200_000, pending: 14_200_000 },
  { month: "Dec", collected: 42_800_000, pending: 13_000_000 },
  { month: "Jan", collected: 44_100_000, pending: 12_800_000 },
  { month: "Feb", collected: 45_600_000, pending: 12_350_000 },
]

export const performanceData = [
  { subject: "Mathematics", average: 72 },
  { subject: "English", average: 68 },
  { subject: "Physics", average: 75 },
  { subject: "Biology", average: 80 },
  { subject: "Chemistry", average: 65 },
  { subject: "Economics", average: 78 },
]

export const attendanceData = [
  { day: "Mon", present: 1180, absent: 67 },
  { day: "Tue", present: 1195, absent: 52 },
  { day: "Wed", present: 1170, absent: 77 },
  { day: "Thu", present: 1200, absent: 47 },
  { day: "Fri", present: 1150, absent: 97 },
]

export const studentDetails = {
  id: "STU001",
  regNo: "FISS/2024/001",
  firstName: "Amina",
  lastName: "Hassan",
  dateOfBirth: "2010-05-15",
  gender: "Female",
  class: "JSS 3A",
  section: "Junior",
  admissionDate: "2022-09-01",
  status: "active" as const,
  bloodGroup: "O+",
  religion: "Islam",
  nationality: "Nigerian",
  stateOfOrigin: "Kaduna",
  address: "12 Unity Road, Kaduna",
  parent: {
    name: "Mr. Hassan Ibrahim",
    phone: "+234 801 234 5678",
    email: "hassan.ibrahim@email.com",
    occupation: "Civil Servant",
    relationship: "Father",
    address: "12 Unity Road, Kaduna",
  },
  academicHistory: [
    { term: "Term 1, 2025/2026", position: 3, average: 82.5, grade: "A" },
    { term: "Term 3, 2024/2025", position: 1, average: 88.3, grade: "A" },
    { term: "Term 2, 2024/2025", position: 2, average: 85.7, grade: "A" },
    { term: "Term 1, 2024/2025", position: 5, average: 78.2, grade: "B+" },
  ],
  feeHistory: [
    { term: "Term 2, 2025/2026", total: 172000, paid: 172000, balance: 0, status: "paid" as const },
    { term: "Term 1, 2025/2026", total: 172000, paid: 172000, balance: 0, status: "paid" as const },
    { term: "Term 3, 2024/2025", total: 160000, paid: 160000, balance: 0, status: "paid" as const },
  ],
}

// ─── Donors ───────────────────────────────────────────────────

export const donors = [
  { id: "DON001", name: "Al-Farouq Foundation",       contact: "Alhaji Musa Al-Farouq",    phone: "+234 800 111 2222", email: "info@alfarouq.org",    type: "Foundation"   as const, totalDonated: 5_000_000, activeStudents: 12, status: "active"   as const },
  { id: "DON002", name: "Zenith Education Trust",      contact: "Mrs. Amaka Okonkwo",       phone: "+234 801 222 3333", email: "trust@zenith.ng",      type: "Trust"        as const, totalDonated: 3_200_000, activeStudents: 8,  status: "active"   as const },
  { id: "DON003", name: "Ibrahim Family Scholarship",  contact: "Dr. Yusuf Ibrahim",        phone: "+234 802 333 4444", email: "yibrahim@gmail.com",   type: "Individual"   as const, totalDonated: 1_800_000, activeStudents: 4,  status: "active"   as const },
  { id: "DON004", name: "North Star NGO",              contact: "Mr. Bello Garba",          phone: "+234 803 444 5555", email: "contact@northstar.ng", type: "NGO"          as const, totalDonated: 2_500_000, activeStudents: 6,  status: "active"   as const },
  { id: "DON005", name: "Farukaktas Alumni Network",   contact: "Chief Emeka Okafor",       phone: "+234 804 555 6666", email: "alumni@fiss.edu.ng",   type: "Alumni Group" as const, totalDonated: 4_100_000, activeStudents: 10, status: "active"   as const },
  { id: "DON006", name: "Khadija Bello Foundation",    contact: "Hajiya Khadija Bello",     phone: "+234 805 666 7777", email: "kbfoundation@ng.com",  type: "Foundation"   as const, totalDonated: 900_000,   activeStudents: 2,  status: "inactive" as const },
]

// ─── Extended Academics Data ──────────────────────────────────

export const subjects = [
  { id: "SUB001", name: "Mathematics", code: "MTH", department: "Sciences", type: "core" as const, creditUnits: 4, description: "Number theory, algebra, geometry, calculus", classesOffered: ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"], teachers: ["Dr. Abubakar Sani"], status: "active" as const },
  { id: "SUB002", name: "English Language", code: "ENG", department: "Languages", type: "core" as const, creditUnits: 4, description: "Grammar, comprehension, essay writing, literature", classesOffered: ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"], teachers: ["Mrs. Ngozi Eze"], status: "active" as const },
  { id: "SUB003", name: "Physics", code: "PHY", department: "Sciences", type: "core" as const, creditUnits: 3, description: "Mechanics, electricity, optics, thermodynamics", classesOffered: ["SS 1", "SS 2", "SS 3"], teachers: ["Mr. Yusuf Ibrahim"], status: "active" as const },
  { id: "SUB004", name: "Biology", code: "BIO", department: "Sciences", type: "core" as const, creditUnits: 3, description: "Cell biology, ecology, genetics, evolution", classesOffered: ["SS 1", "SS 2", "SS 3"], teachers: ["Ms. Blessing Okafor"], status: "active" as const },
  { id: "SUB005", name: "Chemistry", code: "CHM", department: "Sciences", type: "core" as const, creditUnits: 3, description: "Organic, inorganic, and physical chemistry", classesOffered: ["SS 1", "SS 2", "SS 3"], teachers: ["Mr. Hassan Musa"], status: "active" as const },
  { id: "SUB006", name: "Economics", code: "ECN", department: "Commercial", type: "core" as const, creditUnits: 3, description: "Micro & macroeconomics, national income", classesOffered: ["SS 1", "SS 2", "SS 3"], teachers: ["Mrs. Ada Nnamdi"], status: "active" as const },
  { id: "SUB007", name: "Civic Education", code: "CVE", department: "Arts", type: "core" as const, creditUnits: 2, description: "Citizenship, governance, human rights", classesOffered: ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"], teachers: ["Mr. James Okwe"], status: "active" as const },
  { id: "SUB008", name: "Computer Science", code: "CMP", department: "Sciences", type: "elective" as const, creditUnits: 2, description: "Programming, databases, networking, AI basics", classesOffered: ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"], teachers: ["Mr. Tunde Balogun"], status: "active" as const },
  { id: "SUB009", name: "Agricultural Science", code: "AGR", department: "Sciences", type: "elective" as const, creditUnits: 2, description: "Crop production, animal husbandry, soil science", classesOffered: ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2"], teachers: ["Mrs. Comfort Ade"], status: "active" as const },
  { id: "SUB010", name: "History", code: "HIS", department: "Arts", type: "elective" as const, creditUnits: 2, description: "Nigerian history, African history, world history", classesOffered: ["JSS 1", "JSS 2", "JSS 3"], teachers: ["Mr. Samuel Ojo"], status: "active" as const },
  { id: "SUB011", name: "Geography", code: "GEO", department: "Arts", type: "elective" as const, creditUnits: 2, description: "Physical, human and regional geography", classesOffered: ["SS 1", "SS 2", "SS 3"], teachers: ["Mrs. Fatima Garba"], status: "active" as const },
  { id: "SUB012", name: "French", code: "FRN", department: "Languages", type: "elective" as const, creditUnits: 2, description: "Basic to intermediate French language", classesOffered: ["JSS 1", "JSS 2", "JSS 3"], teachers: ["Mme. Chidinma Nwosu"], status: "active" as const },
  { id: "SUB013", name: "Fine Art", code: "FAR", department: "Arts", type: "elective" as const, creditUnits: 1, description: "Drawing, painting, sculpture, art appreciation", classesOffered: ["JSS 1", "JSS 2", "JSS 3"], teachers: ["Mr. Emeka Udo"], status: "inactive" as const },
  { id: "SUB014", name: "Physical Education", code: "PHE", department: "General", type: "core" as const, creditUnits: 1, description: "Sports, physical fitness, health education", classesOffered: ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"], teachers: ["Coach Ibrahim Danjuma"], status: "active" as const },
]

export const teachersExtended = [
  { id: "TCH001", name: "Dr. Abubakar Sani", email: "asani@farukaktas.edu", phone: "+234 801 234 5678", gender: "Male", qualification: "PhD Mathematics", joinDate: "2018-09-01", subjects: ["Mathematics"], assignedClasses: ["SS 2A", "SS 2B", "SS 3A"], classTeacherOf: "JSS 3A", status: "active" as const, department: "Sciences", salary: 350000, yearsOfExperience: 12 },
  { id: "TCH002", name: "Mrs. Ngozi Eze", email: "neze@farukaktas.edu", phone: "+234 802 345 6789", gender: "Female", qualification: "M.Ed English", joinDate: "2019-01-15", subjects: ["English Language"], assignedClasses: ["JSS 1A", "JSS 1B", "JSS 2A"], classTeacherOf: "SS 3B", status: "active" as const, department: "Languages", salary: 280000, yearsOfExperience: 8 },
  { id: "TCH003", name: "Mr. Yusuf Ibrahim", email: "yibrahim@farukaktas.edu", phone: "+234 803 456 7890", gender: "Male", qualification: "M.Sc Physics", joinDate: "2020-03-01", subjects: ["Physics"], assignedClasses: ["SS 1A", "SS 1B", "SS 2A"], classTeacherOf: "SS 1A", status: "active" as const, department: "Sciences", salary: 300000, yearsOfExperience: 7 },
  { id: "TCH004", name: "Ms. Blessing Okafor", email: "bokafor@farukaktas.edu", phone: "+234 804 567 8901", gender: "Female", qualification: "M.Sc Biology", joinDate: "2019-09-01", subjects: ["Biology"], assignedClasses: ["SS 1A", "SS 2A", "SS 3A"], classTeacherOf: "SS 3A", status: "active" as const, department: "Sciences", salary: 290000, yearsOfExperience: 9 },
  { id: "TCH005", name: "Mr. Hassan Musa", email: "hmusa@farukaktas.edu", phone: "+234 805 678 9012", gender: "Male", qualification: "B.Sc Chemistry", joinDate: "2021-01-10", subjects: ["Chemistry"], assignedClasses: ["SS 1B", "SS 2B", "SS 3B"], classTeacherOf: "SS 1B", status: "active" as const, department: "Sciences", salary: 260000, yearsOfExperience: 5 },
  { id: "TCH006", name: "Mrs. Ada Nnamdi", email: "annamdi@farukaktas.edu", phone: "+234 806 789 0123", gender: "Female", qualification: "M.Sc Economics", joinDate: "2018-09-01", subjects: ["Economics"], assignedClasses: ["SS 1A", "SS 2A", "SS 3A"], classTeacherOf: "SS 2B", status: "active" as const, department: "Commercial", salary: 310000, yearsOfExperience: 10 },
  { id: "TCH007", name: "Mr. James Okwe", email: "jokwe@farukaktas.edu", phone: "+234 807 890 1234", gender: "Male", qualification: "B.Ed Civic Education", joinDate: "2022-01-05", subjects: ["Civic Education"], assignedClasses: ["JSS 1A", "JSS 2A", "JSS 3A", "SS 1A"], classTeacherOf: "JSS 1A", status: "active" as const, department: "Arts", salary: 220000, yearsOfExperience: 4 },
  { id: "TCH008", name: "Mr. Tunde Balogun", email: "tbalogun@farukaktas.edu", phone: "+234 808 901 2345", gender: "Male", qualification: "M.Sc Computer Science", joinDate: "2020-09-01", subjects: ["Computer Science"], assignedClasses: ["JSS 2A", "JSS 3A", "SS 1A", "SS 2A"], classTeacherOf: "JSS 2A", status: "active" as const, department: "Sciences", salary: 300000, yearsOfExperience: 6 },
  { id: "TCH009", name: "Mrs. Comfort Ade", email: "cade@farukaktas.edu", phone: "+234 809 012 3456", gender: "Female", qualification: "B.Sc Agriculture", joinDate: "2021-09-01", subjects: ["Agricultural Science"], assignedClasses: ["JSS 1B", "JSS 2B", "JSS 3B", "SS 1B"], classTeacherOf: "JSS 1B", status: "active" as const, department: "Sciences", salary: 240000, yearsOfExperience: 5 },
  { id: "TCH010", name: "Mr. Samuel Ojo", email: "sojo@farukaktas.edu", phone: "+234 810 123 4567", gender: "Male", qualification: "B.A History", joinDate: "2023-01-10", subjects: ["History"], assignedClasses: ["JSS 1A", "JSS 2A", "JSS 3A"], classTeacherOf: null, status: "active" as const, department: "Arts", salary: 200000, yearsOfExperience: 3 },
  { id: "TCH011", name: "Mrs. Fatima Garba", email: "fgarba@farukaktas.edu", phone: "+234 811 234 5678", gender: "Female", qualification: "M.Sc Geography", joinDate: "2019-09-01", subjects: ["Geography"], assignedClasses: ["SS 1A", "SS 2A", "SS 3A"], classTeacherOf: "SS 2A", status: "active" as const, department: "Arts", salary: 280000, yearsOfExperience: 8 },
  { id: "TCH012", name: "Mme. Chidinma Nwosu", email: "cnwosu@farukaktas.edu", phone: "+234 812 345 6789", gender: "Female", qualification: "B.A French", joinDate: "2022-09-01", subjects: ["French"], assignedClasses: ["JSS 1A", "JSS 1B", "JSS 2A", "JSS 3A"], classTeacherOf: "JSS 3B", status: "active" as const, department: "Languages", salary: 230000, yearsOfExperience: 4 },
  { id: "TCH013", name: "Coach Ibrahim Danjuma", email: "idanjuma@farukaktas.edu", phone: "+234 813 456 7890", gender: "Male", qualification: "B.Ed Physical Education", joinDate: "2020-01-15", subjects: ["Physical Education"], assignedClasses: ["JSS 1A", "JSS 2A", "SS 1A", "SS 2A"], classTeacherOf: "JSS 2B", status: "active" as const, department: "General", salary: 220000, yearsOfExperience: 6 },
  { id: "TCH014", name: "Mr. Emeka Udo", email: "eudo@farukaktas.edu", phone: "+234 814 567 8901", gender: "Male", qualification: "B.A Fine Art", joinDate: "2021-09-01", subjects: ["Fine Art"], assignedClasses: ["JSS 1A", "JSS 2A"], classTeacherOf: null, status: "on_leave" as const, department: "Arts", salary: 200000, yearsOfExperience: 4 },
]

export const classesExtended = [
  { id: "CLS001", name: "JSS 1A", section: "Junior" as const, level: "JSS 1", arm: "A", capacity: 40, students: 35, classTeacher: "Mr. James Okwe", classTeacherId: "TCH007", subjects: ["Mathematics", "English Language", "Civic Education", "Computer Science", "Agricultural Science", "History", "French", "Physical Education"], room: "Block A, Room 101", status: "active" as const },
  { id: "CLS002", name: "JSS 1B", section: "Junior" as const, level: "JSS 1", arm: "B", capacity: 40, students: 33, classTeacher: "Mrs. Comfort Ade", classTeacherId: "TCH009", subjects: ["Mathematics", "English Language", "Civic Education", "Computer Science", "Agricultural Science", "History", "French", "Physical Education"], room: "Block A, Room 102", status: "active" as const },
  { id: "CLS003", name: "JSS 2A", section: "Junior" as const, level: "JSS 2", arm: "A", capacity: 40, students: 30, classTeacher: "Mr. Tunde Balogun", classTeacherId: "TCH008", subjects: ["Mathematics", "English Language", "Civic Education", "Computer Science", "Agricultural Science", "History", "French", "Physical Education"], room: "Block A, Room 201", status: "active" as const },
  { id: "CLS004", name: "JSS 2B", section: "Junior" as const, level: "JSS 2", arm: "B", capacity: 40, students: 28, classTeacher: "Coach Ibrahim Danjuma", classTeacherId: "TCH013", subjects: ["Mathematics", "English Language", "Civic Education", "Computer Science", "Agricultural Science", "History", "French", "Physical Education"], room: "Block A, Room 202", status: "active" as const },
  { id: "CLS005", name: "JSS 3A", section: "Junior" as const, level: "JSS 3", arm: "A", capacity: 40, students: 32, classTeacher: "Dr. Abubakar Sani", classTeacherId: "TCH001", subjects: ["Mathematics", "English Language", "Civic Education", "Computer Science", "Agricultural Science", "History", "French", "Physical Education"], room: "Block A, Room 301", status: "active" as const },
  { id: "CLS006", name: "JSS 3B", section: "Junior" as const, level: "JSS 3", arm: "B", capacity: 40, students: 30, classTeacher: "Mme. Chidinma Nwosu", classTeacherId: "TCH012", subjects: ["Mathematics", "English Language", "Civic Education", "Computer Science", "Agricultural Science", "History", "French", "Physical Education"], room: "Block A, Room 302", status: "active" as const },
  { id: "CLS007", name: "SS 1A", section: "Senior" as const, level: "SS 1", arm: "A", capacity: 45, students: 38, classTeacher: "Mr. Yusuf Ibrahim", classTeacherId: "TCH003", subjects: ["Mathematics", "English Language", "Physics", "Biology", "Chemistry", "Economics", "Civic Education", "Computer Science", "Geography", "Physical Education"], room: "Block B, Room 101", status: "active" as const },
  { id: "CLS008", name: "SS 1B", section: "Senior" as const, level: "SS 1", arm: "B", capacity: 45, students: 36, classTeacher: "Mr. Hassan Musa", classTeacherId: "TCH005", subjects: ["Mathematics", "English Language", "Physics", "Biology", "Chemistry", "Economics", "Civic Education", "Computer Science", "Geography", "Physical Education"], room: "Block B, Room 102", status: "active" as const },
  { id: "CLS009", name: "SS 2A", section: "Senior" as const, level: "SS 2", arm: "A", capacity: 45, students: 34, classTeacher: "Mrs. Fatima Garba", classTeacherId: "TCH011", subjects: ["Mathematics", "English Language", "Physics", "Biology", "Chemistry", "Economics", "Civic Education", "Computer Science", "Geography", "Physical Education"], room: "Block B, Room 201", status: "active" as const },
  { id: "CLS010", name: "SS 2B", section: "Senior" as const, level: "SS 2", arm: "B", capacity: 45, students: 31, classTeacher: "Mrs. Ada Nnamdi", classTeacherId: "TCH006", subjects: ["Mathematics", "English Language", "Physics", "Biology", "Chemistry", "Economics", "Civic Education", "Computer Science", "Geography", "Physical Education"], room: "Block B, Room 202", status: "active" as const },
  { id: "CLS011", name: "SS 3A", section: "Senior" as const, level: "SS 3", arm: "A", capacity: 45, students: 29, classTeacher: "Ms. Blessing Okafor", classTeacherId: "TCH004", subjects: ["Mathematics", "English Language", "Physics", "Biology", "Chemistry", "Economics", "Civic Education", "Geography", "Physical Education"], room: "Block B, Room 301", status: "active" as const },
  { id: "CLS012", name: "SS 3B", section: "Senior" as const, level: "SS 3", arm: "B", capacity: 45, students: 27, classTeacher: "Mrs. Ngozi Eze", classTeacherId: "TCH002", subjects: ["Mathematics", "English Language", "Physics", "Biology", "Chemistry", "Economics", "Civic Education", "Geography", "Physical Education"], room: "Block B, Room 302", status: "active" as const },
]

export const timetable = [
  { id: "TT001", day: "Monday" as const, period: 1, time: "8:00 - 8:45", class: "JSS 1A", subject: "Mathematics", teacher: "Dr. Abubakar Sani", room: "Block A, Room 101" },
  { id: "TT002", day: "Monday" as const, period: 2, time: "8:45 - 9:30", class: "JSS 1A", subject: "English Language", teacher: "Mrs. Ngozi Eze", room: "Block A, Room 101" },
  { id: "TT003", day: "Monday" as const, period: 3, time: "9:45 - 10:30", class: "JSS 1A", subject: "Civic Education", teacher: "Mr. James Okwe", room: "Block A, Room 101" },
  { id: "TT004", day: "Monday" as const, period: 4, time: "10:30 - 11:15", class: "JSS 1A", subject: "Computer Science", teacher: "Mr. Tunde Balogun", room: "Computer Lab" },
  { id: "TT005", day: "Monday" as const, period: 5, time: "11:30 - 12:15", class: "JSS 1A", subject: "French", teacher: "Mme. Chidinma Nwosu", room: "Block A, Room 101" },
  { id: "TT006", day: "Monday" as const, period: 6, time: "12:15 - 1:00", class: "JSS 1A", subject: "Physical Education", teacher: "Coach Ibrahim Danjuma", room: "Sports Field" },
  { id: "TT007", day: "Tuesday" as const, period: 1, time: "8:00 - 8:45", class: "JSS 1A", subject: "English Language", teacher: "Mrs. Ngozi Eze", room: "Block A, Room 101" },
  { id: "TT008", day: "Tuesday" as const, period: 2, time: "8:45 - 9:30", class: "JSS 1A", subject: "History", teacher: "Mr. Samuel Ojo", room: "Block A, Room 101" },
  { id: "TT009", day: "Tuesday" as const, period: 3, time: "9:45 - 10:30", class: "JSS 1A", subject: "Mathematics", teacher: "Dr. Abubakar Sani", room: "Block A, Room 101" },
  { id: "TT010", day: "Tuesday" as const, period: 4, time: "10:30 - 11:15", class: "JSS 1A", subject: "Agricultural Science", teacher: "Mrs. Comfort Ade", room: "Agric Lab" },
  { id: "TT011", day: "Wednesday" as const, period: 1, time: "8:00 - 8:45", class: "SS 2A", subject: "Physics", teacher: "Mr. Yusuf Ibrahim", room: "Physics Lab" },
  { id: "TT012", day: "Wednesday" as const, period: 2, time: "8:45 - 9:30", class: "SS 2A", subject: "Chemistry", teacher: "Mr. Hassan Musa", room: "Chemistry Lab" },
  { id: "TT013", day: "Wednesday" as const, period: 3, time: "9:45 - 10:30", class: "SS 2A", subject: "Biology", teacher: "Ms. Blessing Okafor", room: "Biology Lab" },
  { id: "TT014", day: "Wednesday" as const, period: 4, time: "10:30 - 11:15", class: "SS 2A", subject: "Mathematics", teacher: "Dr. Abubakar Sani", room: "Block B, Room 201" },
  { id: "TT015", day: "Thursday" as const, period: 1, time: "8:00 - 8:45", class: "SS 2A", subject: "Economics", teacher: "Mrs. Ada Nnamdi", room: "Block B, Room 201" },
  { id: "TT016", day: "Thursday" as const, period: 2, time: "8:45 - 9:30", class: "SS 2A", subject: "English Language", teacher: "Mrs. Ngozi Eze", room: "Block B, Room 201" },
  { id: "TT017", day: "Friday" as const, period: 1, time: "8:00 - 8:45", class: "SS 2A", subject: "Geography", teacher: "Mrs. Fatima Garba", room: "Block B, Room 201" },
  { id: "TT018", day: "Friday" as const, period: 2, time: "8:45 - 9:30", class: "SS 2A", subject: "Computer Science", teacher: "Mr. Tunde Balogun", room: "Computer Lab" },
]

export const academicCalendar = [
  { id: "AC001", event: "Term 2 Begins", date: "2026-01-13", endDate: null, type: "term" as const, description: "Resumption for second term" },
  { id: "AC002", event: "Mid-Term Break", date: "2026-02-28", endDate: "2026-03-04", type: "break" as const, description: "One week mid-term break" },
  { id: "AC003", event: "Inter-House Sports", date: "2026-03-15", endDate: "2026-03-16", type: "event" as const, description: "Annual inter-house sports competition" },
  { id: "AC004", event: "Mid-Term Examination", date: "2026-03-20", endDate: "2026-03-27", type: "exam" as const, description: "Mid-term continuous assessment exams" },
  { id: "AC005", event: "Parent-Teacher Meeting", date: "2026-04-05", endDate: null, type: "event" as const, description: "2nd term PTA meeting" },
  { id: "AC006", event: "Final Examination", date: "2026-04-15", endDate: "2026-04-25", type: "exam" as const, description: "End of term examinations" },
  { id: "AC007", event: "Term 2 Ends", date: "2026-04-30", endDate: null, type: "term" as const, description: "Closing for second term" },
  { id: "AC008", event: "Term 3 Begins", date: "2026-05-12", endDate: null, type: "term" as const, description: "Resumption for third term" },
  { id: "AC009", event: "Science Fair", date: "2026-06-10", endDate: null, type: "event" as const, description: "Annual school science fair" },
  { id: "AC010", event: "WAEC Examination", date: "2026-06-15", endDate: "2026-07-20", type: "exam" as const, description: "WASSCE for SS 3 students" },
]

export const attendanceRecords = [
  { id: "ATT001", date: "2026-02-27", class: "JSS 1A", totalStudents: 35, present: 33, absent: 2, late: 1, absentStudents: ["Yusuf Bello", "Hauwa Suleiman"], lateStudents: ["Chidi Okonkwo"] },
  { id: "ATT002", date: "2026-02-27", class: "JSS 1B", totalStudents: 33, present: 31, absent: 2, late: 0, absentStudents: ["Amaka Peters", "Musa Abdullahi"], lateStudents: [] },
  { id: "ATT003", date: "2026-02-27", class: "JSS 2A", totalStudents: 30, present: 29, absent: 1, late: 2, absentStudents: ["Blessing Udoh"], lateStudents: ["Samuel James", "Fatima Musa"] },
  { id: "ATT004", date: "2026-02-27", class: "JSS 2B", totalStudents: 28, present: 26, absent: 2, late: 1, absentStudents: ["Emmanuel Peters", "Grace Ali"], lateStudents: ["Kelechi Nwosu"] },
  { id: "ATT005", date: "2026-02-27", class: "JSS 3A", totalStudents: 32, present: 31, absent: 1, late: 0, absentStudents: ["Mary Johnson"], lateStudents: [] },
  { id: "ATT006", date: "2026-02-27", class: "JSS 3B", totalStudents: 30, present: 28, absent: 2, late: 1, absentStudents: ["Ibrahim Hassan", "Joy Nnamdi"], lateStudents: ["Adamu Yusuf"] },
  { id: "ATT007", date: "2026-02-27", class: "SS 1A", totalStudents: 38, present: 36, absent: 2, late: 0, absentStudents: ["David Okafor", "Mariam Bello"], lateStudents: [] },
  { id: "ATT008", date: "2026-02-27", class: "SS 1B", totalStudents: 36, present: 34, absent: 2, late: 1, absentStudents: ["Ahmed Musa", "Ngozi Peters"], lateStudents: ["Paul Adamu"] },
  { id: "ATT009", date: "2026-02-27", class: "SS 2A", totalStudents: 34, present: 33, absent: 1, late: 0, absentStudents: ["Fatima Garba"], lateStudents: [] },
  { id: "ATT010", date: "2026-02-27", class: "SS 2B", totalStudents: 31, present: 29, absent: 2, late: 1, absentStudents: ["Hassan Musa", "Amina Suleiman"], lateStudents: ["James Okwe"] },
  { id: "ATT011", date: "2026-02-27", class: "SS 3A", totalStudents: 29, present: 28, absent: 1, late: 0, absentStudents: ["Blessing Eze"], lateStudents: [] },
  { id: "ATT012", date: "2026-02-27", class: "SS 3B", totalStudents: 27, present: 25, absent: 2, late: 1, absentStudents: ["Chinedu Obi", "Sarah Mohammed"], lateStudents: ["Yusuf Ali"] },
]

export const lessonPlans = [
  { id: "LP001", subject: "Mathematics", class: "SS 2A", teacher: "Dr. Abubakar Sani", topic: "Quadratic Equations", week: "Week 8", date: "2026-02-24", objectives: "Students should be able to solve quadratic equations using factorization, completing the square, and quadratic formula", status: "completed" as const, resources: "Textbook Ch.5, Worksheets, Calculator" },
  { id: "LP002", subject: "English Language", class: "JSS 1A", teacher: "Mrs. Ngozi Eze", topic: "Comprehension Passages", week: "Week 8", date: "2026-02-24", objectives: "Students should be able to read, understand and answer questions on unseen passages", status: "completed" as const, resources: "Comprehension booklet, Dictionary" },
  { id: "LP003", subject: "Physics", class: "SS 2A", teacher: "Mr. Yusuf Ibrahim", topic: "Simple Harmonic Motion", week: "Week 8", date: "2026-02-25", objectives: "Students should understand oscillatory motion, period, frequency and amplitude", status: "completed" as const, resources: "Pendulum, Spring, Stopwatch" },
  { id: "LP004", subject: "Biology", class: "SS 1A", teacher: "Ms. Blessing Okafor", topic: "Cell Division - Mitosis", week: "Week 9", date: "2026-03-02", objectives: "Students should be able to describe stages of mitosis and its significance", status: "upcoming" as const, resources: "Microscope, Prepared slides, Charts" },
  { id: "LP005", subject: "Chemistry", class: "SS 2B", teacher: "Mr. Hassan Musa", topic: "Organic Chemistry - Alkanes", week: "Week 9", date: "2026-03-03", objectives: "Students should know nomenclature, properties and reactions of alkanes", status: "upcoming" as const, resources: "Molecular models, Charts, Lab equipment" },
  { id: "LP006", subject: "Economics", class: "SS 3A", teacher: "Mrs. Ada Nnamdi", topic: "International Trade", week: "Week 9", date: "2026-03-04", objectives: "Students should understand balance of trade, terms of trade, and trade barriers", status: "upcoming" as const, resources: "Textbook Ch.12, Case studies, Statistics" },
  { id: "LP007", subject: "Computer Science", class: "JSS 3A", teacher: "Mr. Tunde Balogun", topic: "Introduction to Programming", week: "Week 9", date: "2026-03-02", objectives: "Students should write simple algorithms and flowcharts", status: "upcoming" as const, resources: "Computer lab, Projector, Scratch software" },
  { id: "LP008", subject: "Mathematics", class: "JSS 1A", teacher: "Dr. Abubakar Sani", topic: "Fractions and Decimals", week: "Week 9", date: "2026-03-03", objectives: "Students should add, subtract, multiply and divide fractions and decimals", status: "upcoming" as const, resources: "Textbook Ch.3, Fraction boards, Worksheets" },
]

export const departments = [
  { id: "DEP001", name: "Sciences", hod: "Dr. Abubakar Sani", teacherCount: 6, subjectCount: 6, description: "Mathematics, Physics, Chemistry, Biology, Computer Science, Agricultural Science" },
  { id: "DEP002", name: "Languages", hod: "Mrs. Ngozi Eze", teacherCount: 2, subjectCount: 2, description: "English Language, French" },
  { id: "DEP003", name: "Arts", hod: "Mrs. Fatima Garba", teacherCount: 3, subjectCount: 3, description: "Civic Education, History, Geography, Fine Art" },
  { id: "DEP004", name: "Commercial", hod: "Mrs. Ada Nnamdi", teacherCount: 1, subjectCount: 1, description: "Economics" },
  { id: "DEP005", name: "General", hod: "Coach Ibrahim Danjuma", teacherCount: 1, subjectCount: 1, description: "Physical Education" },
]

export const newsArticles = [
  {
    id: "NEWS001",
    title: "Farukaktas School Wins Inter-School Science Competition",
    excerpt: "Our students showcased exceptional talent at the regional science fair, bringing home the gold trophy.",
    date: "2026-02-20",
    category: "Achievement",
    image: "/images/news-science.jpg",
  },
  {
    id: "NEWS002",
    title: "New Computer Lab Inaugurated",
    excerpt: "The state-of-the-art computer laboratory with 50 workstations was officially opened by the school board.",
    date: "2026-02-15",
    category: "Infrastructure",
    image: "/images/news-lab.jpg",
  },
  {
    id: "NEWS003",
    title: "Admissions Open for 2026/2027 Academic Session",
    excerpt: "We are now accepting applications for new students. Limited spaces available across all classes.",
    date: "2026-02-10",
    category: "Admissions",
    image: "/images/news-admissions.jpg",
  },
]

export const users = [
  { id: "USR001", name: "Ibrahim Farukaktas", email: "admin@farukaktas.edu", role: "Super Administrator", status: "active" as const, lastLogin: "2026-02-27" },
  { id: "USR002", name: "Hauwa Mohammed", email: "hauwa@farukaktas.edu", role: "School Administrator", status: "active" as const, lastLogin: "2026-02-27" },
  { id: "USR003", name: "Dr. Abubakar Sani", email: "asani@farukaktas.edu", role: "Teacher", status: "active" as const, lastLogin: "2026-02-26" },
  { id: "USR004", name: "Mrs. Ngozi Eze", email: "neze@farukaktas.edu", role: "Teacher", status: "active" as const, lastLogin: "2026-02-26" },
  { id: "USR005", name: "Musa Abdullahi", email: "musa@farukaktas.edu", role: "Accountant", status: "active" as const, lastLogin: "2026-02-25" },
  { id: "USR006", name: "Mr. Hassan Ibrahim", email: "hassan.ibrahim@email.com", role: "Parent", status: "active" as const, lastLogin: "2026-02-24" },
  { id: "USR007", name: "Mrs. Grace Obi", email: "grace.obi@email.com", role: "Parent", status: "inactive" as const, lastLogin: "2026-01-15" },
]
