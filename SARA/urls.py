from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='n_home'),
]