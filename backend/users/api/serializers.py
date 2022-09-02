import django
django.setup()

from django.contrib.auth import get_user_model


User = get_user_model()

from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email',  'username', 'first_name', 'last_name')