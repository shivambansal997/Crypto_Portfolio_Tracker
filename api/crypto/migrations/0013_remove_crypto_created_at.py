# Generated by Django 4.0.3 on 2022-03-17 09:20

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('crypto', '0012_remove_crypto_icon'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='crypto',
            name='created_at',
        ),
    ]
