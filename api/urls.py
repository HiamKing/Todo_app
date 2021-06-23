from django.urls import path
from .views import TaskAction, TaskDetailAction, LoginView, RegisterView


urlpatterns = [
    path('tasklist/', TaskAction.as_view()),
    path('tasklist/<int:id>/', TaskDetailAction.as_view()),
    path('login/', LoginView.as_view()),
    path('register/', RegisterView.as_view()),
]
