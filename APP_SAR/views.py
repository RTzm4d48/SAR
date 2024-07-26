from django.shortcuts import render
from APP_SAR.models import image, audio

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


from PIL import Image
import io
import base64

# Create your views here.
def home(request):
    print('Hola desde el view')
    return render(request, 'home.html')

def files(request):
    return render(request, 'files.html')

def folders(request):
    return render(request, 'folders.html')

def images(request):
    return render(request, 'images.html')

@csrf_exempt
def procesar_nombre(request):
    if request.method == 'POST':
        name_file = request.POST.get('name_file')
        myfile = request.FILES.get('myfile', '')
        typeFile = request.POST.get('tipeFile', '')
        destination = request.POST.get('destination', '')

        finalPath = write_file(name_file, myfile, typeFile, destination)

        response_data = {'FinalPath': finalPath}
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
        
        with open(f'APP_SAR/{path_file}', 'wb') as f:
            for chunk in imgcapture.chunks():
                f.write(chunk)
        return path_file
