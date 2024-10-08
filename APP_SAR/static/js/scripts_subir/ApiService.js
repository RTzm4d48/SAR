import { preparation_file, valid_extension_file } from './mainController.js';
import { getCookie } from '/static/js/utils.js';
import { ventanaView, NuevosEventos } from '/static/js/views.js';


export function UploadFileInDataBase(file) {
    const formData = new FormData();

    let data_prepare = preparation_file();

    formData.append('name_file', data_prepare['fileName']);
    formData.append('myfile', file);
    formData.append('tipeFile', valid_extension_file()['type']);
    formData.append('nameFile', valid_extension_file()['filename']);
    formData.append('destination', data_prepare['stack_destino']);
    formData.append('code_file', data_prepare['fileCode']);
    formData.append('code_destino', document.getElementById('code_moduel').value);
    formData.append('extension', data_prepare['extension']);

    fetch('/upload_file/', {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        show_dile(data['name_file'], data['tipo'], data['old_name'])
    })
    .catch(error => console.error('Error:', error));
}

function show_dile(name_file, tipo, old_name) {
    document.getElementById('cont_ventana_view').innerHTML = ventanaView(name_file, tipo, old_name);
    NuevosEventos();
}

export async function info_destino_stack(type) {
    const formData = new FormData();
    formData.append('type', type);

    try {
        const response = await fetch('/show_information/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
        const data = await response.json();
        return data['info'];
    }catch (error){
        console.error("Ocurrio un error:", error);
    }
}
