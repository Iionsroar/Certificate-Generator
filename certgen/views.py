from django.http import HttpResponse
from django.shortcuts import render
from django.conf import settings
import os

# Create your views here.
def homepage(request):
    return render(request,
                  'certgen/home.html',
                  {})

def blank(request):
    return render(request,
                  'certgen/blank.html',
                  {})



