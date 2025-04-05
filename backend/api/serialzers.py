from rest_framework import serializers
from .models import Elements

class ElementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Elements
        fields = ['id', 'symbol', 'name', 'atomic_number', 'atomic_mass']