from django.contrib.auth import authenticate, login
from rest_framework.exceptions import AuthenticationFailed
from .models import Task
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import TaskSerializer, UserSerializer

# Create your views here.
class TaskAction(APIView):
    def get(self, request):
        tasks = TaskSerializer(Task.objects.all().order_by('-id'), many=True)
        return Response(data=tasks.data, status=status.HTTP_200_OK)

    def post(self, request):
        task = TaskSerializer(data=request.data)

        if not task.is_valid():
            return Response('Du lieu khong hop le', status=status.HTTP_400_BAD_REQUEST)

        task.save()
        return Response('Luu thanh cong', status= status.HTTP_200_OK)
    


class TaskDetailAction(APIView):
    def get(self, request, id):
        try:
            task = TaskSerializer(Task.objects.get(pk=id))    
        except:
            task = None

        if task:
            return Response(data=task.data, status=status.HTTP_200_OK)
        else:
            return Response('Du lieu khong ton tai', status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, id):
        try:
            task = Task.objects.get(pk=id)
        except:
            task = None

        if task:
            task = TaskSerializer(instance=task, data=request.data)

            if not task.is_valid():
                return Response('Du lieu    khong hop le', status=status.HTTP_400_BAD_REQUEST)
            
            task.save()
            return Response('Sua oke', status=status.HTTP_200_OK)
        else:
            return Response('Du lieu khong ton tai', status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        try:
            task = Task.objects.get(pk=id)
        except:
            task = None

        if task:

            task.delete()
            return Response('Xoa oke', status=status.HTTP_200_OK)
        else:
            return Response('Du lieu khong ton tai', status=status.HTTP_404_NOT_FOUND)


class LoginView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        
        user = authenticate(request, username=username, password=password)

        user = User.objects.get(username=username)
        if user is None:
            raise AuthenticationFailed('Wrong password')
        
        login(request, user)
        return Response('Login success')


class RegisterView(APIView):
    def post(self, request):
        user = UserSerializer(data=request.data)

        if not user.is_valid():
            raise AuthenticationFailed(user.errors)
        password = user.validated_data.pop('password', None)
        new_user = user.save()
        new_user.set_password(password)
        user.save()
        return Response('Success')