from django.urls import path
from users.api.views import (
    APIBaseView
)

urlpatterns = [
    path('', APIBaseView, name="api-base"),
]
