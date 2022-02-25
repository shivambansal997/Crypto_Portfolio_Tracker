from django.db import migrations
from api.user.models import User


class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = User(first_name='Shivam', email='shivambansal997@gmail.com', is_staff='True', mobile_number='1234567890',
                    is_superuser='True', gender='Male', username='shiambansal997')
        user.set_password('qwerty')
        user.save()

    dependencies = [

    ]

    operations = [
        migrations.RunPython(seed_data),
    ]
