from rest_framework import serializers
from .models import Student, ParentGuardian, StudentDocument, AcademicHistory


class ParentGuardianSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParentGuardian
        exclude = ["student"]


class StudentDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentDocument
        exclude = ["student"]


class AcademicHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicHistory
        exclude = ["student"]


class StudentListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views."""
    class_name = serializers.ReadOnlyField()
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = Student
        fields = [
            "id", "reg_no", "first_name", "last_name", "full_name",
            "student_class", "class_name", "gender", "status", "fee_status",
            "admission_date", "student_type", "is_orphan",
        ]


class StudentDetailSerializer(serializers.ModelSerializer):
    """Full serializer with nested parent and documents."""
    parent = ParentGuardianSerializer(read_only=True)
    documents = StudentDocumentSerializer(many=True, read_only=True)
    academic_history = AcademicHistorySerializer(many=True, read_only=True)
    class_name = serializers.ReadOnlyField()
    full_name = serializers.ReadOnlyField()
    donor_name = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = "__all__"

    def get_donor_name(self, obj):
        return obj.donor.name if obj.donor else None


class StudentCreateSerializer(serializers.ModelSerializer):
    """Used for registration wizard — accepts parent data nested."""
    parent = ParentGuardianSerializer(required=False)

    class Meta:
        model = Student
        fields = "__all__"

    def create(self, validated_data):
        parent_data = validated_data.pop("parent", None)
        student = Student.objects.create(**validated_data)
        if parent_data:
            ParentGuardian.objects.create(student=student, **parent_data)
        return student

    def update(self, instance, validated_data):
        parent_data = validated_data.pop("parent", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if parent_data:
            ParentGuardian.objects.update_or_create(
                student=instance, defaults=parent_data
            )
        return instance
