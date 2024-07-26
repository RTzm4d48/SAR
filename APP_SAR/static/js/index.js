import { preparation_file, paint_file, obtain_select } from './controller.js';

// ANCHOR : EL RADIO BUTTONS DE ELECCION
function chanelTipeFile(event) {
    if (event.target.checked) {
        window.MiOpcion = event.target.value;
        if (event.target.value == "folder") {
            window.location.href = 'http://localhost:5000/folders/';
        } else {
            window.location.href = 'http://localhost:5000/files/';
        }
    }
}

let nombre = document.getElementsByName('tipe_file');
for (const n of nombre) {
    n.addEventListener('change', chanelTipeFile);
}

// NOTE : EVENTOS
document.getElementById('select_file').addEventListener('change', function(event){
    var file = event.target.files[0];
    var reader = new FileReader();

    obtain_select();
    
    if (file) {
        paint_file(reader);
        preparation_file();
        reader.readAsDataURL(file);
    } else {
        console.log('No hay archivo seleccionado');
    }
});

document.getElementById('seleccion').addEventListener('change', function(e) {
    obtain_select();
    preparation_file();
});

document.getElementById('code_moduel').addEventListener('input', function(event) {
    console.log('Valor actual:', event.target.value);
    preparation_file();
});

document.getElementById('bt_send').addEventListener('click', function(event){
    console.log('Enviando...');
    
    // let type = valid_extension_file()['type'];
    // const code_moduel = document.getElementById('code_moduel').value;

});