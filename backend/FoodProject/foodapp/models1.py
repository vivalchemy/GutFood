from django.db import models

# Create your models here.
# chat/models.py


class Message(models.Model):
    username = models.CharField(max_length=50)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username}: {self.content[:20]}"
