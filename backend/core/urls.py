from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, SchoolSettingsViewSet, NotificationViewSet, AuditLogViewSet, DashboardStatsView, ReportChartsView

router = DefaultRouter()
router.register("users", UserViewSet)
router.register("notifications", NotificationViewSet)
router.register("audit", AuditLogViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("settings/", SchoolSettingsViewSet.as_view({"get": "list", "patch": "update", "put": "update"})),
    path("dashboard/stats/", DashboardStatsView.as_view(), name="dashboard-stats"),
    path("reports/charts/", ReportChartsView.as_view(), name="report-charts"),
]
