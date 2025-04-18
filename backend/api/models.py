from django.db import models

# Create your models here.
class Elements(models.Model):
    symbol = models.CharField(max_length=2)
    name = models.CharField(max_length=255)
    thai_translation = models.CharField(max_length=255, default=255)
    group = models.CharField(max_length=255, default="")
    atomic_number = models.IntegerField()
    atomic_mass = models.IntegerField()

    def __str__(self):
        return self.name