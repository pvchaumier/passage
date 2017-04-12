from django.db import models

# Create your models here.
class Message(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    ip = models.CharField(max_length=255)
