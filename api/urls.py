from django.urls import path
from .views import TaskAction, TaskDetailAction, LoginView, RegisterView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('tasklist/<int:id>/', TaskAction.as_view()),
    path('tasklist/<int:user_id>/<int:task_id>/', TaskDetailAction.as_view()),
    path('login/', LoginView.as_view()),
    path('register/', RegisterView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
