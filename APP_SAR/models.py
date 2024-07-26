from django.db import models

# Create your models here.
class image(models.Model):
    name_file = models.TextField(null=False)
    code = models.CharField(max_length=100, null=False)
    code_module = models.CharField(max_length=100, null=True)
    game_over = models.CharField(max_length=10)
    created = models.DateTimeField(auto_now_add=True)
    extension = models.CharField(max_length=10)

    def __str__(self):
        return self.name_file
    
class audio(models.Model):
    name_file = models.TextField(null=False)
    code = models.CharField(max_length=100, null=False)
    code_module = models.CharField(max_length=100, null=True)
    game_over = models.CharField(max_length=10)
    created = models.DateTimeField(auto_now_add=True)
    extension = models.CharField(max_length=10)

    def __str__(self):
        return self.name_file