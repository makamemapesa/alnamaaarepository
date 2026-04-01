from rest_framework import viewsets, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Sum, F, DecimalField, Value, ExpressionWrapper
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .models import FeeStructure, Payment
from .serializers import FeeStructureSerializer, PaymentSerializer


class FeeStructureViewSet(viewsets.ModelViewSet):
    queryset = FeeStructure.objects.all()
    serializer_class = FeeStructureSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["session"]


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.select_related("student__student_class").all()
    serializer_class = PaymentSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["status", "method", "term", "category"]
    search_fields = ["student__first_name", "student__last_name", "student__reg_no", "receipt_no"]

    @action(detail=False, methods=["get"])
    def outstanding(self, request):
        """
        Returns students with outstanding balances.
        Compares total fees from FeeStructure against confirmed payments.
        """
        from students.models import Student
        from datetime import date

        students = Student.objects.filter(status="active").select_related("student_class")
        results = []
        for student in students:
            if not student.student_class:
                continue
            level_prefix = " ".join(student.student_class.level.split()[:2])  # "JSS 1" or "SS 2"
            try:
                fee_struct = FeeStructure.objects.get(class_level=level_prefix)
                total_fee = fee_struct.total
            except FeeStructure.DoesNotExist:
                continue

            paid = (
                Payment.objects.filter(student=student, status="confirmed")
                .aggregate(total=Sum("amount"))["total"] or 0
            )
            balance = float(total_fee) - float(paid)
            if balance <= 0:
                continue

            last_payment = (
                Payment.objects.filter(student=student)
                .order_by("-date")
                .values_list("date", flat=True)
                .first()
            )
            days_overdue = (date.today() - last_payment).days if last_payment else None

            results.append(
                {
                    "id": student.id,
                    "studentName": student.full_name,
                    "regNo": student.reg_no,
                    "class": student.class_name,
                    "totalFee": float(total_fee),
                    "amountPaid": float(paid),
                    "balance": balance,
                    "collectionPct": round((float(paid) / float(total_fee)) * 100, 1),
                    "lastPayment": last_payment,
                    "daysOverdue": days_overdue,
                }
            )

        results.sort(key=lambda x: x["balance"], reverse=True)
        return Response(results)
