from django.db import models

# NOTE : EN ESTE MODELO ESTN LOS REGISTROS DE SARA, SARI, SARV, SARDA
class sar(models.Model):
    name_file = models.TextField(null=False)
    old_name = models.TextField(null=True, blank=True) # NOMBRE ORIGINAL DEL ARCHIVO, ESTO SE APLICARA A TIPOS DE ARCHIVOS (rar, file(js, css, py, txt, etc))
    code = models.CharField(max_length=20, null=False) # CODIGO DEL PROPIO ARCHIVO
    destino = models.CharField(max_length=50, null=False, default='') # NOMBRE O IDENTIFICACIÓN DEL DESTINO
    code_destino = models.CharField(max_length=20, null=True) # YA SEA DEL CEDEMA U OTRO CODIGO PAL QUE ESTE DESTINADOE ESTE ARCHIVO
    created = models.DateTimeField(auto_now_add=True)
    extension = models.CharField(max_length=10)
    tipo = models.CharField(max_length=20, default='') # sari, sara, sarda, sarv

    def __str__(self):
        return self.name_file