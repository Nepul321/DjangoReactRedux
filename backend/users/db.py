import django
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

print(User.objects.all())