from django.db import models

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