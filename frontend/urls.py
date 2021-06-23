from django.urls import path
from .views import task_list_view

urlpatterns = [
    path('', task_list_view),
]
