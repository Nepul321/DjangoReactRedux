import django
django.setup()

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
import jwt
import datetime
from .serializers import (
    UserSerializer
)
from .decorators import (
  unauthenticated_user,
  login_required
)

User = get_user_model()

@api_view(['GET'])
def APIBaseView(request, *args, **kwargs):
    return Response({"detail" : "API Base Point"}, status=200)

@api_view(['GET'])
def UsersView(request, *args, **kwargs):
    qs = User.objects.all()
    serializer = UserSerializer(qs, many=True)
    data = serializer.data
    return Response(data, status=200)

@api_view(['POST'])
@unauthenticated_user
def UserLoginView(request, *args, **kwargs):
    data = request.data
    email = data['email']
    password = data['password']

    if not email:
        return Response({"message" : "Email not entered"}, status=204)

    if not password:
        return Response({"message" : "Password not given"}, status=204)

    qs = User.objects.filter(email=email)
    if not qs:
        return Response({"message" : "User not found"}, status=404)

    user = qs.first()

    if user.is_active == False:
        return Response({"message" : "User is not active"})

    if not user.check_password(password):
        return Response({"message" : "Wrong password"}, status=401)

    payload = {
        'id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=180),
        'iat': datetime.datetime.utcnow()
    }

    token = jwt.encode(payload, 'secret', algorithm='HS256')

    response = Response()

    response.status_code = 200

    response.data = {
        "jwt" : token
    }

    return response


@api_view(['GET', 'PUT'])
@login_required
def UserAccountView(request, *args, **kwargs):
    auth = request.headers['Authorization']
    token = auth.replace("Bearer ", "")
    payload = jwt.decode(token, 'secret', algorithms=['HS256'])

    user = User.objects.filter(id=payload['id']).first()
    if request.method == "PUT":
        serializer = UserSerializer(instance=user, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=200)

    serializer = UserSerializer(user)

    return Response(serializer.data, status=200)
