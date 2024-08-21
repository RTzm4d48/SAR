import { date, code_file } from '../utils.js';
import { info_destino_stack } from './ApiService.js';

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
    const code_moduel = document.getElementById('code_moduel').value != '' ? document.getElementById('code_moduel').value : 'nope';
    let text = '';
    
    let type = valid_extension_file()['type'];
    let extension = '.'+valid_extension_file()['extension'];
    
    let fileCode = code_file();

    let stack_destino = document.getElementById('stack_destino').innerText;
    
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
    return {fileCode, fileName, extension, stack_destino};
}

export async function destino_stack() {
    let type = valid_extension_file()['type'];

    let data = await info_destino_stack(type);
    let stack_destino = 'Stack_n'+data['num_stack'];

    let info_destino = document.getElementById('info_destino');
    let htmlinner = `
        <p>Carpeta Destino:</p>
        <p><span>${stack_destino}:</span> ${data['file_count']}, <span>Espacio:</span> ${data['space_file']}</p>
        <p><span>Destino:</span> <span class="destino" id="stack_destino">${stack_destino}</span></p>
    `;

    info_destino.innerHTML = '';
    info_destino.innerHTML = htmlinner;
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