import { preparation_file, valid_extension_file } from './mainController.js';
import { getCookie } from '/static/js/utils.js';
import { show_dile } from '/static/js/views.js';

export function UploadFileInDataBase(file) {
    const formData = new FormData();

    let data_prepare = preparation_file();
    // console.log("file codigo", data_prepare['fileCode'])
    // console.log("file name", data_prepare['fileName'])

    formData.append('name_file', data_prepare['fileName']);
    formData.append('myfile', file);
    formData.append('tipeFile', valid_extension_file()['type']);
    formData.append('destination', document.getElementById('seleccion').value);
    formData.append('code_file', data_prepare['fileCode']);
    formData.append('destino', document.getElementById('seleccion').value);
    formData.append('code_destino', document.getElementById('code_moduel').value);
    formData.append('extension', data_prepare['extension']);

    fetch('/uploadFile/', {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        show_dile(data['name_file'], data['code'], data['code_destino'], data['extension'], data['tipo'], data['destino'])
    })
    .catch(error => console.error('Error:', error));
}