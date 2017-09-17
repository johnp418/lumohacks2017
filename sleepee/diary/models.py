from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.
class Diary(models.Model):
	nap = models.ForeignKey('Nap', blank=True, null=True)
	date = models.DateField('Date')
	bedTime = models.DateTimeField('Time getting into bed')
	sleepTime = models.DateTimeField('Time trying to go to sleep')
	sleepAttemptDuration = models.DurationField()
	awakeFrequency = models.IntegerField()
	sleepDuration = models.DurationField()
	awakeTime = models.DateTimeField('Awake time')
	outOfBedTime = models.DateTimeField('Time out of bed')
	comment = models.CharField(max_length=300, blank=True, null=True)

	def __str__(self):
		return str(self.id) + ":  " + self.date.__str__()

class Nap(models.Model):
	startTime = models.TimeField('start time')
	endTime = models.TimeField('end time')
	def __str__(self):
		return str(self.id)

class Patient(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	dateJoined = models.DateTimeField(auto_now_add=True)
	underPhysician = models.ForeignKey('Physician', blank=True, null=True)

	def __str__(self):
		return str(self.user.id) + ": " + self.dateJoined.__str__()


@receiver(post_save, sender=User)
def create_patient(sender, instance, created, **kwargs):
	# print("print")
	# print("helloworld")
	# print("ea")
    if created:
        Patient.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_patient(sender, instance, **kwargs):
#     instance.profile.save()

# @receiver(post_save, sender=User)
class Physician(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	dateJoined = models.DateTimeField(auto_now_add=True)
	def __str__(self):
		return str(self.user.id) + ": " + self.dateJoined.__str__();
