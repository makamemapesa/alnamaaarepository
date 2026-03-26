# 🔐 FISS - Testing Credentials & Guide

## 🌐 Access URLs

### Development Server
```
Local:    http://localhost:3000
Network:  http://192.168.56.1:3000
```

**Status:** ✅ Running (Server started successfully)

---

## 🔑 Login Credentials

### Demo Login Account (Available on Login Page)
```
Email:    admin@alnamaa.edu
Password: demo123
Role:     Super Administrator
```

### All Available User Roles
You can login as any of these roles (same password: `demo123`):

1. **Super Administrator** ⭐
   - Email: `admin@alnamaa.edu`
   - Full system access

2. **School Administrator**
   - Email: `hauwa@alnamaa.edu`
   - School management access

3. **Teacher**
   - Email: `asani@alnamaa.edu` (Dr. Abubakar Sani)
   - Email: `neze@alnamaa.edu` (Mrs. Ngozi Eze)
   - Teaching and class management

4. **Accountant / Bursar**
   - Email: `musa@alnamaa.edu` (Musa Abdullahi)
   - Financial management access

5. **Parent / Guardian**
   - Email: `hassan.ibrahim@email.com` (Mr. Hassan Ibrahim)
   - Student progress monitoring

6. **Student**
   - Access to personal records and results

---

## 🗺️ Complete Navigation Map

### Public Pages
- **Home/Landing:** `http://localhost:3000/`
  - View school information, admissions, news
  
- **Login:** `http://localhost:3000/login`
  - Authentication page with role selection

### Dashboard Pages (After Login)

#### Main Dashboard
- **Dashboard Home:** `http://localhost:3000/dashboard`
  - Overview, statistics, charts, quick actions

#### 👥 Student Management
- **All Students:** `http://localhost:3000/dashboard/students`
  - View 1,247 students with filtering
  
- **Register Student:** `http://localhost:3000/dashboard/students/register`
  - 4-step registration wizard

- **Promotions:** `http://localhost:3000/dashboard/students/promotions`
  - (Placeholder page)

#### 📚 Academics
- **Classes:** `http://localhost:3000/dashboard/academics/classes`
  - Manage 12 classes (JSS 1-3, SS 1-3)
  
- **Subjects:** `http://localhost:3000/dashboard/academics/subjects`
  - 14 subjects across 5 departments
  
- **Teachers:** `http://localhost:3000/dashboard/academics/teachers`
  - 14 teacher profiles
  
- **Attendance:** `http://localhost:3000/dashboard/academics/attendance`
  - Daily attendance tracking with charts
  
- **Timetable:** `http://localhost:3000/dashboard/academics/timetable`
  - Weekly timetable & academic calendar
  
- **Lesson Plans:** `http://localhost:3000/dashboard/academics/lesson-plans`
  - 8 lesson plans available

#### 📝 Examinations
- **Marks Entry:** `http://localhost:3000/dashboard/exams/marks`
- **Results:** `http://localhost:3000/dashboard/exams/results`
- **Report Cards:** `http://localhost:3000/dashboard/exams/reports`
- **Merit List:** `http://localhost:3000/dashboard/exams/merit`

*(Note: These are placeholder pages - UI needs to be built)*

#### 💰 Fees & Payments
- **Fee Structure:** `http://localhost:3000/dashboard/fees/structure`
- **Payments:** `http://localhost:3000/dashboard/fees/payments`
- **Outstanding:** `http://localhost:3000/dashboard/fees/outstanding`

*(Note: These are placeholder pages - UI needs to be built)*

#### 👤 User Management
- **Users:** `http://localhost:3000/dashboard/users`
  - Manage 7 system users with roles

#### 🔔 Other Modules
- **Reports:** `http://localhost:3000/dashboard/reports`
- **Notifications:** `http://localhost:3000/dashboard/notifications`
- **Audit Logs:** `http://localhost:3000/dashboard/audit`
- **Settings:** `http://localhost:3000/dashboard/settings`

---

## 📊 Sample Data Available

### Students
- **Total:** 1,247 students
- **Active:** 1,198
- **Suspended:** 12
- **New This Term:** 156
- **Sample Students:** 8 detailed profiles available

### Classes
- **Total:** 12 classes
- **Junior Section:** JSS 1A, 1B, 2A, 2B, 3A, 3B (6 classes)
- **Senior Section:** SS 1A, 1B, 2A, 2B, 3A, 3B (6 classes)
- **Total Capacity:** 510 students
- **Room Assignments:** Block A (Junior), Block B (Senior)

