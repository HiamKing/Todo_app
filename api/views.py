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
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            return Response({'error': 'Authentication error'})
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except:
            return Response({'error': 'Authentication error'})
        
        user_task = TaskSerializer(Task.objects.filter(user_id=payload['id']).order_by('-id'), many=True)

        return Response(data=user_task.data)

    def post(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            return Response({'error': 'Authentication error'})
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except:
            return Response({'error': 'Authentication error'})
        user = User.objects.get(id=payload['id'])
        task = TaskSerializer(data=request.data)

        if not task.is_valid():
            return Response({'error': 'Invalid data'})
        task.save(user_id=user)
        return Response({'message': 'Save success'})
    
    def put(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            return Response({'error': 'Authentication error'})
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except:
            return Response({'error': 'Authentication error'})

        task = Task.objects.get(id=request.data['id'])
        task = TaskSerializer(instance=task, data=request.data)

        if not task.is_valid():
            return Response({'error': 'Invalid data'})
            
        task.save()
        return Response({'message':'Change success'})

    def delete(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            return Response({'error': 'Authentication error'})
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except:
            return Response({'error': 'Authentication error'})

        task = Task.objects.get(id=request.data['id'])

        task.delete()
        return Response({'message': 'Delete Success'})


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


class LogoutView(APIView):
    def get(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'Success'
        }

        return response
