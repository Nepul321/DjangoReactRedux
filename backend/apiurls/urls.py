from django.urls import path
from users.api.views import (
    APIBaseView,
    UsersView,
    UserLoginView,
    UserAccountView,
    UserChangePasswordView
)

urlpatterns = [
    path('', APIBaseView, name="api-base"),
    path('users/', UsersView, name="api-user-list"),
    path('users/login/', UserLoginView, name="api-user-login"),
    path('users/account/', UserAccountView, name="api-user-account"),
    path('users/password/', UserChangePasswordView, name="api-user-password"),
]
