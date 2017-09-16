from django.contrib import admin
from diary.models import Diary
from diary.models import Nap

# Register your models here.
admin.site.register(Diary)
admin.site.register(Nap)