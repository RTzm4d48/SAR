from django.db import models

# Create your models here.
class sari(models.Model):
    name_file = models.TextField(null=False)
    code = models.CharField(max_length=20, null=False) # CODIGO DEL PROPIO ARCHIVO
    code_destino = models.CharField(max_length=20, null=True) # YA SEA DEL CEDEMA U OTRO CODIGO PAL QUE ESTE DESTINADOE ESTE ARCHIVO
    created = models.DateTimeField(auto_now_add=True)
    extension = models.CharField(max_length=10)
    tipo = models.CharField(max_length=20, default='') # sari, sara, sarda, sarv

    def __str__(self):
        return self.name_file
    
class sara(models.Model):
    name_file = models.TextField(null=False)
    code = models.CharField(max_length=20, null=False) # CODIGO DEL PROPIO ARCHIVO
    code_destino = models.CharField(max_length=20, null=True) # YA SEA DEL CEDEMA U OTRO CODIGO PAL QUE ESTE DESTINADOE ESTE ARCHIVO
    created = models.DateTimeField(auto_now_add=True)
    extension = models.CharField(max_length=10)
    tipo = models.CharField(max_length=20, default='') # sari, sara, sarda, sarv


    def __str__(self):
        return self.name_file
    

class sarda(models.Model):
    name_file = models.TextField(null=False)
    code = models.CharField(max_length=20, null=False) # CODIGO DEL PROPIO ARCHIVO
    code_destino = models.CharField(max_length=20, null=True) # YA SEA DEL CEDEMA U OTRO CODIGO PAL QUE ESTE DESTINADOE ESTE ARCHIVO
    created = models.DateTimeField(auto_now_add=True)
    extension = models.CharField(max_length=10)
    tipo = models.CharField(max_length=20, default='') # sari, sara, sarda, sarv


    def __str__(self):
        return self.name_file
    
class sarv(models.Model):
    name_file = models.TextField(null=False)
    code = models.CharField(max_length=20, null=False) # CODIGO DEL PROPIO ARCHIVO
    code_destino = models.CharField(max_length=20, null=True) # YA SEA DEL CEDEMA U OTRO CODIGO PAL QUE ESTE DESTINADOE ESTE ARCHIVO
    created = models.DateTimeField(auto_now_add=True)
    extension = models.CharField(max_length=10)
    tipo = models.CharField(max_length=20, default='') # sari, sara, sarda, sarv


    def __str__(self):
        return self.name_file