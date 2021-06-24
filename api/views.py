from datetime import datetime, timedelta
from rest_framework import response
from rest_framework.exceptions import AuthenticationFailed
from .models import Task
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import TaskSerializer, UserSerializer
import jwt


# Create your views here.
class TaskAction(APIView):
    def get(self, request, id):
        user_task = TaskSerializer(Task.objects.filter(user_id=id).order_by('-id'), many=True)

        if user_task:
            return Response(data=user_task.data, status=status.HTTP_200_OK)
        else:
            return Response('Du lieu khong ton tai', status=status.HTTP_404_NOT_FOUND)

    def post(self, request, id):
        task = TaskSerializer(data=request.data)

        if not task.is_valid():
            return Response('Du lieu khong hop le', status=status.HTTP_400_BAD_REQUEST)

        task.save()
        return Response('Luu thanh cong', status= status.HTTP_200_OK)
    


class TaskDetailAction(APIView):
    
    def put(self, request, user_id, task_id):
        try:
            task = Task.objects.get(pk=task_id)
        except:
            task = None

        if task:
            task = TaskSerializer(instance=task, data=request.data)

            if not task.is_valid():
                return Response('Du lieu khong hop le', status=status.HTTP_400_BAD_REQUEST)
            
            task.save()
            return Response('Sua oke', status=status.HTTP_200_OK)
        else:
            return Response('Du lieu khong ton tai', status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, user_id, task_id):
        try:
            task = Task.objects.get(pk=task_id)
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
        
        try:
            user = User.objects.get(username=username)
        except:
            raise AuthenticationFailed('User not found')

        if not user.check_password(password):
            raise AuthenticationFailed('Wrong password')
        
        payload = {
            'id': user.id,
            'exp': datetime.utcnow() + timedelta(minutes=60),
            'iat': datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret',algorithm='HS256')
        
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'id': user.id,
            'username': user.username
        }
        return response


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