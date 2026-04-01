from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from .models import Subject, Teacher, Class, TeacherAssignment, Timetable, Attendance, LessonPlan, AcademicCalendar
from .serializers import (
    SubjectSerializer,
    TeacherListSerializer,
    TeacherDetailSerializer,
    ClassListSerializer,
    ClassDetailSerializer,
    TeacherAssignmentSerializer,
    TimetableSerializer,
    AttendanceSerializer,
    LessonPlanSerializer,
    AcademicCalendarSerializer,
)


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["department", "type", "status"]
    search_fields = ["name", "code", "department"]


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.prefetch_related("subjects", "assignments").all()
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["department", "status", "gender"]
    search_fields = ["name", "email", "subjects__name"]

    def get_serializer_class(self):
        if self.action == "list":
            return TeacherListSerializer
        return TeacherDetailSerializer


class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.select_related("class_teacher").prefetch_related("subjects").all()
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["section", "status"]
    search_fields = ["name", "class_teacher__name", "room"]

    def get_serializer_class(self):
        if self.action == "list":
            return ClassListSerializer
        return ClassDetailSerializer


class TeacherAssignmentViewSet(viewsets.ModelViewSet):
    queryset = TeacherAssignment.objects.select_related("teacher", "subject", "student_class").all()
    serializer_class = TeacherAssignmentSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["status", "subject__department"]
    search_fields = ["teacher__name", "subject__name", "student_class__name"]


class TimetableViewSet(viewsets.ModelViewSet):
    queryset = Timetable.objects.select_related("student_class", "subject", "teacher").all()
    serializer_class = TimetableSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["student_class", "day"]


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.select_related("student_class").all()
    serializer_class = AttendanceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["student_class", "date"]


class LessonPlanViewSet(viewsets.ModelViewSet):
    queryset = LessonPlan.objects.select_related("subject", "student_class", "teacher").all()
    serializer_class = LessonPlanSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["subject", "student_class", "status", "teacher"]
    search_fields = ["topic", "subject__name", "teacher__name"]


class AcademicCalendarViewSet(viewsets.ModelViewSet):
    queryset = AcademicCalendar.objects.all()
    serializer_class = AcademicCalendarSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["type"]
