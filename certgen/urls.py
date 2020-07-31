from django.urls import path
from . import views

app_name = 'certgen'

urlpatterns = [
    path("", views.homepage, name='homepage'),
    path("blank", views.blank, name='blank'),
]
