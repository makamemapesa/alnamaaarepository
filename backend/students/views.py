from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Student, StudentDocument, AcademicHistory
from .serializers import (
    StudentListSerializer,
    StudentDetailSerializer,
    StudentCreateSerializer,
    StudentDocumentSerializer,
    AcademicHistorySerializer,
)


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.select_related("student_class", "donor").all()
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["status", "fee_status", "student_type", "gender", "is_orphan"]
    search_fields = ["first_name", "last_name", "reg_no", "student_class__name"]
    ordering_fields = ["last_name", "first_name", "admission_date", "reg_no"]
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def get_serializer_class(self):
        if self.action == "list":
            return StudentListSerializer
        if self.action in ["create", "update", "partial_update"]:
            return StudentCreateSerializer
        return StudentDetailSerializer

    @action(detail=True, methods=["post"])
    def upload_document(self, request, pk=None):
        student = self.get_object()
        serializer = StudentDocumentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(student=student)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"])
    def promote(self, request, pk=None):
        """Move student to a new class."""
        student = self.get_object()
        new_class_id = request.data.get("new_class")
        if not new_class_id:
            return Response({"error": "new_class is required"}, status=400)
        from academics.models import Class
        try:
            new_class = Class.objects.get(pk=new_class_id)
        except Class.DoesNotExist:
            return Response({"error": "Class not found"}, status=404)
        student.student_class = new_class
        student.save()
        return Response(StudentDetailSerializer(student).data)
