from django.shortcuts import render
from django.views import View


# Create your views here.
def task_list_view(request):
    return render(request, 'frontend/list.html')

def open_view(request):
    return render(request, 'frontend/open.html')

def register_view(request):

    return render(request, 'frontend/register.html')

def login_view(request):

    return render(request, 'frontend/login.html')

