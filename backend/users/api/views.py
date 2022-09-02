import django
django.setup()

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from .serializers import (
    UserSerializer
)

User = get_user_model()

@api_view(['GET'])
def APIBaseView(request, *args, **kwargs):
    return Response({"detail" : "API Base Point"}, status=200)

@api_view(['GET'])
def UsersView(request, *args, **kwargs):
    context = {"request" : request}
    qs = User.objects.all()
    serializer = UserSerializer(qs, many=True, context=context)
    data = serializer.data
    return Response(data, status=200)