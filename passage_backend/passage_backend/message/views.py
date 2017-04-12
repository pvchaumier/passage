from django.http import JsonResponse
from rest_framework import generics

from .models import Message
from .serializers import MessageSerializer


def index(request):
    print(request.META['REMOTE_ADDR'])
    return JsonResponse({'conversation': 'test'})


class MessageList(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def perform_create(self, serializer):
        # one still need to provide an IP field in the JSON but it is 
        # actually set here
        serializer.save(ip=self.request.META.get('REMOTE_ADDR', '0'))
