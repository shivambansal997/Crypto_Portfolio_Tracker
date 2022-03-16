import uuid

from django.contrib.auth import get_user_model
from django.db import models


# Create your models here.
class Transaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='transaction_set', null=True)
    crypto = models.ForeignKey('crypto.Crypto', on_delete=models.CASCADE, related_name='transaction_set', null=True)
    type = models.CharField(max_length=4)
    price_usd = models.DecimalField(default=0, null=True, max_digits=20, decimal_places=10)
    quantity = models.DecimalField(default=0, null=True, max_digits=20, decimal_places=10)
    amount = models.DecimalField(default=0, null=True, max_digits=20, decimal_places=10, editable=False)
    platform = models.ForeignKey('crypto.Platform', on_delete=models.CASCADE, related_name='transaction_set', null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)


class Crypto(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    crypto_name = models.CharField(max_length=50)
    abbreviation = models.CharField(max_length=20)
    icon = models.ImageField(upload_to='icon/crypto', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.crypto_name


class Holding(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='holding_set', null=True)
    crypto = models.ForeignKey('crypto.Crypto', on_delete=models.CASCADE, related_name='holding_set', null=True)
    quantity = models.DecimalField(default=0, null=True, max_digits=20, decimal_places=10)
    avg_price = models.DecimalField(default=0, null=True, max_digits=20, decimal_places=10)
    total_amount = models.DecimalField(default=0, null=True, max_digits=20, decimal_places=10, editable=False)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    update_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'crypto')
        ordering = ('-created_at',)


class Watchlist(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='watchlist_set', null=True)
    crypto = models.ForeignKey('crypto.Crypto', on_delete=models.CASCADE, related_name='watchlist_set', null=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        unique_together = ('user', 'crypto')
        ordering = ('-created_at',)


class Platform(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50)
    icon = models.ImageField(upload_to='icon/platform', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.name
