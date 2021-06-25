from django.urls import path
from .views import task_list_view, open_view

app_name = 'frontend'

urlpatterns = [
    path('', open_view),
    path('tasklist/', task_list_view),
]
