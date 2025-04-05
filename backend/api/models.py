from django.db import models

# Create your models here.
class Elements(models.Model):
    symbol = models.CharField(max_length=2)
    name = models.CharField(max_length=255)
    atomic_number = models.IntegerField()
    atomic_mass = models.IntegerField()

    def __str__(self):
        return self.name