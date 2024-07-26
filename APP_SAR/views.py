from django.shortcuts import render

# Create your views here.
def home(request):
    print('Hola desde el view')
    return render(request, 'home.html')

def files(request):
    return render(request, 'files.html')

def folders(request):
    return render(request, 'folders.html')