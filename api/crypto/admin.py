from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Platform, Crypto, Transaction, Holding, Watchlist


class CryptoAdmin(admin.ModelAdmin):
    list_display = ('crypto_name', 'abbreviation', 'icon',)


class PlatformAdmin(admin.ModelAdmin):
    list_display = ('name', 'icon',)


class HoldingAdmin(admin.ModelAdmin):
    list_display = ('user', 'crypto', 'quantity', 'avg_price', 'total_amount')


class TransactionAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'crypto', 'type', 'price_usd', 'quantity', 'amount', 'platform', 'description', 'created_at'
    )


class WatchlistAdmin(admin.ModelAdmin):
    list_display = ('user', 'crypto', 'created_at')
    list_filter = ('user', 'crypto',)


admin.site.register(Platform, PlatformAdmin)
admin.site.register(Crypto, CryptoAdmin)
admin.site.register(Transaction, TransactionAdmin)
admin.site.register(Holding, HoldingAdmin)
admin.site.register(Watchlist, WatchlistAdmin)