### Teachers
- **Total:** 14 teachers (13 active, 1 on leave)
- **Departments:** Sciences (6), Languages (2), Arts (3), Commercial (1), General (2)
- **Experience Range:** 3-12 years
- **Sample Teachers:**
  - Dr. Abubakar Sani (Mathematics, PhD)
  - Mrs. Ngozi Eze (English, M.Ed)
  - Mr. Yusuf Ibrahim (Physics, M.Sc)
  - Ms. Blessing Okafor (Biology, M.Sc)
  - And 10 more...

### Subjects
- **Total:** 14 subjects
- **Core Subjects:** 9 (Mathematics, English, Physics, Chemistry, Biology, etc.)
- **Elective Subjects:** 5 (Computer Science, Agricultural Science, History, etc.)
- **Credit Units:** 1-4 per subject

### Fees & Payments
- **Fee Structures:** 6 levels (JSS 1-3, SS 1-3)
- **Range:** NGN 155,000 - 223,000 per term
- **Recent Payments:** 6 transactions
- **Total Revenue:** NGN 45.6M
- **Outstanding:** NGN 12.35M

### Academic Calendar
- **Events:** 10 scheduled events
- **Current Term:** Term 2 (2025/2026)
- **Mid-Term Break:** Feb 28 - Mar 4, 2026
- **Upcoming:** Inter-House Sports (Mar 15-16)

### Attendance
- **Daily Records:** 12 classes tracked
- **Current Date:** Feb 27, 2026
- **Average Attendance Rate:** 94.2%

---

## 🧪 Testing Checklist

### ✅ Features to Test

#### Authentication
- [ ] Login with Super Admin credentials
- [ ] Login with different roles
- [ ] Password visibility toggle works
- [ ] Responsive mobile view

#### Navigation
- [ ] Sidebar navigation works
- [ ] Collapsible menu sections
- [ ] Mobile menu overlay
- [ ] User profile dropdown
- [ ] Notification badge displays count

#### Dashboard
- [ ] Statistics cards load correctly
- [ ] Charts render properly (Line, Bar, Pie)
- [ ] Quick actions are clickable
- [ ] Recent students table displays
- [ ] Recent payments table displays
- [ ] Notifications feed shows items

#### Students Module
- [ ] Search students by name/reg number
- [ ] Filter by class
- [ ] Filter by status (active/suspended)
- [ ] View student actions dropdown
- [ ] Pagination works
- [ ] Registration wizard (4 steps)
- [ ] Form validation

#### Academics - Classes
- [ ] View all 12 classes
- [ ] Filter by section (Junior/Senior)
- [ ] View class details dialog
- [ ] Capacity progress bars
- [ ] Teacher assignment displays

#### Academics - Subjects
- [ ] View all 14 subjects
- [ ] Filter by department
- [ ] Filter by type (Core/Elective)
- [ ] Subject detail modal
- [ ] Teacher assignment lists

#### Academics - Teachers
- [ ] View all 14 teachers
- [ ] Filter by department
- [ ] Filter by status
- [ ] Teacher profile modal
- [ ] Contact information displays
- [ ] Assigned classes shown

#### Academics - Attendance
- [ ] Select date
- [ ] Filter by class
- [ ] View attendance statistics
- [ ] Charts render correctly
- [ ] Export functionality

#### Academics - Timetable
- [ ] Switch between classes
- [ ] View timetable grid
- [ ] Academic calendar tab
- [ ] Add slot dialog works
- [ ] PDF export button

#### User Management
- [ ] View all users
- [ ] Filter by role
- [ ] Search users
- [ ] Add user dialog
- [ ] User actions dropdown

#### UI/UX
- [ ] Responsive on mobile (< 768px)
- [ ] Responsive on tablet (768px - 1024px)
- [ ] Desktop layout (> 1024px)
- [ ] All icons display correctly
- [ ] Badges show correct colors
- [ ] Tables are scrollable on mobile
- [ ] Forms are user-friendly

---

## 🎨 UI Component Testing

### Colors (OKLCH)
- **Primary Blue:** oklch(0.35 0.12 250) - Deep blue
- **Accent Green:** oklch(0.65 0.18 155) - Success green
- **Destructive Red:** oklch(0.55 0.22 25) - Error red
- **Warning Yellow:** oklch(0.75 0.15 75) - Warning yellow

### Typography
- **Headings:** Space Grotesk font
- **Body:** Inter font
- **Monospace:** Geist Mono

### Components (67 Total)
All shadcn/ui components are available:
- Buttons, Cards, Tables, Forms
- Dialogs, Dropdowns, Selects
- Badges, Progress bars, Charts
- Tabs, Separators, etc.

