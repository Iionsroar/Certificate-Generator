from rest_framework import serializers
from .models import Order, Account, Certificate

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'name', 'meal')

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ('certificate_name', 'template_img',
            'template_url', 'names_file', 'names_csv')
