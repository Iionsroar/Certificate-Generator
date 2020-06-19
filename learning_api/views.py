from django.shortcuts import render
from rest_framework import viewsets
from .models import Order, Account
from .serializers import OrderSerializer, AccountSerializer

# Create your views here.
class OrderView(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class AccountView(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
