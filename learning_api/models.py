from django.core.exceptions import ValidationError
from django.core.files import File
from django.conf import settings
from django.db import models
import requests
import os

TEMP_DIR = os.path.join(settings.MEDIA_ROOT, 'temp')

# Create your models here.
class Order(models.Model):
    name = models.CharField(max_length=50)
    meal = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Account(models.Model):
    college = models.CharField(max_length=5)
    username = models.CharField(max_length=40)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.username

class Certificate(models.Model):
    # explore corey schafer api tutorials: https://www.youtube.com/user/schafer5/videos
    certificate_name = models.CharField(max_length=50)
    template_img = models.ImageField(blank=True, default='', upload_to='certificate_templates')
    template_url = models.URLField(blank=True, default='')
    names_csv = models.TextField(blank=True, default='')
    names_file = models.FileField(blank=True, default='', upload_to='names_files') #TODO
    Y_RATIO = 1.6268

    def get_remote_image(self):
        # reference: https://stackoverflow.com/questions/16381241/django-save-image-from-url-and-connect-with-imagefield
        if self.template_url and not self.template_img:
            img_result = requests.get(self.template_url)
            img_name = os.path.basename(self.template_url)
            with open(os.path.join(TEMP_DIR, img_name), 'wb') as img_file:
                img_file.write(img_result.content)
            self.template_img.save(
                img_name,
                open(os.path.join(TEMP_DIR, img_name), 'rb')
                )
            self.save()

    def clean(self):
        # reference: https://stackoverflow.com/questions/2151966/conditionally-require-only-one-field-in-django-model-form/2151974
        if not self.template_img and not self.template_url:
            raise ValidationError({'template_img': 'Either one of template_img or template_url should have a value.'})
        if not self.names_csv and not self.names_file:
            raise ValidationError({'names_csv': 'Either one of names_csv or names_file should have a value.'})


    def save(self):
        if self.template_url and not self.template_img:
            self.get_remote_image()
            super().save()


    def __str__(self):
        return self.certificate_name
