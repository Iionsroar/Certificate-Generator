from django.contrib import admin
from django.db import models
from .models import Tutorial
from tinymce.widgets import TinyMCE

# Register your models here.
class TutorialAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Title/date", {'fields': ["title", "published"]}),
        ("Content", {'fields': ["content"]}),
    ]

    formfield_overrides = {
        models.TextField: {'widget': TinyMCE()},
    }

admin.site.register(Tutorial, TutorialAdmin)
