# Generated by Django 5.2 on 2025-04-07 03:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_elements_group'),
    ]

    operations = [
        migrations.AddField(
            model_name='elements',
            name='thai_translation',
            field=models.CharField(default=255, max_length=255),
        ),
    ]
