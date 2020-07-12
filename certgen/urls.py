from django.urls import path
from . import views

app_name = 'certgen'

urlpatterns = [
    path("", views.homepage, name='homepage'),
    path("user_uploads/certificate_templates/<image_slug>", views.image_slug, name='image_slug'),
]
