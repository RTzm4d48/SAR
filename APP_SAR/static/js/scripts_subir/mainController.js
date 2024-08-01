import { date, code_file } from '../utils.js';

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
    return selectedValue;
}

export function paint_file(reader) {
    reader.onload = function(e) {
        let type = valid_extension_file()['type'];

        let img_html_view = `<img src="${e.target.result}" alt="Vista previa de la imagen">`;
        let audio_html_view = `<audio controls>
            <source src="${e.target.result}" type="audio/mpeg">
            Tu navegador no soporta el elemento de audio.
        </audio>`;
        let video_html_view = `<video width="320" height="240" controls>
            <source src="${e.target.result}" type="video/mp4">
            Tu navegador no soporta el elemento de video.
        </video>`;
        let rar_html_view = `<img src="/static/img/rar_icon.png" style="height: 30%; margin: auto;">`;


        if (type == 'image') {
            document.getElementById('view').innerHTML = img_html_view;
        }else if (type == 'audio') {
            document.getElementById('view').innerHTML = audio_html_view;
        }else if (type == 'video') {
            document.getElementById('view').innerHTML = video_html_view;
        }else if (type == 'rar') {
            document.getElementById('view').innerHTML = rar_html_view;
        }
        
    };
}

export function preparation_file() {
    const code_moduel = document.getElementById('code_moduel').value;
    let text = '';
    
    let type = valid_extension_file()['type'];
    let extension = '.'+valid_extension_file()['extension'];
    
    let fileCode = code_file();
    
    let fileName  = `${code_moduel}-${fileCode}-${date()}-GO6${extension}`;

    if(type == 'image') {
        text = `El archivo se subira al servidor de <span>SARI</span> correspondiente a archivos de <span>imagen</span> con referencia al modulo <span>${code_moduel}</span><br>
        nombre: <span>${fileName}</span>`;
    }else if (type == 'audio') {
        text = `El archivo se subira al servidor de <span>SARI</span> correspondiente a archivos de <span>audio</span> con referencia al modulo <span>${code_moduel}</span><br>
        nombre: <span>${fileName}</span>`;
    }else if (type == 'video') {
        text = `El archivo se subira al servidor de <span>SARV</span> correspondiente a archivos de <span>video</span> con referencia al modulo <span>${code_moduel}</span><br>
        nombre: <span>${fileName}</span>`;
    }else if (type == 'rar') {
        text = `El archivo se subira al servidor de <span>SARDA</span> correspondiente a archivos de <span>.rar</span> con referencia al modulo <span>${code_moduel}</span><br>
        nombre: <span>${fileName}</span>`;
    }
    document.getElementById('text_explication').innerHTML = text;
    return {fileCode, fileName, extension};
}


export function valid_extension_file() {
    const fileInput = document.getElementById('select_file');
    var file = fileInput.files[0];

    var fileName = file.name;
    var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    
    if (file) {
        var fileType = file.type;

        if (fileType.startsWith('image/')) {
            return {"type": 'image', "extension": fileExtension};
        } else if (fileType.startsWith('audio/')) {
            return {"type": 'audio', "extension": fileExtension};
        } else if (fileType.startsWith('video/')) {
            return {"type": 'video', "extension": fileExtension};
        } else if (fileType.startsWith('application/')) {
            return {"type": 'rar', "extension": fileExtension};
        } else {
            console.log('Tipo de archivo no soportado');
            return 'no soport';
        }
    } else {
        console.log('No hay archivo seleccionado');
        return 'no file';
    }
}