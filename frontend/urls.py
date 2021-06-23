from django.urls import path
from .views import task_list_view, open_view, register_view, login_view

app_name = 'frontend'

urlpatterns = [
    path('', open_view),
    path('register/', register_view),
    path('login/', login_view),
    path('tasklist/<int:id>/', task_list_view),
]
