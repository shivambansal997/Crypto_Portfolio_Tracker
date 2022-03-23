from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.CryptoView.as_view()),
    path('watchlist/', views.WatchlistView.as_view()),
    path('transaction/', views.TransactionView.as_view()),
    path('holding/', views.HoldingView.as_view()),
]
