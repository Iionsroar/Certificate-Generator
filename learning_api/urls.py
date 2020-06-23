from django.urls import path, include
from . import views
from rest_framework import routers

app_name = 'learning_api'

router = routers.DefaultRouter()
router.register('orders', views.OrderView)
router.register('certificates', views.CertificateView)

urlpatterns = [
    path('', include(router.urls)),
]
