from rest_framework import serializers
from .models import Watchlist, Holding, Transaction, Crypto

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
    symbol = serializers.SerializerMethodField('get_symbol')
    crypto_id = serializers.SerializerMethodField('get_crypto_id')

    class Meta:
        model = Watchlist
        fields = [
            'crypto_id',
            'crypto_name',
            'symbol',
        ]

    def get_crypto_name(self, obj):
        return obj.crypto.crypto_name

    def get_symbol(self, obj):
        return obj.crypto.symbol

    def get_crypto_id(self, obj):
        return obj.crypto.id


class CryptoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crypto
        fields = '__all__'


class HoldingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Holding
        fields = [
            'total_amount',
            'crypto',
            'quantity',
            'avg_price',
        ]
