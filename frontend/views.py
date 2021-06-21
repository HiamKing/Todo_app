from django.shortcuts import render
from django.views import View
# Create your views here.

def test(request):
    return render(request, 'frontend/list.html')

