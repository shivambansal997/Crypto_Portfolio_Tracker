from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Platform, Crypto, Transaction, Holding, Watchlist

admin.site.register(Platform)
admin.site.register(Crypto)
admin.site.register(Transaction)
admin.site.register(Holding)
admin.site.register(Watchlist)
