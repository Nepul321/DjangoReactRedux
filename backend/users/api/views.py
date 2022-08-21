from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def APIBaseView(request, *args, **kwargs):
    return Response({"detail" : "API Base Point"}, status=200)