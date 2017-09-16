from diary.models import Diary, Nap
from django.shortcuts import get_object_or_404
from diary.serializers import DiarySerializer
from rest_framework import viewsets
from rest_framework.response import Response
# Create your views here.

class DiaryViewSet(viewsets.ViewSet):
	def list(self, request):
		queryset = Diary.objects.all()
		serializer = DiarySerializer(queryset, many=True)
		return Response(serializer.data)

	def retrieve(self, request, pk):
		