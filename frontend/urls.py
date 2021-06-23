from django.urls import path
from .views import task_list_view, open_view

urlpatterns = [
    path('', open_view),
    path('tasklist/<int:id>/', task_list_view),
]
