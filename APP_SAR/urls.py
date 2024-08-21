from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='n_home'),
    path('subir/', views.subir, name='n_subir'),
    path('registros/', views.registros, name='n_registros'),
    path('uploadFile/', views.upload_file, name='n_upload_file'),
    path('obtain_data/', views.obtain_data, name='n_obtain_data'),
    path('show_information/', views.show_information, name="n_show_information"),
]