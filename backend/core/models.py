from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    ROLE_CHOICES = [
        ("super_admin", "Super Administrator"),
        ("admin", "School Administrator"),
        ("teacher", "Teacher"),
        ("accountant", "Accountant"),
        ("parent", "Parent"),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="admin")

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.role})"


class SchoolSettings(models.Model):
    school_name = models.CharField(max_length=200, default="FISS School")
    short_name = models.CharField(max_length=50, default="FISS")
    email = models.EmailField(default="admin@school.edu")
    phone = models.CharField(max_length=20, blank=True)
    website = models.URLField(blank=True)
    address = models.TextField(blank=True)
    motto = models.CharField(max_length=200, blank=True)
    academic_session = models.CharField(max_length=20, default="2025/2026")
    current_term = models.CharField(
        max_length=20,
        choices=[("Term 1", "Term 1"), ("Term 2", "Term 2"), ("Term 3", "Term 3")],
        default="Term 2",
    )
    term_start_date = models.DateField(null=True, blank=True)
    term_end_date = models.DateField(null=True, blank=True)
    grade_a = models.IntegerField(default=75)
    grade_b = models.IntegerField(default=65)
    grade_c = models.IntegerField(default=55)
    grade_d = models.IntegerField(default=45)

    class Meta:
        verbose_name = "School Settings"
        verbose_name_plural = "School Settings"

    def __str__(self):
        return self.school_name


class Notification(models.Model):
    TYPE_CHOICES = [
        ("warning", "Warning"),
        ("info", "Info"),
        ("success", "Success"),
        ("error", "Error"),
    ]
    title = models.CharField(max_length=200)
    message = models.TextField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default="info")
    date = models.DateField(auto_now_add=True)
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class AuditLog(models.Model):
    ACTION_CHOICES = [
        ("LOGIN", "Login"),
        ("LOGOUT", "Logout"),
        ("CREATE", "Create"),
        ("UPDATE", "Update"),
        ("DELETE", "Delete"),
        ("EXPORT", "Export"),
        ("SETTINGS", "Settings"),
        ("VIEW", "View"),
    ]
    STATUS_CHOICES = [("success", "Success"), ("failed", "Failed")]

    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    module = models.CharField(max_length=100)
    detail = models.TextField()
    ip = models.GenericIPAddressField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="success")

    class Meta:
        ordering = ["-timestamp"]

    def __str__(self):
        return f"{self.action} by {self.user} at {self.timestamp}"
