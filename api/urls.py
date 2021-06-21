from django.urls import path
from .views import TaskAction, TaskDetailAction


urlpatterns = [
    path('tasklist/', TaskAction.as_view()),
    path('tasklist/<int:id>/', TaskDetailAction.as_view()),
]
