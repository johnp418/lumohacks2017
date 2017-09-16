from django.db import models

# Create your models here.
class Diary(models.Model):
	nap = models.ForeignKey('Nap', blank=True, null=True)
	date = models.DateField('Date')
	bedTime = models.TimeField('Time getting into bed')
	sleepTime = models.TimeField('Time trying to go to sleep')
	sleepAtteptDuration = models.DurationField()
	awakeFrequency = models.IntegerField()
	sleepDuration = models.DurationField()
	awakeTime = models.TimeField('Awake time')
	outOfBedTime = models.TimeField('Time out of bed')
	comment = models.CharField(max_length=300, blank=True, null=True)

	def __str__(self):
		return self.date.__str__()

class Nap(models.Model):
	startTime = models.TimeField('start time')
	endTime = models.TimeField('end time')

	def __str__(self):
		return str(self.id)