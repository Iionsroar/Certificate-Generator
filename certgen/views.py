from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.conf import settings
from .models import Certificate
from PIL import Image
import json
import os

USER_UPLOADS_DIR = settings.MEDIA_ROOT

# Create your views here.
def image_slug(request, image_slug):
  try:
    with open(os.path.join(USER_UPLOADS_DIR, 'certificate_templates', image_slug), "rb") as imageFile:
      return HttpResponse(imageFile.read(), content_type="image/png")
  except IOError:
    return HttpResponse('image not found')


def practice(request):
    return render(request,
                'certgen/practice.html',
                {})


def homepage(request):
    return render(request,
                  'certgen/home.html',
                  {})


