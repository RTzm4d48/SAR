import { preparation_file, valid_extension_file } from './mainController.js';
import { getCookie } from './utils.js';

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
        codigo_de_insersion(data);
    })
    .catch(error => console.error('Error:', error));
}

function codigo_de_insersion(data){
    document.getElementById('message_dialog').style.display = 'flex';

    if (data['destination'] == 'cedema') {
        if (data['typeFile'] == 'image') {
            let path = `http://localhost:7000/${data['FinalPath']}`;
            let htmlinsert = "<div class='cedema_img'>\n<a href='"+path+"' target='_blank'>\n<img src='"+path+"'>\n</a>\n</div>";
            document.getElementById('text_insercion_cedema').value = htmlinsert;
        }else if (data['typeFile'] == 'audio') {
            document.getElementById('text_insercion_cedema').innerText = `
            <div>
            <audio controls>
            <source src="http://localhost:7000/${data['FinalPath']}" type="audio/mp3">
            </audio>
            </div>
            `;
        }else if (data['typeFile'] == 'video') {
            document.getElementById('text_insercion_cedema').innerText = `
            <div>
            <video controls>
            <source src="http://localhost:7000/${data['FinalPath']}" type="video/mp4">
            </video>
            </div>
            `;
        }else if (data['typeFile'] == 'rar') {
            document.getElementById('text_insercion_cedema').innerText = `
            <div>
            <img style="height:300px" src="http://localhost:7000/${data['FinalPath']}">
            </div>
            `;
        }
    }else if (data['destination'] == 'otros') {
        document.getElementById('text_insercion_cedema').innerText = `http://localhost:7000/${data['FinalPath']}`;
    }
}