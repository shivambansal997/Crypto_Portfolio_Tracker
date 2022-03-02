# Generated by Django 4.0.2 on 2022-02-26 05:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ('crypto', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='watchlist',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE,
                                    related_name='watchlist_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='transaction',
            name='crypto',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE,
                                    related_name='transaction_set', to='crypto.crypto'),
        ),
        migrations.AddField(
            model_name='transaction',
            name='platform',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE,
                                    related_name='transaction_set', to='crypto.platform'),
        ),
        migrations.AddField(
            model_name='transaction',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE,
                                    related_name='transaction_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='holding',
            name='crypto',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='holding_set',
                                    to='crypto.crypto'),
        ),
        migrations.AddField(
            model_name='holding',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='holding_set',
                                    to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='watchlist',
            unique_together={('user', 'crypto')},
        ),
        migrations.AlterUniqueTogether(
            name='transaction',
            unique_together={('user', 'crypto', 'platform')},
        ),
        migrations.AlterUniqueTogether(
            name='holding',
            unique_together={('user', 'crypto')},
        ),
    ]