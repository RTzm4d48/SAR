from django.shortcuts import render
from APP_SAR.models import sari, sara, sarda, sarv

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
    modelo1 = list(sari.objects.all().values('name_file', 'code', 'code_destino', 'extension', 'id', 'tipo'))[::-1]

    # print(todos_los_registros)
    data_json = json.dumps(modelo1)

    return render(request, 'registros.html', {'data': data_json})

@csrf_exempt
def obtain_data(request):
    if request.method == 'POST':
        type_file = request.POST.get('type_file')

        if(type_file == 'sari'):
            modelo1 = list(sari.objects.all().values('name_file', 'code', 'code_destino', 'extension', 'id', 'tipo'))[::-1]
        elif(type_file == 'sara'):
            modelo1 = list(sara.objects.all().values('name_file', 'code', 'code_destino', 'extension', 'id', 'tipo'))[::-1]
        elif(type_file == 'sarda'):
            modelo1 = list(sarda.objects.all().values('name_file', 'code', 'code_destino', 'extension', 'id', 'tipo'))[::-1]
        elif(type_file == 'sarv'):
            modelo1 = list(sarv.objects.all().values('name_file', 'code', 'code_destino', 'extension', 'id', 'tipo'))[::-1]

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
        code_destino = request.POST.get('code_destino')
        extension = request.POST.get('extension')

        finalPath = write_file(name_file, myfile, typeFile, destination)

        insert_dataBase(finalPath, typeFile, code_file, code_destino, extension)

        response_data = {'FinalPath': finalPath, "typeFile": typeFile, "destination": destination}
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


def insert_dataBase(file_name, typeFile, code_file, code_destino, extension):
    # NOTE : INSERTAMOS LOS DATOS EN LA BASE DE DATOS
    if(typeFile == 'image'):
        insert_file = sari(name_file=file_name, code=code_file, code_destino=code_destino, extension=extension, tipo='sari')
    elif(typeFile == 'audio'):
        insert_file = sara(name_file=file_name, code=code_file, code_destino=code_destino, extension=extension, tipo='sara')
    elif(typeFile == 'video'):
        insert_file = sarv(name_file=file_name, code=code_file, code_destino=code_destino, extension=extension, tipo='sarv')
    elif(typeFile == 'rar'):
        insert_file = sarda(name_file=file_name, code=code_file, code_destino=code_destino, extension=extension, tipo='sarda')
    insert_file.save()
