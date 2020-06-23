from django.shortcuts import render
from rest_framework import viewsets
from .models import Order, Account, Certificate
from .serializers import OrderSerializer, CertificateSerializer

# Create your views here.
class OrderView(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class CertificateView(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
