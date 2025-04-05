from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.ElementsListCreate.as_view(), name='ElementsListCreate'),
    path('api/<int:pk>/', views.ElementsRetreiveUpdateDestroy.as_view(), name='ElementsRetrieveUpdateDestryo'),
]