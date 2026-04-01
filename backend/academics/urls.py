from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SubjectViewSet,
    TeacherViewSet,
    ClassViewSet,
    TeacherAssignmentViewSet,
    TimetableViewSet,
    AttendanceViewSet,
    LessonPlanViewSet,
    AcademicCalendarViewSet,
)

router = DefaultRouter()
router.register("subjects", SubjectViewSet)
router.register("teachers", TeacherViewSet)
router.register("classes", ClassViewSet)
router.register("teacher-assignments", TeacherAssignmentViewSet)
router.register("timetable", TimetableViewSet)
router.register("attendance", AttendanceViewSet)
router.register("lesson-plans", LessonPlanViewSet)
router.register("academic-calendar", AcademicCalendarViewSet)

urlpatterns = [path("", include(router.urls))]
