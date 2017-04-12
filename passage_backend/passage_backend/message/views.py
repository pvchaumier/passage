from django.http import JsonResponse
from rest_framework import generics

from .models import Message
from .serializers import MessageSerializer


def index(request):
    return JsonResponse({'conversation': 'test'})


class SnippetList(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
