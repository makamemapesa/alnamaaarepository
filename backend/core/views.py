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
        from academics.models import Teacher, Class
        from fees.models import Payment

        total_students = Student.objects.filter(status="active").count()
        total_teachers = Teacher.objects.filter(status="active").count()
        total_classes = Class.objects.filter(status="active").count()
        total_revenue = Payment.objects.filter(status="confirmed").aggregate(
            total=__import__("django.db.models", fromlist=["Sum"]).Sum("amount")
        )["total"] or 0
        pending_fees = Payment.objects.filter(status="pending").aggregate(
            total=__import__("django.db.models", fromlist=["Sum"]).Sum("amount")
        )["total"] or 0

        return Response(
            {
                "totalStudents": total_students,
                "totalTeachers": total_teachers,
                "totalClasses": total_classes,
                "totalRevenue": float(total_revenue),
                "pendingFees": float(pending_fees),
            }
        )
