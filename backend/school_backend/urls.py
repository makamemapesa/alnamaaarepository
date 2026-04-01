from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    # Auth
    path("api/auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # App routes
    path("api/", include("core.urls")),
    path("api/", include("students.urls")),
    path("api/", include("academics.urls")),
    path("api/", include("exams.urls")),
    path("api/", include("fees.urls")),
    path("api/", include("donors.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
