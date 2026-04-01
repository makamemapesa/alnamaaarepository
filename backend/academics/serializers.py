from rest_framework import serializers
from .models import Subject, Teacher, Class, TeacherAssignment, Timetable, Attendance, LessonPlan, AcademicCalendar


class SubjectSerializer(serializers.ModelSerializer):
    teacher_names = serializers.SerializerMethodField()
    class_count = serializers.SerializerMethodField()

    class Meta:
        model = Subject
        fields = "__all__"

    def get_teacher_names(self, obj):
        return list(obj.teachers.values_list("name", flat=True))

    def get_class_count(self, obj):
        return obj.classes.filter(status="active").count()


class TeacherListSerializer(serializers.ModelSerializer):
    subject_names = serializers.SerializerMethodField()
    assigned_class_names = serializers.SerializerMethodField()
    class_teacher_of = serializers.SerializerMethodField()

    class Meta:
        model = Teacher
        fields = [
            "id", "name", "email", "phone", "gender", "qualification",
            "join_date", "department", "years_of_experience", "status",
            "subject_names", "assigned_class_names", "class_teacher_of",
        ]

    def get_subject_names(self, obj):
        return list(obj.subjects.values_list("name", flat=True))

    def get_assigned_class_names(self, obj):
        return list(
            obj.assignments.filter(status="active")
            .values_list("student_class__name", flat=True)
            .distinct()
        )

    def get_class_teacher_of(self, obj):
        cls = obj.class_teacher_of.first()
        return cls.name if cls else None


class TeacherDetailSerializer(TeacherListSerializer):
    class Meta(TeacherListSerializer.Meta):
        fields = "__all__"


class ClassListSerializer(serializers.ModelSerializer):
    class_teacher_name = serializers.SerializerMethodField()
    subject_names = serializers.SerializerMethodField()
    student_count = serializers.ReadOnlyField()

    class Meta:
        model = Class
        fields = [
            "id", "name", "section", "level", "arm", "capacity",
            "room", "status", "class_teacher", "class_teacher_name",
            "subject_names", "student_count",
        ]

    def get_class_teacher_name(self, obj):
        return obj.class_teacher.name if obj.class_teacher else None

    def get_subject_names(self, obj):
        return list(obj.subjects.values_list("name", flat=True))


class ClassDetailSerializer(ClassListSerializer):
    class Meta(ClassListSerializer.Meta):
        fields = "__all__"


class TeacherAssignmentSerializer(serializers.ModelSerializer):
    teacher_name = serializers.CharField(source="teacher.name", read_only=True)
    subject_name = serializers.CharField(source="subject.name", read_only=True)
    class_name = serializers.CharField(source="student_class.name", read_only=True)
    department = serializers.CharField(source="subject.department", read_only=True)

    class Meta:
        model = TeacherAssignment
        fields = "__all__"


class TimetableSerializer(serializers.ModelSerializer):
    class_name = serializers.CharField(source="student_class.name", read_only=True)
    subject_name = serializers.CharField(source="subject.name", read_only=True)
    teacher_name = serializers.CharField(source="teacher.name", read_only=True)

    class Meta:
        model = Timetable
        fields = "__all__"


class AttendanceSerializer(serializers.ModelSerializer):
    class_name = serializers.CharField(source="student_class.name", read_only=True)
    total_students = serializers.ReadOnlyField()
    attendance_rate = serializers.ReadOnlyField()

    class Meta:
        model = Attendance
        fields = "__all__"


class LessonPlanSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source="subject.name", read_only=True)
    class_name = serializers.CharField(source="student_class.name", read_only=True)
    teacher_name = serializers.CharField(source="teacher.name", read_only=True)

    class Meta:
        model = LessonPlan
        fields = "__all__"


class AcademicCalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicCalendar
        fields = "__all__"
