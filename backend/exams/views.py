from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .models import ExamMark, ExamResult, SubjectResult
from .serializers import ExamMarkSerializer, ExamResultSerializer, SubjectResultSerializer


class ExamMarkViewSet(viewsets.ModelViewSet):
    """
    Marks entry — one row per student/subject/term/exam-type.
    Supports bulk upsert via POST /exam-marks/bulk_save/.
    """
    queryset = ExamMark.objects.select_related("student", "subject", "student_class").all()
    serializer_class = ExamMarkSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["student_class", "subject", "term", "exam_type", "academic_session"]

    @action(detail=False, methods=["post"])
    def bulk_save(self, request):
        """
        Accept a list of mark records and upsert them.
        Body: [{ student, subject, student_class, term, exam_type, academic_session, score }, ...]
        """
        marks = request.data if isinstance(request.data, list) else request.data.get("marks", [])
        saved = []
        errors = []
        for item in marks:
            serializer = ExamMarkSerializer(data=item)
            serializer.is_valid()
            if serializer.is_valid():
                obj, _ = ExamMark.objects.update_or_create(
                    student_id=item["student"],
                    subject_id=item["subject"],
                    term=item["term"],
                    exam_type=item["exam_type"],
                    academic_session=item.get("academic_session", "2025/2026"),
                    defaults={
                        "score": item["score"],
                        "student_class_id": item["student_class"],
                    },
                )
                saved.append(ExamMarkSerializer(obj).data)
            else:
                errors.append(serializer.errors)
        return Response({"saved": len(saved), "errors": errors}, status=status.HTTP_200_OK)


class ExamResultViewSet(viewsets.ModelViewSet):
    """Term-end results — supports report card view with nested subject results."""
    queryset = ExamResult.objects.select_related("student", "student_class").prefetch_related(
        "subject_results__subject"
    ).all()
    serializer_class = ExamResultSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["student_class", "term", "academic_session", "grade", "status"]
    search_fields = ["student__first_name", "student__last_name", "student__reg_no"]
