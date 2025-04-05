from django.shortcuts import render
from .models import Elements
from .serialzers import ElementsSerializer
from rest_framework import generics

# Create your views here.
class ElementsListCreate(generics.ListCreateAPIView):
    queryset = Elements.objects.all()
    serializer_class = ElementsSerializer

class ElementsRetreiveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Elements.objects.all()
    serializer_class = ElementsSerializer