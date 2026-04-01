from django.db import models
from students.models import Student
from academics.models import Subject, Class


class ExamMark(models.Model):
    """Individual score for one student in one subject for a specific exam type."""
    EXAM_TYPE_CHOICES = [
        ("CA 1", "CA 1"),
        ("CA 2", "CA 2"),
        ("Mid-Term", "Mid-Term"),
        ("End of Term", "End of Term"),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="exam_marks")
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    student_class = models.ForeignKey(Class, on_delete=models.CASCADE)
    term = models.CharField(max_length=50)
    exam_type = models.CharField(max_length=20, choices=EXAM_TYPE_CHOICES)
    academic_session = models.CharField(max_length=20, default="2025/2026")
    score = models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        ordering = ["student__last_name"]
        unique_together = ["student", "subject", "term", "exam_type", "academic_session"]

    def __str__(self):
        return f"{self.student} — {self.subject} — {self.exam_type} ({self.term}): {self.score}"

    @property
    def grade(self):
        s = float(self.score)
        if s >= 75:
            return "A"
        if s >= 65:
            return "B"
        if s >= 55:
            return "C"
        if s >= 45:
            return "D"
        return "F"


class ExamResult(models.Model):
    """Term-end aggregate result for a student."""
    STATUS_CHOICES = [("promoted", "Promoted"), ("repeat", "Repeat"), ("pending", "Pending")]

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="exam_results")
    student_class = models.ForeignKey(Class, on_delete=models.CASCADE)
    term = models.CharField(max_length=50)
    academic_session = models.CharField(max_length=20, default="2025/2026")
    total = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    average = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    grade = models.CharField(max_length=5, blank=True)
    position = models.IntegerField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")

    class Meta:
        ordering = ["position"]
        unique_together = ["student", "term", "academic_session"]

    def __str__(self):
        return f"{self.student} — {self.term} {self.academic_session}: {self.average}"


class SubjectResult(models.Model):
    """Per-subject breakdown within an ExamResult (CA + Exam = Total)."""
    exam_result = models.ForeignKey(ExamResult, on_delete=models.CASCADE, related_name="subject_results")
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    ca_score = models.DecimalField(max_digits=5, decimal_places=2, help_text="Out of 30")
    exam_score = models.DecimalField(max_digits=5, decimal_places=2, help_text="Out of 70")
    total = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    grade = models.CharField(max_length=5, blank=True)
    position = models.IntegerField(default=0)

    class Meta:
        unique_together = ["exam_result", "subject"]

    def save(self, *args, **kwargs):
        self.total = self.ca_score + self.exam_score
        s = float(self.total)
        if s >= 75:
            self.grade = "A"
        elif s >= 65:
            self.grade = "B"
        elif s >= 55:
            self.grade = "C"
        elif s >= 45:
            self.grade = "D"
        else:
            self.grade = "F"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.exam_result.student} — {self.subject}: {self.total}"
