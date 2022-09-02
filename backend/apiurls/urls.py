from django.urls import path
from users.api.views import (
    APIBaseView,
    UsersView
)

urlpatterns = [
    path('', APIBaseView, name="api-base"),
    path('users/', UsersView, name="api-user-signup"),
]
