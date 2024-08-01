from django.shortcuts import render
from APP_SAR.models import sar

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import json

from PIL import Image
import io
import base64

# Create your views here.
def home(request):
    return render(request, 'home.html')

def subir(request):
    return render(request, 'subir.html')

def registros(request):
    modelo1 = list(sar.objects.all().values('name_file', 'code', 'code_destino', 'extension', 'id', 'tipo', 'destino'))[::-1]

    # print(todos_los_registros)
    data_json = json.dumps(modelo1)

    return render(request, 'registros.html', {'data': data_json})

@csrf_exempt
def obtain_data(request):
    if request.method == 'POST':
        type_file = request.POST.get('type_file')

        modelo1 = list(sar.objects.filter(tipo = type_file).values('name_file', 'code', 'code_destino', 'extension', 'id', 'tipo'))[::-1]

        data = {'data': modelo1}
        return JsonResponse(data)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)

@csrf_exempt
def upload_file(request):
    if request.method == 'POST':
        name_file = request.POST.get('name_file')
        myfile = request.FILES.get('myfile')
        typeFile = request.POST.get('tipeFile')
        destination = request.POST.get('destination')
        code_file = request.POST.get('code_file')
        destino = request.POST.get('destino')
        code_destino = request.POST.get('code_destino')
        extension = request.POST.get('extension')

        finalPath = write_file(name_file, myfile, typeFile, destination)
        obj_data = insert_dataBase(finalPath, typeFile, code_file, code_destino, extension, destino)

        response_data = {"id": obj_data.id, "name_file": obj_data.name_file, "code": obj_data.code, "code_destino": obj_data.code_destino, "extension": obj_data.extension, "tipo": obj_data.tipo, "destino": obj_data.destino}
        
        return JsonResponse(response_data)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)
    

def write_file(file_name, imgcapture, typeFile, destination):
        # NOTE : ESCRIBIMOS EL ARCHIVO EN LA CARPETA CORRESPONDIENTE

        print(typeFile)
        print(destination)

        path_file = ''
        if(typeFile == 'image'):
            if(destination == 'cedema'):
                path_file = f'media/SARI/sar-cedema/{file_name}'
            elif(destination == 'otros'):
                path_file = f'media/SARI/sar-otros/{file_name}'
        elif(typeFile == 'audio'):
            if(destination == 'cedema'):
                path_file = f'media/SARA/sar-cedema/{file_name}'
            elif(destination == 'otros'):
                path_file = f'media/SARA/sar-otros/{file_name}'
        elif(typeFile == 'video'):
            if(destination == 'cedema'):
                path_file = f'media/SARV/sar-cedema/{file_name}'
            elif(destination == 'otros'):
                path_file = f'media/SARV/sar-otros/{file_name}'
        elif(typeFile == 'rar'):
            if(destination == 'cedema'):
                path_file = f'media/SARDA/sar-cedema/{file_name}'
            elif(destination == 'otros'):
                path_file = f'media/SARDA/sar-otros/{file_name}'
        
        with open(f'APP_SAR/{path_file}', 'wb') as f:
            for chunk in imgcapture.chunks():
                f.write(chunk)
        return path_file


def insert_dataBase(file_name, typeFile, code_file, code_destino, extension, destino):
    # NOTE : INSERTAMOS LOS DATOS EN LA BASE DE DATOS
    tipo = ''
    if(typeFile == 'image'):
        tipo = 'sari'
    elif(typeFile == 'audio'):
        tipo = 'sara'
    elif(typeFile == 'video'):
        tipo = 'sarv'
    elif(typeFile == 'rar'):
        tipo = 'sarda'
    insert_file = sar(name_file=file_name, code=code_file, code_destino=code_destino, extension=extension, tipo=tipo, destino=destino)
    insert_file.save()

    return insert_file
