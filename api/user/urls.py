from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'', views.UserViewSet)

urlpatterns = [
    path('login/', views.login),
    path('logout/', views.Logout.as_view()),
    path('', include(router.urls))
]
