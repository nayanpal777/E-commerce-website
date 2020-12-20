from django.db import migrations
from api.user.models import CustomUser


class Migration(migrations.Migration):
    def seed_data(self, apps):
        user = CustomUser(name="nayan",
                          email="nayanpal@gmail.com",
                          is_staff=True,
                          is_superuser=True,
                          phone="1234567891",
                          gender="Male"
                          )
        user.set_password("12345")
        user.save()

    dependencies = [

    ]

    operations = [
        migrations.RunPython(seed_data), 
    ]
