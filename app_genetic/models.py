from django.db import models
from django.contrib.auth.models import User



class Job(models.Model):
	user = models.ForeignKey(to=User)
	dossier = models.FileField(max_length=255, upload_to="job/input")
	annotation_program = models.TextField()
	annotation_databases = models.TextField()
	params = models.TextField(blank=True)
	csvout = models.TextField(blank=True)