from django.urls import path, include

from . import views

urlpatterns = [
    path('watchlist/', views.WatchlistView.as_view()),
    path('transaction/', views.TransactionView.as_view()),
]
