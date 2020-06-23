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

# explore corey schafer api tutorials: https://www.youtube.com/user/schafer5/videos
class Certificate(models.Model):
    certificate_name = models.CharField(max_length=50)
    template_img = models.ImageField(blank=True, default='', upload_to='certificate_templates')
    template_url = models.URLField(blank=True, default='')
    names_file = models.FileField(blank=True, default='', upload_to='names_files')
    names_csv = models.TextField(blank=True, default='')
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
            super(Certificate, self).save()
        else:
            super(Certificate, self).save()


    def __str__(self):
        return self.certificate_name


# `django & rest framework error when posting data`
# error:
# ```python
# Got a `TypeError` when calling `Certificate.objects.create()`. This may be because you have a writable field on the serializer class that is not a valid argument to `Certificate.objects.create()`. You may need to make the field read-only, or override the CertificateSerializer.create() method to handle this correctly.
# ```

# models.py
# ```python
# class Certificate(models.Model):
#     certificate_name = models.CharField(max_length=50)
#     template_img = models.ImageField(blank=True, default='', upload_to='certificate_templates')
#     template_url = models.URLField(blank=True, default='')
#     names_file = models.FileField(blank=True, default='', upload_to='names_files')
#     names_csv = models.TextField(blank=True, default='')
#     Y_RATIO = 1.6268

#     def get_remote_image(self):
#         if self.template_url and not self.template_img:
#             img_result = requests.get(self.template_url)
#             img_name = os.path.basename(self.template_url)
#             with open(os.path.join(TEMP_DIR, img_name), 'wb') as img_file:
#                 img_file.write(img_result.content)
#             self.template_img.save(
#                 img_name,
#                 open(os.path.join(TEMP_DIR, img_name), 'rb')
#                 )
#             self.save()


#     def clean(self):
#         if not self.template_img and not self.template_url:
#             raise ValidationError({'template_img': 'Either one of template_img or template_url should have a value.'})
#         if not self.names_csv and not self.names_file:
#             raise ValidationError({'names_csv': 'Either one of names_csv or names_file should have a value.'})


#     def save(self):
#         if self.template_url and not self.template_img:
#             self.get_remote_image()
#             super(Certificate, self).save()
#         else:
#             super(Certificate, self).save()


#     def __str__(self):
#         return self.certificate_name
# ```

# ````
# Certificate Model
# this model has the clean() and get_remote_image() methods since there are two options of posting image to my database, either with urls or file upload - so when one is already selected the other one is no longer needed. if url is the selected option, it saves to the image field.
# ```

# serializers.py
# ```python
# class CertificateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Certificate
#         fields = ('certificate_name', 'template_img',
#             'template_url', 'names_file', 'names_csv')
# ```

# i saw at
# ```
# https://stackoverflow.com/questions/44717250/typeerror-when-calling-create-you-may-need-to-make-the-field-read-only-or
# &
# https://stackoverflow.com/questions/44997315/django-rest-framework-got-a-typeerror-when-calling-note-objects-create
# ```
# that the save method shouldnt have arguments but mine already doesnt have arguments
