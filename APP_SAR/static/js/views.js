export function ventanaView(name_file, tipo, old_name) {
    let html = `
    <div id="message_dialog_view" class="organism_cont_dialog_message">
        <div class="molecule_dialog_message">
            <div class="viewFile">
                ${codeInser_view(name_file, tipo, old_name)[`html_view`]}
            </div>
            <h3>Codigo de insersion en Cedema</h3>
            <textarea name="" id="text_insercion_cedema_view" placeholder="code">${codeInser_view(name_file, tipo, old_name)[`code_inner`]}</textarea>
            <div style="display: flex;">
                <button id="btn_copy_close_view">Copiar y Cerrar</button>
                <button id="btn_close_view">Cerrar</button>
            </div>
        </div>
    </div>
    `;
    return html;
}

function codeInser_view(name_file, tipo, old_name) {
    let img_html_view = `<img src="/${name_file}" alt="Vista previa de la imagen">`;
    let audio_html_view = `<audio controls>
        <source src="/${name_file}" type="audio/mpeg">
        Tu navegador no soporta el elemento de audio.
    </audio>`;
    let video_html_view = `<video width="320" height="240" controls>
        <source src="/${name_file}" type="video/mp4">
        Tu navegador no soporta el elemento de video.
    </video>`;
    let rar_html_view = `<img src="/static/img/rar_icon.png" style="height: 30%; margin: auto;">`;
    let file_html_view = `<img src="/static/img/file_icon.png" style="height: 30%; margin: auto;">`;

    // NOTE : CODE INSERT
    let path = `http://localhost:7000/${name_file}`;
    let img_codeInsert = '';
    let audio_codeInsert = '';
    let video_codeInsert = '';
    let rar_codeInsert = '';
    let file_codeInsert = '';

    img_codeInsert = "<div class='cedema_img'>\n    <a href='"+path+"' target='_blank'>\n        <img src='"+path+"'>\n    </a>\n</div>";
    audio_codeInsert = `<div class="cedema_audio">\n    <audio class="audioPlayer" controls>\n        <source src="${path}" type="audio/mp3">\n    </audio>\n</div>`;
    video_codeInsert = `<div class="cedema_video">\n    <section>\n        <video class="videoPlayer" playsinline controls>\n            <source src="${path}" type="video/mp4"/>\n        </video>\n    </section>\n</div>`;       
    rar_codeInsert = `<div class="cedema_rar">\n    <img src="http://localhost:7000/media/SARI/Stack_n1/rar-krjv-2_Ago_2024-GO6.png">\n    <a href='${path}'>${old_name}</a>\n</div>`;
    file_codeInsert = `<div class="cedema_file">\n    <img src="http://localhost:7000/media/SARI/Stack_n1/file-kbjb-6_Sep_2024-GO6.png">\n    <a target="_blank" href='${path}'>${old_name}</a>\n</div>`;

    if (tipo == 'image') {
        return {"html_view": img_html_view, "code_inner": img_codeInsert};
    }else if (tipo == 'audio') {
        return {"html_view": audio_html_view, "code_inner": audio_codeInsert};
    }else if (tipo == 'video') {
        return {"html_view": video_html_view, "code_inner": video_codeInsert};
    }else if (tipo == 'rar') {
        return {"html_view": rar_html_view, "code_inner": rar_codeInsert};
    }else if (tipo == 'file') {
        return {"html_view": file_html_view, "code_inner": file_codeInsert};
    }
}

export function NuevosEventos() {
    function setupListeners() {
        document.getElementById('btn_copy_close_view').addEventListener('click', function(e) {
            let insert_code = document.getElementById('text_insercion_cedema_view').value.trim();
            window.navigator.clipboard.writeText(insert_code);
            // window.location.href = 'http://localhost:7000/registros/';
            location.reload();
        });
        
        document.getElementById('btn_close_view').addEventListener('click', function(e) {
            // window.location.href = 'http://localhost:7000/registros/';
            location.reload();
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupListeners);
    } else {
        setupListeners();
    }
}


export function NuevosEventos2() {
    function setupListeners() {
        document.getElementById('btn_copy_close_view').addEventListener('click', function(e) {
            let insert_code = document.getElementById('text_insercion_cedema_view').value.trim();
            window.navigator.clipboard.writeText(insert_code);
            document.getElementById('cont_ventana_view').innerHTML = '';
        });
        
        document.getElementById('btn_close_view').addEventListener('click', function(e) {
            document.getElementById('cont_ventana_view').innerHTML = '';
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupListeners);
    } else {
        setupListeners();
    }
}