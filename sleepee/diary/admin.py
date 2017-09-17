from django.contrib import admin
from diary.models import Diary, Nap, Patient, Physician

# Register your models here.
admin.site.register(Diary)
admin.site.register(Nap)
admin.site.register(Patient)
admin.site.register(Physician)
