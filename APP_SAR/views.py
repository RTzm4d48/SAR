from django.shortcuts import render
from APP_SAR.models import sar

from django.conf import settings
import os

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
    modelo1 = list(sar.objects.all().values('name_file', 'code', 'code_destino', 'extension', 'id', 'tipo', 'destino', 'old_name'))[::-1]

    # print(todos_los_registros)
    data_json = json.dumps(modelo1)

    return render(request, 'registros.html', {'data': data_json})

@csrf_exempt
def obtain_data(request):
    if request.method == 'POST':
        type_file = request.POST.get('type_file')

        modelo1 = list(sar.objects.filter(tipo = type_file).values('name_file', 'code', 'code_destino', 'extension', 'id', 'tipo', 'old_name'))[::-1]
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
        nameFile = request.POST.get('nameFile')
        destination = request.POST.get('destination')
        code_file = request.POST.get('code_file')
        code_destino = request.POST.get('code_destino')
        extension = request.POST.get('extension')

        finalPath = write_file(name_file, myfile, typeFile, destination)
        obj_data = insert_dataBase(finalPath, typeFile, code_file, code_destino, extension, destination, nameFile)

        response_data = {"id": obj_data.id, "name_file": obj_data.name_file, "code": obj_data.code, "code_destino": obj_data.code_destino, "extension": obj_data.extension, "destino": obj_data.destino, "tipo": obj_data.tipo, "old_name": obj_data.old_name}
        
        return JsonResponse(response_data)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)
    

def write_file(file_name, imgcapture, typeFile, destination):
        # NOTE : ESCRIBIMOS EL ARCHIVO EN LA CARPETA CORRESPONDIENTE

        print(typeFile)
        print(destination)

        path_folder = ''
        if(typeFile == 'image'):
                path_folder = f'media/SARI/{destination}'
        elif(typeFile == 'audio'):
                path_folder = f'media/SARA/{destination}'
        elif(typeFile == 'video'):
                path_folder = f'media/SARV/{destination}'
        elif(typeFile in ['rar', 'file']):
                path_folder = f'media/SARDA/{destination}'
        
        if not os.path.exists(f'APP_SAR/{path_folder}'):
            os.makedirs(f'APP_SAR/{path_folder}')
        else:
            print('El directorio static ya existe.')

        with open(f'APP_SAR/{path_folder}/{file_name}', 'wb') as f:
            for chunk in imgcapture.chunks():
                f.write(chunk)
        
        return f'{path_folder}/{file_name}'


def insert_dataBase(file_name, typeFile, code_file, code_destino, extension, destino, nameFile):
    # NOTE : INSERTAMOS LOS DATOS EN LA BASE DE DATOS
    destino = ''
    oldname = '';
    if(typeFile == 'image'):
        destino = 'sari'
    elif(typeFile == 'audio'):
        destino = 'sara'
    elif(typeFile == 'video'):
        destino = 'sarv'
    elif(typeFile in ['rar', 'file']):
        destino = 'sarda'
        oldname = nameFile
    insert_file = sar(name_file=file_name, code=code_file, code_destino=code_destino, extension=extension, destino=destino, tipo=typeFile, old_name=oldname)
    insert_file.save()

    return insert_file

from pathlib import Path
def show_information(request):
    if request.method == 'POST':
        typeFile = request.POST.get('type')
       
        info = validStack(typeFile);

        return JsonResponse({"info": info})
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)
    
def validStack(typeFile):
    print("GOMI", typeFile)
    result = None
    for i in range(10):
        destination = f'Stack_n{i+1}'

        path_folder = ''
        if(typeFile == 'image'):
            path_folder = f'APP_SAR/media/SARI/{destination}'
        elif(typeFile == 'audio'):
            path_folder = f'APP_SAR/media/SARA/{destination}'
        elif(typeFile == 'video'):
            path_folder = f'APP_SAR/media/SARV/{destination}'
        elif(typeFile == 'rar'):
            path_folder = f'APP_SAR/media/SARDA/{destination}'
        elif(typeFile == 'file'):
            path_folder = f'APP_SAR/media/SARDA/{destination}'
             

        ruta = Path(path_folder)
        file_count = len(list(ruta.glob('*')))
        
        if (file_count < 500):
            space_file = 500 - file_count
            result = {"num_stack": i+1, "file_count": file_count, "space_file": space_file}
            break

    return result