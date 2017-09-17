from diary.models import Diary, Nap, Patient, Physician
from django.shortcuts import get_object_or_404
from diary.serializers import DiarySerializer, UserSerializer
from django.http import Http404
from rest_framework import viewsets, status
from rest_framework.response import Response
# Create your views here.

class DiaryViewSet(viewsets.ViewSet):
	def list(self, request):
		queryset = Diary.objects.all()
		serializer = DiarySerializer(queryset, many=True)
		return Response(serializer.data)

	def retrieve(self, request, pk):
		try:
			queryset = Diary.objects.get(id=pk)
		except Diary.DoesNotExist:
			raise Http404
		serializer = DiarySerializer(queryset)
		return Response(serializer.data)

	def create(self, request):
		serializer = DiarySerializer(data=request.data)
		print('creating diary')
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	# def update(self, request, pk):
	# 	pass

	def partial_update(self, request, pk):
		try:
			queryset = Diary.objects.get(id=pk)
		except Diary.DoesNotExist:
			raise Http404
		serializer = DiarySerializer(queryset, data=request.data, partial=True)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def destroy(self, request, pk):
		try:
			queryset = Diary.objects.get(id=pk)
		except Diary.DoesNotExist:
			raise Http404
		queryset.delete()
		return Response("deletion successful", status=status.HTTP_202_ACCEPTED)


class UserViewSet(viewsets.ViewSet):

	# def retrieve(self, request, pk):
	# 	try:
	# 		queryset = Diary.objects.get(id=pk)
	# 	except Diary.DoesNotExist:
	# 		raise Http404
	# 	serializer = DiarySerializer(queryset)
	# 	return Response(serializer.data)

	def create(self, request):
		serializer = UserSerializer(data=request.data)
		print(request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def partial_update(self, request, pk):
		try:
			queryset = Diary.objects.get(id=pk)
		except Diary.DoesNotExist:
			raise Http404
		serializer = DiarySerializer(queryset, data=request.data, partial=True)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def destroy(self, request, pk):
		try:
			queryset = Diary.objects.get(id=pk)
		except Diary.DoesNotExist:
			raise Http404
		queryset.delete()
		return Response("deletion successful", status=status.HTTP_202_ACCEPTED)