---

## 🐛 Known Limitations

### Current State
- ✅ **Frontend Only** - All UI is complete
- ⚠️ **Mock Data** - Using static data from `lib/mock-data.ts`
- ⚠️ **No Backend** - No API, no database
- ⚠️ **No Auth** - Authentication is UI-only (redirects without validation)
- ⚠️ **Some Pages Missing** - Exams and Fees modules need UI implementation

### Not Implemented Yet
- ❌ Real authentication/authorization
- ❌ Database integration
- ❌ API endpoints
- ❌ File uploads (documents, images)
- ❌ Email notifications
- ❌ SMS integration
- ❌ Report generation (PDF)
- ❌ Data persistence

---

## 🚀 Quick Start Commands

### Start Development Server
```bash
pnpm dev
```

### Build for Production
```bash
pnpm build
```

### Start Production Server
```bash
pnpm start
```

### Run Linter
```bash
pnpm lint
```

---

## 📱 Mobile Testing

Test on these breakpoints:
- **Mobile:** 375px, 390px, 414px
- **Tablet:** 768px, 834px
- **Desktop:** 1280px, 1440px, 1920px

---

## 🎯 User Personas for Testing

### 1. Super Administrator (Ibrahim Alnamaa)
**Goal:** Oversee entire school operations
**Test:** All modules, user management, system settings

### 2. School Administrator (Hauwa Mohammed)
**Goal:** Daily school management
**Test:** Students, classes, attendance, fees

### 3. Teacher (Dr. Abubakar Sani)
**Goal:** Manage classes and student performance
**Test:** Attendance, marks entry, lesson plans, timetable

### 4. Accountant (Musa Abdullahi)
**Goal:** Financial management
**Test:** Fee structure, payments, reports

### 5. Parent (Mr. Hassan Ibrahim)
**Goal:** Monitor child's progress
**Test:** Results, attendance, fee status

---

## 📞 Support Information

### School Details
- **Name:** Alnamaa International Academy (AIA)
- **Location:** 123 Education Lane, Kaduna, Nigeria
- **Phone:** +234 801 234 5678
- **Email:** info@alnamaa.edu
- **Academic Session:** 2025/2026 (Term 2)

### System Information
- **Version:** 0.1.0
- **Framework:** Next.js 16.1.6
- **React:** 19.2.4
- **TypeScript:** 5.7.3
- **Build Status:** ✅ No Errors

---

## 💡 Pro Tips

1. **Use Dev Tools:** Press F12 to inspect elements and see console logs
2. **Check Responsiveness:** Use Chrome DevTools device toolbar (Ctrl+Shift+M)
3. **Test All Roles:** Try logging in as different user types
4. **Explore Charts:** Hover over chart elements for tooltips
5. **Test Search:** Use the search bars in each module
6. **Mobile Menu:** On mobile, click hamburger menu (top-left)
7. **Quick Actions:** Use the dashboard quick action buttons
8. **Filter Testing:** Try combining multiple filters

---

## 📝 Test Scenarios

### Scenario 1: New Student Registration
1. Login as Admin
2. Navigate to Students → Register Student
3. Fill Step 1: Personal Info
4. Fill Step 2: Parent/Guardian
5. Fill Step 3: Academic Details
6. Step 4: Documents (UI only)

### Scenario 2: Daily Attendance
1. Login as Teacher
2. Navigate to Academics → Attendance
3. Select today's date
4. Select your class
5. View attendance statistics
6. Check absent students list

### Scenario 3: View Timetable
1. Login as any user
2. Navigate to Academics → Timetable
3. Select a class
4. View weekly schedule
5. Check time slots and teachers
6. View academic calendar tab

### Scenario 4: Monitor Performance
1. Login as Admin
2. Go to Dashboard
3. Review statistics cards
4. Analyze enrollment trend chart
5. Check subject performance
6. Review fee collection status

---

## 🎓 Educational Context

### Academic Structure
- **Junior Secondary:** JSS 1, JSS 2, JSS 3
- **Senior Secondary:** SS 1, SS 2, SS 3
- **Each Level:** 2 arms (A & B)
- **Total:** 12 classes

### Grading System
- **A+:** 90-100%
- **A:** 80-89%
- **B+:** 75-79%
- **B:** 70-74%
- **C:** 60-69%
- **D:** 50-59%
- **F:** Below 50%

### Terms
- **Term 1:** September - December
- **Term 2:** January - April (Current)
- **Term 3:** May - July

---

**Happy Testing! 🎉**

*Last Updated: February 27, 2026*
