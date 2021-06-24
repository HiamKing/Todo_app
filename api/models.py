from re import T
from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE

# Create your models here.

class Task(models.Model):
    user_id = models.ForeignKey(User, on_delete=CASCADE)
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False, blank=True, null=True)

    def __str__(self):
        return self.user_id.username + ': ' + self.title



