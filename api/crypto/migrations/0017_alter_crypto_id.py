# Generated by Django 4.0.3 on 2022-03-17 09:28

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('crypto', '0016_alter_crypto_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='crypto',
            name='id',
            field=models.CharField(max_length=500, primary_key=True, serialize=False),
        ),
    ]
