from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from .models import CustomUser
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout

import random
import re
# Create your views here.

# Here we are generating random session token


def generate_session_token(length=10):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97, 123)] + [str(i) for i in range(10)]) for _ in range(length))


@csrf_exempt
def signin(request):
    if not request.method == "POST":
        return JsonResponse({'error': 'send a post request with valid parameter'})

    username = request.POST['email']
    password = request.POST['password']
    # this is validation part at backend *************************************
    if not re.match("^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$", username):
        return JsonResponse({'error': 'enter a valid email'})

    if len(password) < 3:
        return JsonResponse({'error': 'password needs to be at least of 3'})
    # *************************************************************************
    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(email=username)

        if user.check_password(password):
            usr_dict = UserModel.objects.filter(
                email=username).values().first()
            # for only one user we use filter method
            usr_dict.pop('password')

            if user.session_token != "0":
                user.session_token = "0"
                user.save()
                return JsonResponse({'error': 'Previous session exists!!!!!'})

            token = generate_session_token()
            user.session_token = token
            user.save()
            login(request, user)
            return JsonResponse({'token': token, 'user': usr_dict})
        else:
            return JsonResponse({'error': 'Invalid Password'})

    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'Invalid Email'})


def signout(request, id):
    logout(request)

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        user.session_token = "0"
        user.save()

    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'Invalid User ID'})

    return JsonResponse({'success': 'Logout Successfully..!'})


class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create': [AllowAny]}

    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]

        except KeyError:
            return [permission() for permission in self.permission_classes]
