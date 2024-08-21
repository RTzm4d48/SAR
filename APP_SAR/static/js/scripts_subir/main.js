import { preparation_file, paint_file, destino_stack } from './mainController.js';
import { UploadFileInDataBase } from './ApiService.js'

// NOTE : EVENTOS
document.getElementById('select_file').addEventListener('change', async function(event){
    var file = event.target.files[0];
    var reader = new FileReader();
    if (file) {
        await destino_stack();
        paint_file(reader);
        preparation_file();
        reader.readAsDataURL(file);
    } else {
        console.log('No hay archivo seleccionado');
    }
});

document.getElementById('code_moduel').addEventListener('input', function(event) {
    preparation_file();
});

document.getElementById('bt_send').addEventListener('click', function(event){        
    const fileInput = document.getElementById('select_file');
    let file = fileInput.files[0];
    let code_destino = document.getElementById('code_moduel').value;
    if (code_destino == '') {
        alert('Ingrese el código destino');
    }else {
        UploadFileInDataBase(file);
    }
});