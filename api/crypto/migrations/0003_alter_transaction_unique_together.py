# Generated by Django 4.0.2 on 2022-02-28 08:29

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('crypto', '0002_initial'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='transaction',
            unique_together=set(),
        ),
    ]
