from rest_framework import serializers
from .models import Donor


class DonorSerializer(serializers.ModelSerializer):
    active_students = serializers.ReadOnlyField()

    class Meta:
        model = Donor
        fields = "__all__"
