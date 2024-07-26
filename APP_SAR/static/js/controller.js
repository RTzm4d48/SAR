import { code_file, date } from './utils.js';

export function obtain_select() {
    var selectElement = document.getElementById('seleccion');
    var selectedValue = selectElement.value;

    if (selectedValue == 'otros') {
        document.getElementById('code_moduel').style.display = 'none';
        document.getElementById('code_moduel').value = 'Otros';
    }else if(selectedValue == 'cedema') {
        document.getElementById('code_moduel').style.display = 'block';
        document.getElementById('code_moduel').value = '';
    }
}

export function paint_file(reader) {
    reader.onload = function(e) {
        let html_view = '';

        let type = valid_extension_file()['type'];

        if (type == 'image') {
            html_view = `<img src="${e.target.result}" alt="Vista previa de la imagen">`;
        }else if (type == 'audio') {
            html_view = `<audio controls>
                <source src="${e.target.result}" type="audio/mpeg">
                Tu navegador no soporta el elemento de audio.
            </audio>`;
            
        }
        document.getElementById('view').innerHTML = html_view;
    };
}

export function preparation_file() {
    const code_moduel = document.getElementById('code_moduel').value;
    let text = '';

    window.fine_name = `${code_moduel}-${code_file()}-${date()}-GO6`;

    let type = valid_extension_file()['type'];
    let extension = valid_extension_file()['extension'];

    if(type == 'image') {
        text = `El archivo se subira al servidor de <span>SARI</span> correspondiente a archivos de <span>imagen</span> con referencia al modulo <span>${code_moduel}</span><br>
        nombre: <span>${fine_name}.${extension}</span>`;
    }else if (type == 'audio') {
        text = `El archivo se subira al servidor de <span>SARI</span> correspondiente a archivos de <span>audio</span> con referencia al modulo <span>${code_moduel}</span><br>
        nombre: <span>${fine_name}.${extension}</span>`;
    }

    document.getElementById('text_explication').innerHTML = text;
}


function valid_extension_file() {
    const fileInput = document.getElementById('select_file');
    var file = fileInput.files[0];

    var fileName = file.name;
    var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    
    if (file) {
        var fileType = file.type;
        // console.log('Tipo de archivo: ' + fileType);
        
        if (fileType.startsWith('image/')) {
            return {"type": 'image', "extension": fileExtension};
        } else if (fileType.startsWith('audio/')) {
            return {"type": 'audio', "extension": fileExtension};
        } else {
            console.log('Tipo de archivo no soportado');
            return 'no soport';
        }
    } else {
        console.log('No hay archivo seleccionado');
        return 'no file';
    }
}