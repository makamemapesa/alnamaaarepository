from django.contrib import admin
from .models import UserProfile, SchoolSettings, Notification, AuditLog

admin.site.register(UserProfile)
admin.site.register(SchoolSettings)
admin.site.register(Notification)
admin.site.register(AuditLog)
