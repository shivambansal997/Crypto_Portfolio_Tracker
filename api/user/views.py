from django.conf import settings
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login as auth_login, logout
from rest_framework import viewsets
from rest_framework.views import APIView

from django.http import JsonResponse

from .models import User

# Permissions
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly, IsAdminUser
from ..utils import IsOwner, IsUserOwner

# Serializers
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes_by_action = {'create': [AllowAny],
                                    'list': [AllowAny],
                                    'update': [IsUserOwner],
                                    'partial_update': [IsUserOwner],
                                    'retrieve': [IsAuthenticatedOrReadOnly],
                                    'destroy': [IsUserOwner]
                                    }

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]


def auth_user(request):
    context = {
        'first_name': request.user.first_name,
        'username': request.user.username
    }
    return JsonResponse(context)


@csrf_exempt
def login(request):
    print('abd')
    if not request.method == 'POST':
        return JsonResponse({'error': 'Send a post request with valid parameter only'})

    username = request.POST['username']
    password = request.POST['password']

    user = None

    if User.objects.filter(mobile_number=username).exists():
        user = User.objects.get(mobile_number=username)
    elif User.objects.filter(username=username).exists():
        user = User.objects.get(username=username)
    elif User.objects.filter(email=username).exists():
        user = User.objects.get(email=username)
        usr_dict = User.objects.filter(email=username).values().first()

    if user is not None:
        if user.check_password(password):
            auth_login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            return JsonResponse({'Success': 'Login Successful'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid Credentials'}, status=401)
    else:
        return JsonResponse({'error': 'Invalid Credentials'}, status=401)


class Logout(APIView):
    def get(self, request):
        try:
            logout(request)
            return JsonResponse({'success': 'Logout success'})
        except User.DoesNotExist:
            return JsonResponse({'Failed': 'Logout failed'})
