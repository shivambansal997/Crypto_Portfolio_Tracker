from rest_framework import serializers
from .models import Watchlist, Holding, Transaction

crypto_name = serializers.SerializerMethodField('get_crypto_name')


class TransactionSerializer(serializers.ModelSerializer):
    crypto_name = crypto_name
    platform = serializers.SerializerMethodField('get_platform_name')

    class Meta:
        model = Transaction
        fields = [
            'id',
            'crypto_name',
            'type',
            'price_usd',
            'quantity',
            'platform',
            'description',
            'created_at',
        ]

    def get_crypto_name(self, obj):
        return obj.crypto.crypto_name

    def get_platform_name(self, obj):
        return obj.platform.name


class WatchlistSerializer(serializers.ModelSerializer):
    crypto_name = crypto_name
    holding = serializers.SerializerMethodField('get_holding')

    class Meta:
        model = Watchlist
        fields = [
            'id',
            'crypto_name',
            'holding',
        ]

    def get_crypto_name(self, obj):
        return obj.crypto.crypto_name

    def get_holding(self, obj):
        return Holding.objects.get(user=obj.user).quantity
