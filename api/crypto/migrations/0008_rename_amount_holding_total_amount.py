# Generated by Django 4.0.2 on 2022-03-16 11:02

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('crypto', '0007_holding_amount'),
    ]

    operations = [
        migrations.RenameField(
            model_name='holding',
            old_name='amount',
            new_name='total_amount',
        ),
    ]
