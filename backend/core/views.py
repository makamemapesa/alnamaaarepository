from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import UserProfile, SchoolSettings, Notification, AuditLog
from .serializers import (
    UserSerializer,
    UserCreateSerializer,
    SchoolSettingsSerializer,
    NotificationSerializer,
    AuditLogSerializer,
)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.select_related("profile").all().order_by("first_name")
    filter_backends = [SearchFilter]
    search_fields = ["first_name", "last_name", "email", "profile__role"]

    def get_serializer_class(self):
        if self.action == "create":
            return UserCreateSerializer
        return UserSerializer

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class SchoolSettingsViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        obj, _ = SchoolSettings.objects.get_or_create(pk=1)
        return Response(SchoolSettingsSerializer(obj).data)

    def update(self, request, pk=None):
        obj, _ = SchoolSettings.objects.get_or_create(pk=1)
        serializer = SchoolSettingsSerializer(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["type", "read"]

    @action(detail=False, methods=["post"])
    def mark_all_read(self, request):
        Notification.objects.filter(read=False).update(read=True)
        return Response({"status": "all marked read"})

    @action(detail=False, methods=["delete"])
    def clear_all(self, request):
        Notification.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["patch"])
    def mark_read(self, request, pk=None):
        notif = self.get_object()
        notif.read = True
        notif.save()
        return Response(NotificationSerializer(notif).data)


class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditLog.objects.select_related("user").all()
    serializer_class = AuditLogSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["action", "module", "status"]
    search_fields = ["user__first_name", "user__last_name", "detail"]


class DashboardStatsView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from students.models import Student
        from academics.models import Teacher, Class, Attendance
        from fees.models import Payment
        from exams.models import ExamResult
        from django.db.models import Sum, Avg

        total_students = Student.objects.filter(status="active").count()
        total_teachers = Teacher.objects.filter(status="active").count()
        total_classes = Class.objects.filter(status="active").count()
        total_revenue = Payment.objects.filter(status="confirmed").aggregate(total=Sum("amount"))["total"] or 0
        pending_fees = Payment.objects.filter(status="pending").aggregate(total=Sum("amount"))["total"] or 0

        # Attendance rate: average of all attendance records
        att_agg = Attendance.objects.aggregate(
            total_present=Sum("present"),
            total_absent=Sum("absent"),
            total_late=Sum("late"),
        )
        present = att_agg["total_present"] or 0
        absent = att_agg["total_absent"] or 0
        late = att_agg["total_late"] or 0
        total_att = present + absent + late
        attendance_rate = round((present / total_att) * 100, 1) if total_att else 0

        # Pass rate: promoted / total in exam results
        total_results = ExamResult.objects.count()
        passed = ExamResult.objects.filter(status="promoted").count()
        pass_rate = round((passed / total_results) * 100, 1) if total_results else 0

        return Response(
            {
                "totalStudents": total_students,
                "totalTeachers": total_teachers,
                "totalClasses": total_classes,
                "totalRevenue": float(total_revenue),
                "pendingFees": float(pending_fees),
                "attendanceRate": attendance_rate,
                "passRate": pass_rate,
            }
        )


class ReportChartsView(generics.RetrieveAPIView):
    """Returns chart data for the Reports & Analytics page."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from students.models import Student
        from academics.models import Attendance
        from fees.models import Payment
        from exams.models import SubjectResult
        from django.db.models import Sum, Avg, Count
        from django.db.models.functions import TruncMonth, TruncWeek
        from django.utils import timezone
        import datetime

        today = timezone.now().date()

        # --- Enrollment trend: last 6 months, count active students per month ---
        enrollment_by_month = {}
        for i in range(5, -1, -1):
            # Calculate month offset
            month = (today.month - i - 1) % 12 + 1
            year = today.year - ((today.month - i - 1) // 12)
            month_start = datetime.date(year, month, 1)
            next_month = month + 1 if month < 12 else 1
            next_year = year if month < 12 else year + 1
            month_end = datetime.date(next_year, next_month, 1)
            count = Student.objects.filter(
                status="active",
                admission_date__lt=month_end,
            ).count()
            month_name = month_start.strftime("%b")
            enrollment_by_month[month_name] = count
        enrollment_data = [{"month": m, "students": c} for m, c in enrollment_by_month.items()]

        # --- Revenue trend: last 6 months collected vs pending ---
        revenue_data = []
        for i in range(5, -1, -1):
            month = (today.month - i - 1) % 12 + 1
            year = today.year - ((today.month - i - 1) // 12)
            month_start = datetime.date(year, month, 1)
            next_month_val = month + 1 if month < 12 else 1
            next_year_val = year if month < 12 else year + 1
            month_end = datetime.date(next_year_val, next_month_val, 1)
            qs = Payment.objects.filter(date__gte=month_start, date__lt=month_end)
            collected = qs.filter(status="confirmed").aggregate(t=Sum("amount"))["t"] or 0
            pending = qs.filter(status="pending").aggregate(t=Sum("amount"))["t"] or 0
            revenue_data.append({
                "month": month_start.strftime("%b"),
                "collected": float(collected),
                "pending": float(pending),
            })

        # --- Performance: avg score per subject from SubjectResult ---
        perf_qs = (
            SubjectResult.objects
            .values("subject__name")
            .annotate(average=Avg("total"))
            .order_by("-average")
        )
        performance_data = [
            {"subject": row["subject__name"], "average": round(float(row["average"]), 1)}
            for row in perf_qs if row["average"] is not None
        ]

        # --- Attendance trend: last 7 attendance records (by day of week) ---
        days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
        att_by_day = {d: {"present": 0, "absent": 0} for d in days}
        att_qs = Attendance.objects.order_by("-date")[:70]
        for rec in att_qs:
            dow = rec.date.strftime("%a")
            if dow in att_by_day:
                att_by_day[dow]["present"] += rec.present
                att_by_day[dow]["absent"] += rec.absent
        attendance_data = [{"day": d, "present": v["present"], "absent": v["absent"]} for d, v in att_by_day.items()]

        return Response({
            "enrollmentData": enrollment_data,
            "revenueData": revenue_data,
            "performanceData": performance_data,
            "attendanceData": attendance_data,
        })
