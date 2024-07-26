from django.urls import path
from . import views
from .views import procesar_nombre

urlpatterns = [
    path('', views.home, name='n_home'),
    path('files/', views.files, name='n_files'),
    path('folders/', views.folders, name='n_folders'),
    path('procesar-nombre/', procesar_nombre, name='procesar_nombre'),
]