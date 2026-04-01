"""
Seed the database with the same data that was in mock-data.ts.
Run with: python manage.py seed_data
"""
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
import datetime


class Command(BaseCommand):
    help = "Populate the database with initial data from mock-data.ts"

    def handle(self, *args, **options):
        self.stdout.write("Seeding database...")
        self._seed_school_settings()
        self._seed_subjects()
        self._seed_teachers()
        self._seed_classes()
        self._seed_teacher_assignments()
        self._seed_donors()
        self._seed_students()
        self._seed_fee_structure()
        self._seed_payments()
        self._seed_timetable()
        self._seed_attendance()
        self._seed_lesson_plans()
        self._seed_exam_results()
        self._seed_notifications()
        self._seed_academic_calendar()
        self._seed_users()
        self.stdout.write(self.style.SUCCESS("Database seeded successfully!"))

    # ── School Settings ─────────────────────────────────────────
    def _seed_school_settings(self):
        from core.models import SchoolSettings
        SchoolSettings.objects.update_or_create(
            pk=1,
            defaults=dict(
                school_name="Faruk Aktas International Secondary School",
                short_name="FISS",
                email="admin@farukaktas.edu",
                phone="+234 800 000 0000",
                website="https://farukaktas.edu",
                address="1 School Road, Kaduna, Nigeria",
                motto="Knowledge, Character, Excellence",
                academic_session="2025/2026",
                current_term="Term 2",
                term_start_date=datetime.date(2026, 1, 13),
                term_end_date=datetime.date(2026, 4, 3),
                grade_a=75, grade_b=65, grade_c=55, grade_d=45,
            ),
        )
        self.stdout.write("  ✓ School settings")

    # ── Subjects ────────────────────────────────────────────────
    def _seed_subjects(self):
        from academics.models import Subject
        subjects_data = [
            {"name": "Mathematics", "code": "MTH", "department": "Sciences", "type": "core", "credit_units": 4, "description": "Number theory, algebra, geometry, calculus", "classes_offered": ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"], "status": "active"},
            {"name": "English Language", "code": "ENG", "department": "Languages", "type": "core", "credit_units": 4, "description": "Grammar, comprehension, essay writing, literature", "classes_offered": ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"], "status": "active"},
            {"name": "Physics", "code": "PHY", "department": "Sciences", "type": "core", "credit_units": 3, "description": "Mechanics, electricity, optics, thermodynamics", "classes_offered": ["SS 1", "SS 2", "SS 3"], "status": "active"},
            {"name": "Biology", "code": "BIO", "department": "Sciences", "type": "core", "credit_units": 3, "description": "Cell biology, ecology, genetics, evolution", "classes_offered": ["SS 1", "SS 2", "SS 3"], "status": "active"},
            {"name": "Chemistry", "code": "CHM", "department": "Sciences", "type": "core", "credit_units": 3, "description": "Organic, inorganic, and physical chemistry", "classes_offered": ["SS 1", "SS 2", "SS 3"], "status": "active"},
            {"name": "Economics", "code": "ECN", "department": "Commercial", "type": "core", "credit_units": 3, "description": "Micro & macroeconomics, national income", "classes_offered": ["SS 1", "SS 2", "SS 3"], "status": "active"},
            {"name": "Civic Education", "code": "CVE", "department": "Arts", "type": "core", "credit_units": 2, "description": "Citizenship, governance, human rights", "classes_offered": ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"], "status": "active"},
            {"name": "Computer Science", "code": "CMP", "department": "Sciences", "type": "elective", "credit_units": 2, "description": "Programming, databases, networking, AI basics", "classes_offered": ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"], "status": "active"},
            {"name": "Agricultural Science", "code": "AGR", "department": "Sciences", "type": "elective", "credit_units": 2, "description": "Crop production, animal husbandry, soil science", "classes_offered": ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2"], "status": "active"},
            {"name": "History", "code": "HIS", "department": "Arts", "type": "elective", "credit_units": 2, "description": "Nigerian history, African history, world history", "classes_offered": ["JSS 1", "JSS 2", "JSS 3"], "status": "active"},
            {"name": "Geography", "code": "GEO", "department": "Arts", "type": "elective", "credit_units": 2, "description": "Physical, human and regional geography", "classes_offered": ["SS 1", "SS 2", "SS 3"], "status": "active"},
            {"name": "French", "code": "FRN", "department": "Languages", "type": "elective", "credit_units": 2, "description": "Basic to intermediate French language", "classes_offered": ["JSS 1", "JSS 2", "JSS 3"], "status": "active"},
            {"name": "Fine Art", "code": "FAR", "department": "Arts", "type": "elective", "credit_units": 1, "description": "Drawing, painting, sculpture, art appreciation", "classes_offered": ["JSS 1", "JSS 2", "JSS 3"], "status": "inactive"},
            {"name": "Physical Education", "code": "PHE", "department": "General", "type": "core", "credit_units": 1, "description": "Sports, physical fitness, health education", "classes_offered": ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"], "status": "active"},
        ]
        for s in subjects_data:
            Subject.objects.update_or_create(code=s["code"], defaults=s)
        self.stdout.write("  ✓ Subjects")

    # ── Teachers ─────────────────────────────────────────────────
    def _seed_teachers(self):
        from academics.models import Teacher, Subject
        teachers_data = [
            {"name": "Dr. Abubakar Sani", "email": "asani@farukaktas.edu", "phone": "+234 801 234 5678", "gender": "Male", "qualification": "PhD Mathematics", "join_date": "2018-09-01", "department": "Sciences", "salary": 350000, "years_of_experience": 12, "status": "active", "subjects": ["Mathematics"]},
            {"name": "Mrs. Ngozi Eze", "email": "neze@farukaktas.edu", "phone": "+234 802 345 6789", "gender": "Female", "qualification": "M.Ed English", "join_date": "2019-01-15", "department": "Languages", "salary": 280000, "years_of_experience": 8, "status": "active", "subjects": ["English Language"]},
            {"name": "Mr. Yusuf Ibrahim", "email": "yibrahim@farukaktas.edu", "phone": "+234 803 456 7890", "gender": "Male", "qualification": "M.Sc Physics", "join_date": "2020-03-01", "department": "Sciences", "salary": 300000, "years_of_experience": 7, "status": "active", "subjects": ["Physics"]},
            {"name": "Ms. Blessing Okafor", "email": "bokafor@farukaktas.edu", "phone": "+234 804 567 8901", "gender": "Female", "qualification": "M.Sc Biology", "join_date": "2019-09-01", "department": "Sciences", "salary": 290000, "years_of_experience": 9, "status": "active", "subjects": ["Biology"]},
            {"name": "Mr. Hassan Musa", "email": "hmusa@farukaktas.edu", "phone": "+234 805 678 9012", "gender": "Male", "qualification": "B.Sc Chemistry", "join_date": "2021-01-10", "department": "Sciences", "salary": 260000, "years_of_experience": 5, "status": "active", "subjects": ["Chemistry"]},
            {"name": "Mrs. Ada Nnamdi", "email": "annamdi@farukaktas.edu", "phone": "+234 806 789 0123", "gender": "Female", "qualification": "M.Sc Economics", "join_date": "2018-09-01", "department": "Commercial", "salary": 310000, "years_of_experience": 10, "status": "active", "subjects": ["Economics"]},
            {"name": "Mr. James Okwe", "email": "jokwe@farukaktas.edu", "phone": "+234 807 890 1234", "gender": "Male", "qualification": "B.Ed Civic Education", "join_date": "2022-01-05", "department": "Arts", "salary": 220000, "years_of_experience": 4, "status": "active", "subjects": ["Civic Education"]},
            {"name": "Mr. Tunde Balogun", "email": "tbalogun@farukaktas.edu", "phone": "+234 808 901 2345", "gender": "Male", "qualification": "M.Sc Computer Science", "join_date": "2020-09-01", "department": "Sciences", "salary": 300000, "years_of_experience": 6, "status": "active", "subjects": ["Computer Science"]},
            {"name": "Mrs. Comfort Ade", "email": "cade@farukaktas.edu", "phone": "+234 809 012 3456", "gender": "Female", "qualification": "B.Sc Agriculture", "join_date": "2021-09-01", "department": "Sciences", "salary": 240000, "years_of_experience": 5, "status": "active", "subjects": ["Agricultural Science"]},
            {"name": "Mr. Samuel Ojo", "email": "sojo@farukaktas.edu", "phone": "+234 810 123 4567", "gender": "Male", "qualification": "B.A History", "join_date": "2023-01-10", "department": "Arts", "salary": 200000, "years_of_experience": 3, "status": "active", "subjects": ["History"]},
            {"name": "Mrs. Fatima Garba", "email": "fgarba@farukaktas.edu", "phone": "+234 811 234 5678", "gender": "Female", "qualification": "M.Sc Geography", "join_date": "2019-09-01", "department": "Arts", "salary": 280000, "years_of_experience": 8, "status": "active", "subjects": ["Geography"]},
            {"name": "Mme. Chidinma Nwosu", "email": "cnwosu@farukaktas.edu", "phone": "+234 812 345 6789", "gender": "Female", "qualification": "B.A French", "join_date": "2022-09-01", "department": "Languages", "salary": 230000, "years_of_experience": 4, "status": "active", "subjects": ["French"]},
            {"name": "Coach Ibrahim Danjuma", "email": "idanjuma@farukaktas.edu", "phone": "+234 813 456 7890", "gender": "Male", "qualification": "B.Ed Physical Education", "join_date": "2020-01-15", "department": "General", "salary": 220000, "years_of_experience": 6, "status": "active", "subjects": ["Physical Education"]},
            {"name": "Mr. Emeka Udo", "email": "eudo@farukaktas.edu", "phone": "+234 814 567 8901", "gender": "Male", "qualification": "B.A Fine Art", "join_date": "2021-09-01", "department": "Arts", "salary": 200000, "years_of_experience": 4, "status": "on_leave", "subjects": ["Fine Art"]},
        ]
        for t in teachers_data:
            subject_names = t.pop("subjects")
            jd = t.pop("join_date")
            teacher, _ = Teacher.objects.update_or_create(email=t["email"], defaults={**t, "join_date": datetime.date.fromisoformat(jd)})
            subjs = Subject.objects.filter(name__in=subject_names)
            teacher.subjects.set(subjs)
        self.stdout.write("  ✓ Teachers")

    # ── Classes ─────────────────────────────────────────────────
    def _seed_classes(self):
        from academics.models import Class, Teacher, Subject
        jss_subjects = ["Mathematics", "English Language", "Civic Education", "Computer Science", "Agricultural Science", "History", "French", "Physical Education"]
        ss_subjects = ["Mathematics", "English Language", "Physics", "Biology", "Chemistry", "Economics", "Civic Education", "Computer Science", "Geography", "Physical Education"]
        classes_data = [
            {"name": "JSS 1A", "section": "Junior", "level": "JSS 1", "arm": "A", "capacity": 40, "room": "Block A, Room 101", "class_teacher_email": "jokwe@farukaktas.edu", "subjects": jss_subjects},
            {"name": "JSS 1B", "section": "Junior", "level": "JSS 1", "arm": "B", "capacity": 40, "room": "Block A, Room 102", "class_teacher_email": "cade@farukaktas.edu", "subjects": jss_subjects},
            {"name": "JSS 2A", "section": "Junior", "level": "JSS 2", "arm": "A", "capacity": 40, "room": "Block A, Room 201", "class_teacher_email": "tbalogun@farukaktas.edu", "subjects": jss_subjects},
            {"name": "JSS 2B", "section": "Junior", "level": "JSS 2", "arm": "B", "capacity": 40, "room": "Block A, Room 202", "class_teacher_email": "idanjuma@farukaktas.edu", "subjects": jss_subjects},
            {"name": "JSS 3A", "section": "Junior", "level": "JSS 3", "arm": "A", "capacity": 40, "room": "Block A, Room 301", "class_teacher_email": "asani@farukaktas.edu", "subjects": jss_subjects},
            {"name": "JSS 3B", "section": "Junior", "level": "JSS 3", "arm": "B", "capacity": 40, "room": "Block A, Room 302", "class_teacher_email": "cnwosu@farukaktas.edu", "subjects": jss_subjects},
            {"name": "SS 1A", "section": "Senior", "level": "SS 1", "arm": "A", "capacity": 45, "room": "Block B, Room 101", "class_teacher_email": "yibrahim@farukaktas.edu", "subjects": ss_subjects},
            {"name": "SS 1B", "section": "Senior", "level": "SS 1", "arm": "B", "capacity": 45, "room": "Block B, Room 102", "class_teacher_email": "hmusa@farukaktas.edu", "subjects": ss_subjects},
            {"name": "SS 2A", "section": "Senior", "level": "SS 2", "arm": "A", "capacity": 45, "room": "Block B, Room 201", "class_teacher_email": "fgarba@farukaktas.edu", "subjects": ss_subjects},
            {"name": "SS 2B", "section": "Senior", "level": "SS 2", "arm": "B", "capacity": 45, "room": "Block B, Room 202", "class_teacher_email": "annamdi@farukaktas.edu", "subjects": ss_subjects},
            {"name": "SS 3A", "section": "Senior", "level": "SS 3", "arm": "A", "capacity": 45, "room": "Block B, Room 301", "class_teacher_email": "bokafor@farukaktas.edu", "subjects": ss_subjects},
            {"name": "SS 3B", "section": "Senior", "level": "SS 3", "arm": "B", "capacity": 45, "room": "Block B, Room 302", "class_teacher_email": "neze@farukaktas.edu", "subjects": ss_subjects},
        ]
        for c in classes_data:
            subject_names = c.pop("subjects")
            teacher_email = c.pop("class_teacher_email")
            try:
                teacher = Teacher.objects.get(email=teacher_email)
            except Teacher.DoesNotExist:
                teacher = None
            cls, _ = Class.objects.update_or_create(name=c["name"], defaults={**c, "class_teacher": teacher})
            subjs = Subject.objects.filter(name__in=subject_names)
            cls.subjects.set(subjs)
        self.stdout.write("  ✓ Classes")

    # ── Teacher Assignments ──────────────────────────────────────
    def _seed_teacher_assignments(self):
        from academics.models import Teacher, Subject, Class, TeacherAssignment
        assignments = [
            ("asani@farukaktas.edu", "Mathematics", ["SS 2A", "SS 2B", "SS 3A"]),
            ("neze@farukaktas.edu", "English Language", ["JSS 1A", "JSS 1B", "JSS 2A"]),
            ("yibrahim@farukaktas.edu", "Physics", ["SS 1A", "SS 1B", "SS 2A"]),
            ("bokafor@farukaktas.edu", "Biology", ["SS 1A", "SS 2A", "SS 3A"]),
            ("hmusa@farukaktas.edu", "Chemistry", ["SS 1B", "SS 2B", "SS 3B"]),
            ("annamdi@farukaktas.edu", "Economics", ["SS 1A", "SS 2A", "SS 3A"]),
            ("jokwe@farukaktas.edu", "Civic Education", ["JSS 1A", "JSS 2A", "JSS 3A", "SS 1A"]),
            ("tbalogun@farukaktas.edu", "Computer Science", ["JSS 2A", "JSS 3A", "SS 1A", "SS 2A"]),
            ("cade@farukaktas.edu", "Agricultural Science", ["JSS 1B", "JSS 2B", "JSS 3B", "SS 1B"]),
            ("sojo@farukaktas.edu", "History", ["JSS 1A", "JSS 2A", "JSS 3A"]),
            ("fgarba@farukaktas.edu", "Geography", ["SS 1A", "SS 2A", "SS 3A"]),
            ("cnwosu@farukaktas.edu", "French", ["JSS 1A", "JSS 1B", "JSS 2A", "JSS 3A"]),
            ("idanjuma@farukaktas.edu", "Physical Education", ["JSS 1A", "JSS 2A", "SS 1A", "SS 2A"]),
        ]
        for teacher_email, subject_name, class_names in assignments:
            try:
                teacher = Teacher.objects.get(email=teacher_email)
                subject = Subject.objects.get(name=subject_name)
            except (Teacher.DoesNotExist, Subject.DoesNotExist):
                continue
            for class_name in class_names:
                try:
                    cls = Class.objects.get(name=class_name)
                    TeacherAssignment.objects.update_or_create(
                        teacher=teacher, subject=subject, student_class=cls,
                        defaults={"status": "active"},
                    )
                except Class.DoesNotExist:
                    pass
        self.stdout.write("  ✓ Teacher assignments")

    # ── Donors ───────────────────────────────────────────────────
    def _seed_donors(self):
        from donors.models import Donor
        donors_data = [
            {"name": "Al-Farouq Foundation", "contact": "Alhaji Musa Al-Farouq", "phone": "+234 800 111 2222", "email": "info@alfarouq.org", "type": "Foundation", "total_donated": 5000000, "status": "active"},
            {"name": "Zenith Education Trust", "contact": "Mrs. Amaka Okonkwo", "phone": "+234 801 222 3333", "email": "trust@zenith.ng", "type": "Trust", "total_donated": 3200000, "status": "active"},
            {"name": "Ibrahim Family Scholarship", "contact": "Dr. Yusuf Ibrahim", "phone": "+234 802 333 4444", "email": "yibrahim@gmail.com", "type": "Individual", "total_donated": 1800000, "status": "active"},
            {"name": "North Star NGO", "contact": "Mr. Bello Garba", "phone": "+234 803 444 5555", "email": "contact@northstar.ng", "type": "NGO", "total_donated": 2500000, "status": "active"},
            {"name": "Farukaktas Alumni Network", "contact": "Chief Emeka Okafor", "phone": "+234 804 555 6666", "email": "alumni@fiss.edu.ng", "type": "Alumni Group", "total_donated": 4100000, "status": "active"},
            {"name": "Khadija Bello Foundation", "contact": "Hajiya Khadija Bello", "phone": "+234 805 666 7777", "email": "kbfoundation@ng.com", "type": "Foundation", "total_donated": 900000, "status": "inactive"},
        ]
        for d in donors_data:
            Donor.objects.update_or_create(name=d["name"], defaults=d)
        self.stdout.write("  ✓ Donors")

    # ── Students ─────────────────────────────────────────────────
    def _seed_students(self):
        from students.models import Student, ParentGuardian
        from academics.models import Class
        students_data = [
            {"reg_no": "FISS/2024/001", "first_name": "Amina", "last_name": "Hassan", "class": "JSS 3A", "gender": "Female", "dob": "2010-05-15", "status": "active", "fee_status": "paid", "admission_date": "2022-09-01"},
            {"reg_no": "FISS/2024/002", "first_name": "Emmanuel", "last_name": "Obi", "class": "SS 2B", "gender": "Male", "dob": "2008-11-20", "status": "active", "fee_status": "partial", "admission_date": "2021-09-01"},
            {"reg_no": "FISS/2024/003", "first_name": "Fatima", "last_name": "Yusuf", "class": "JSS 1A", "gender": "Female", "dob": "2012-03-08", "status": "active", "fee_status": "unpaid", "admission_date": "2024-09-01"},
            {"reg_no": "FISS/2024/004", "first_name": "David", "last_name": "Adamu", "class": "SS 3A", "gender": "Male", "dob": "2007-07-12", "status": "active", "fee_status": "paid", "admission_date": "2020-09-01"},
            {"reg_no": "FISS/2024/005", "first_name": "Grace", "last_name": "Nwosu", "class": "JSS 2B", "gender": "Female", "dob": "2011-01-25", "status": "suspended", "fee_status": "unpaid", "admission_date": "2023-09-01"},
            {"reg_no": "FISS/2024/006", "first_name": "Mohammed", "last_name": "Ali", "class": "SS 1A", "gender": "Male", "dob": "2009-09-30", "status": "active", "fee_status": "paid", "admission_date": "2022-09-01"},
            {"reg_no": "FISS/2024/007", "first_name": "Sarah", "last_name": "Johnson", "class": "JSS 3A", "gender": "Female", "dob": "2010-12-05", "status": "active", "fee_status": "partial", "admission_date": "2022-09-01"},
            {"reg_no": "FISS/2024/008", "first_name": "Peter", "last_name": "Okoro", "class": "SS 2A", "gender": "Male", "dob": "2008-04-18", "status": "active", "fee_status": "paid", "admission_date": "2021-09-01"},
        ]
        for s in students_data:
            try:
                cls = Class.objects.get(name=s["class"])
            except Class.DoesNotExist:
                cls = None
            Student.objects.update_or_create(
                reg_no=s["reg_no"],
                defaults={
                    "first_name": s["first_name"],
                    "last_name": s["last_name"],
                    "student_class": cls,
                    "gender": s["gender"],
                    "date_of_birth": datetime.date.fromisoformat(s["dob"]),
                    "status": s["status"],
                    "fee_status": s["fee_status"],
                    "admission_date": datetime.date.fromisoformat(s["admission_date"]),
                },
            )
        self.stdout.write("  ✓ Students")

    # ── Fee Structure ────────────────────────────────────────────
    def _seed_fee_structure(self):
        from fees.models import FeeStructure
        fee_data = [
            {"class_level": "JSS 1", "tuition": 80000, "boarding": 50000, "development": 15000, "books": 10000},
            {"class_level": "JSS 2", "tuition": 85000, "boarding": 50000, "development": 15000, "books": 10000},
            {"class_level": "JSS 3", "tuition": 90000, "boarding": 55000, "development": 15000, "books": 12000},
            {"class_level": "SS 1", "tuition": 100000, "boarding": 60000, "development": 20000, "books": 15000},
            {"class_level": "SS 2", "tuition": 110000, "boarding": 60000, "development": 20000, "books": 15000},
            {"class_level": "SS 3", "tuition": 120000, "boarding": 65000, "development": 20000, "books": 18000},
        ]
        for f in fee_data:
            FeeStructure.objects.update_or_create(
                class_level=f["class_level"], session="2025/2026", defaults=f
            )
        self.stdout.write("  ✓ Fee structure")

    # ── Payments ─────────────────────────────────────────────────
    def _seed_payments(self):
        from fees.models import Payment
        from students.models import Student
        payments_data = [
            {"reg_no": "FISS/2024/001", "amount": 150000, "date": "2026-02-25", "method": "Bank Transfer", "status": "confirmed", "term": "Term 2, 2025/2026", "receipt_no": "RCP-2026-001", "category": "Full Payment"},
            {"reg_no": "FISS/2024/004", "amount": 200000, "date": "2026-02-24", "method": "Cash", "status": "confirmed", "term": "Term 2, 2025/2026", "receipt_no": "RCP-2026-002", "category": "Full Payment"},
            {"reg_no": "FISS/2024/002", "amount": 75000, "date": "2026-02-24", "method": "Mobile Money", "status": "pending", "term": "Term 2, 2025/2026", "receipt_no": "RCP-2026-003", "category": "Tuition"},
            {"reg_no": "FISS/2024/006", "amount": 150000, "date": "2026-02-23", "method": "Bank Transfer", "status": "confirmed", "term": "Term 2, 2025/2026", "receipt_no": "RCP-2026-004", "category": "Full Payment"},
            {"reg_no": "FISS/2024/008", "amount": 200000, "date": "2026-02-22", "method": "Bank Transfer", "status": "confirmed", "term": "Term 2, 2025/2026", "receipt_no": "RCP-2026-005", "category": "Full Payment"},
            {"reg_no": "FISS/2024/007", "amount": 100000, "date": "2026-02-21", "method": "Cash", "status": "pending", "term": "Term 2, 2025/2026", "receipt_no": "RCP-2026-006", "category": "Boarding"},
        ]
        for p in payments_data:
            try:
                student = Student.objects.get(reg_no=p["reg_no"])
            except Student.DoesNotExist:
                continue
            Payment.objects.get_or_create(
                student=student,
                receipt_no=p["receipt_no"],
                defaults={
                    "amount": p["amount"],
                    "date": datetime.date.fromisoformat(p["date"]),
                    "method": p["method"],
                    "status": p["status"],
                    "term": p["term"],
                    "category": p["category"],
                },
            )
        self.stdout.write("  ✓ Payments")

    # ── Timetable ────────────────────────────────────────────────
    def _seed_timetable(self):
        from academics.models import Timetable, Class, Subject, Teacher
        slots = [
            ("Monday", 1, "8:00 - 8:45", "JSS 1A", "Mathematics", "asani@farukaktas.edu", "Block A, Room 101"),
            ("Monday", 2, "8:45 - 9:30", "JSS 1A", "English Language", "neze@farukaktas.edu", "Block A, Room 101"),
            ("Monday", 3, "9:45 - 10:30", "JSS 1A", "Civic Education", "jokwe@farukaktas.edu", "Block A, Room 101"),
            ("Monday", 4, "10:30 - 11:15", "JSS 1A", "Computer Science", "tbalogun@farukaktas.edu", "Computer Lab"),
            ("Monday", 5, "11:30 - 12:15", "JSS 1A", "French", "cnwosu@farukaktas.edu", "Block A, Room 101"),
            ("Monday", 6, "12:15 - 1:00", "JSS 1A", "Physical Education", "idanjuma@farukaktas.edu", "Sports Field"),
            ("Tuesday", 1, "8:00 - 8:45", "JSS 1A", "English Language", "neze@farukaktas.edu", "Block A, Room 101"),
            ("Tuesday", 2, "8:45 - 9:30", "JSS 1A", "History", "sojo@farukaktas.edu", "Block A, Room 101"),
            ("Tuesday", 3, "9:45 - 10:30", "JSS 1A", "Mathematics", "asani@farukaktas.edu", "Block A, Room 101"),
            ("Tuesday", 4, "10:30 - 11:15", "JSS 1A", "Agricultural Science", "cade@farukaktas.edu", "Agric Lab"),
            ("Wednesday", 1, "8:00 - 8:45", "SS 2A", "Physics", "yibrahim@farukaktas.edu", "Physics Lab"),
            ("Wednesday", 2, "8:45 - 9:30", "SS 2A", "Chemistry", "hmusa@farukaktas.edu", "Chemistry Lab"),
            ("Wednesday", 3, "9:45 - 10:30", "SS 2A", "Biology", "bokafor@farukaktas.edu", "Biology Lab"),
            ("Wednesday", 4, "10:30 - 11:15", "SS 2A", "Mathematics", "asani@farukaktas.edu", "Block B, Room 201"),
            ("Thursday", 1, "8:00 - 8:45", "SS 2A", "Economics", "annamdi@farukaktas.edu", "Block B, Room 201"),
            ("Thursday", 2, "8:45 - 9:30", "SS 2A", "English Language", "neze@farukaktas.edu", "Block B, Room 201"),
            ("Friday", 1, "8:00 - 8:45", "SS 2A", "Geography", "fgarba@farukaktas.edu", "Block B, Room 201"),
            ("Friday", 2, "8:45 - 9:30", "SS 2A", "Computer Science", "tbalogun@farukaktas.edu", "Computer Lab"),
        ]
        for day, period, time, class_name, subject_name, teacher_email, room in slots:
            try:
                cls = Class.objects.get(name=class_name)
                subj = Subject.objects.get(name=subject_name)
                teacher = Teacher.objects.get(email=teacher_email)
                Timetable.objects.update_or_create(
                    day=day, period=period, student_class=cls,
                    defaults={"time": time, "subject": subj, "teacher": teacher, "room": room},
                )
            except Exception:
                pass
        self.stdout.write("  ✓ Timetable")

    # ── Attendance ───────────────────────────────────────────────
    def _seed_attendance(self):
        from academics.models import Attendance, Class
        try:
            jss1a = Class.objects.get(name="JSS 1A")
        except Class.DoesNotExist:
            return
        records = [
            (datetime.date(2026, 2, 23), 33, 2, 0),
            (datetime.date(2026, 2, 24), 35, 0, 0),
            (datetime.date(2026, 2, 25), 34, 1, 0),
            (datetime.date(2026, 2, 26), 32, 2, 1),
            (datetime.date(2026, 2, 27), 35, 0, 0),
        ]
        for date, present, absent, late in records:
            Attendance.objects.update_or_create(
                date=date, student_class=jss1a,
                defaults={"present": present, "absent": absent, "late": late},
            )
        self.stdout.write("  ✓ Attendance")

    # ── Lesson Plans ─────────────────────────────────────────────
    def _seed_lesson_plans(self):
        from academics.models import LessonPlan, Subject, Class, Teacher
        plans = [
            ("Quadratic Equations", "Mathematics", "SS 2A", "Week 5", "2026-02-25", "asani@farukaktas.edu", "completed", "Solve quadratic equations by factorization, completing the square, and formula.", "Textbook Ch.8, graph paper"),
            ("Essay Writing", "English Language", "JSS 3A", "Week 5", "2026-02-26", "neze@farukaktas.edu", "completed", "Write a formal essay on the importance of education.", "Writing workbook, example essays"),
            ("Newton's Laws", "Physics", "SS 2A", "Week 6", "2026-03-04", "yibrahim@farukaktas.edu", "upcoming", "Understand and apply Newton's three laws of motion.", "Lab equipment, worked examples"),
            ("Photosynthesis", "Biology", "SS 1A", "Week 6", "2026-03-05", "bokafor@farukaktas.edu", "upcoming", "Explain the process of photosynthesis in plants.", "Microscope, leaf samples"),
        ]
        for topic, subject_name, class_name, week, date, teacher_email, status, objectives, resources in plans:
            try:
                subj = Subject.objects.get(name=subject_name)
                cls = Class.objects.get(name=class_name)
                teacher = Teacher.objects.get(email=teacher_email)
                LessonPlan.objects.update_or_create(
                    topic=topic, subject=subj, student_class=cls,
                    defaults={"week": week, "date": datetime.date.fromisoformat(date), "teacher": teacher, "status": status, "objectives": objectives, "resources": resources},
                )
            except Exception:
                pass
        self.stdout.write("  ✓ Lesson plans")

    # ── Exam Results ─────────────────────────────────────────────
    def _seed_exam_results(self):
        from exams.models import ExamResult, SubjectResult
        from students.models import Student
        from academics.models import Class, Subject
        results_data = [
            {"reg_no": "FISS/2024/001", "class": "JSS 3A", "term": "Term 2, 2025/2026", "position": 1, "average": 85.75, "grade": "A", "status": "promoted",
             "subjects": [("Mathematics", 24, 61), ("English Language", 22, 56), ("Physics", 26, 66), ("Biology", 25, 63)]},
            {"reg_no": "FISS/2024/006", "class": "SS 1A", "term": "Term 2, 2025/2026", "position": 2, "average": 88.75, "grade": "A", "status": "promoted",
             "subjects": [("Mathematics", 27, 61), ("English Language", 28, 62), ("Physics", 26, 59), ("Economics", 27, 65)]},
        ]
        for r in results_data:
            try:
                student = Student.objects.get(reg_no=r["reg_no"])
                cls = Class.objects.get(name=r["class"])
                result, _ = ExamResult.objects.update_or_create(
                    student=student, term=r["term"], academic_session="2025/2026",
                    defaults={"student_class": cls, "average": r["average"], "grade": r["grade"], "position": r["position"], "status": r["status"]},
                )
                for subject_name, ca, exam in r["subjects"]:
                    try:
                        subj = Subject.objects.get(name=subject_name)
                        SubjectResult.objects.update_or_create(
                            exam_result=result, subject=subj,
                            defaults={"ca_score": ca, "exam_score": exam},
                        )
                    except Subject.DoesNotExist:
                        pass
            except Exception:
                pass
        self.stdout.write("  ✓ Exam results")

    # ── Notifications ────────────────────────────────────────────
    def _seed_notifications(self):
        from core.models import Notification
        notifications = [
            {"title": "Fee Payment Reminder", "message": "15 students have outstanding fee balances for Term 2", "type": "warning", "read": False},
            {"title": "Results Published", "message": "Mid-term examination results for JSS classes have been published", "type": "info", "read": False},
            {"title": "New Student Registration", "message": "3 new students have been registered for the current term", "type": "success", "read": True},
            {"title": "System Backup Complete", "message": "Daily database backup completed successfully", "type": "info", "read": True},
            {"title": "Teacher Assignment Updated", "message": "Class teacher assignments have been updated for Term 2", "type": "info", "read": True},
        ]
        for n in notifications:
            Notification.objects.get_or_create(title=n["title"], defaults=n)
        self.stdout.write("  ✓ Notifications")

    # ── Academic Calendar ────────────────────────────────────────
    def _seed_academic_calendar(self):
        from academics.models import AcademicCalendar
        events = [
            ("Term 2 Begins", "2026-01-13", None, "term", "Resumption for second term"),
            ("Mid-Term Break", "2026-02-28", "2026-03-04", "break", "One week mid-term break"),
            ("Inter-House Sports", "2026-03-15", "2026-03-16", "event", "Annual inter-house sports competition"),
            ("Mid-Term CA Exams", "2026-02-17", "2026-02-21", "exam", "Mid-term continuous assessment exams"),
            ("Term 2 Ends", "2026-04-03", None, "term", "End of second term"),
            ("Term 3 Begins", "2026-04-27", None, "term", "Resumption for third term"),
        ]
        for event, date, end_date, etype, desc in events:
            AcademicCalendar.objects.get_or_create(
                event=event,
                defaults={
                    "date": datetime.date.fromisoformat(date),
                    "end_date": datetime.date.fromisoformat(end_date) if end_date else None,
                    "type": etype,
                    "description": desc,
                },
            )
        self.stdout.write("  ✓ Academic calendar")

    # ── Users ────────────────────────────────────────────────────
    def _seed_users(self):
        from core.models import UserProfile
        users_data = [
            {"username": "admin@farukaktas.edu", "email": "admin@farukaktas.edu", "first_name": "Ibrahim", "last_name": "Farukaktas", "password": "admin123", "role": "super_admin", "is_staff": True, "is_superuser": True},
            {"username": "hauwa@farukaktas.edu", "email": "hauwa@farukaktas.edu", "first_name": "Hauwa", "last_name": "Mohammed", "password": "admin123", "role": "admin"},
            {"username": "asani@farukaktas.edu", "email": "asani@farukaktas.edu", "first_name": "Abubakar", "last_name": "Sani", "password": "teacher123", "role": "teacher"},
            {"username": "musa@farukaktas.edu", "email": "musa@farukaktas.edu", "first_name": "Musa", "last_name": "Abdullahi", "password": "accountant123", "role": "accountant"},
        ]
        for u in users_data:
            role = u.pop("role")
            password = u.pop("password")
            is_staff = u.pop("is_staff", False)
            is_superuser = u.pop("is_superuser", False)
            user, created = User.objects.update_or_create(
                username=u["username"],
                defaults={**u, "is_staff": is_staff, "is_superuser": is_superuser},
            )
            if created:
                user.set_password(password)
                user.save()
            UserProfile.objects.update_or_create(user=user, defaults={"role": role})
        self.stdout.write("  ✓ Users (admin password: admin123)")
