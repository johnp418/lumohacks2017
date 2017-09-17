from diary.models import Diary, Nap
from rest_framework import serializers
from django.contrib.auth.models import User

class DiarySerializer(serializers.ModelSerializer):
	class Meta:
		model = Diary
		# field = (
		# 	'nap',
		# 	'date',
		# 	'bedTime',
		# 	'sleepTime',
		# 	'sleepAttemptDuration',
		# 	'awakeFrequency',
		# 	'sleepDuration',
		# 	'awakeTime',
		# 	'outOfBedTime',
		# 	'comment'
		# )
		fields = '__all__'
		depth = 1

class NapSerializer(serializers.ModelSerializer):
	class Meta:
		model = Nap
		field = ('startTime', 'endTime')

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = '__all__'
		depth = 1
