# Generated by Django 4.0.3 on 2022-03-17 09:33

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('crypto', '0018_alter_crypto_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='crypto',
            name='crypto_name',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='crypto',
            name='symbol',
            field=models.CharField(max_length=250),
        ),
    ]
