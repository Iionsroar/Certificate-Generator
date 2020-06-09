from django.contrib import admin
from django.db import models
from .models import Tutorial, TutorialSeries, TutorialCategory
from tinymce.widgets import TinyMCE

# Register your models here.
class TutorialAdmin(admin.ModelAdmin):
    fieldsets = [
        ("Title/date", {'fields': ["title", "published"]}),
        ("URL", {'fields': ["tutorial_slug"]}),
        ("Series", {'fields': ["tutorial_series"]}),
        ("Content", {'fields': ["content"]}),
    ]

    formfield_overrides = {
        models.TextField: {'widget': TinyMCE()},
    }

admin.site.register(TutorialSeries)
admin.site.register(TutorialCategory)
admin.site.register(Tutorial, TutorialAdmin)
