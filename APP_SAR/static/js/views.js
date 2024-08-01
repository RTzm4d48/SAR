export function show_dile(name_file, code, code_destino, extension, tipo, destino) {
    document.getElementById('cont_ventana_view').innerHTML = ventanaView(name_file, tipo, destino);
    NuevosEventos();
}

export function ventanaView(name_file, tipo, destino) {
    let html = `
    <div id="message_dialog_view" class="organism_cont_dialog_message">
        <div class="molecule_dialog_message">
            <div class="viewFile">
                ${codeInser_view(name_file, tipo, destino)[`html_view`]}
            </div>
            <h3>Codigo de insersion en Cedema</h3>
            <textarea name="" id="text_insercion_cedema_view" placeholder="code">${codeInser_view(name_file, tipo, destino)[`code_inner`]}</textarea>
            <div style="display: flex;">
                <button id="btn_copy_close_view">Copiar y Cerrar</button>
                <button id="btn_close_view">Cerrar</button>
            </div>
        </div>
    </div>
    `;
    return html;
}

function codeInser_view(name_file, tipo, destino) {
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

    // NOTE : CODE INSERT
    let path = `http://localhost:7000/${name_file}`;
    let img_codeInsert = '';
    let audio_codeInsert = '';
    let video_codeInsert = '';
    let rar_codeInsert = '';

    if (destino == 'cedema') {
        img_codeInsert = "<div class='cedema_img'>\n<a href='"+path+"' target='_blank'>\n<img src='"+path+"'>\n</a>\n</div>";
        audio_codeInsert = `
        <div>
            <audio controls>
            <source src="${path}" type="audio/mp3">
            </audio>
        </div>
        `;
        video_codeInsert = `
        <div>
            <video controls>
            <source src="${path}" type="video/mp4">
            </video>
        </div>
        `;
        rar_codeInsert = `
        <div>
        <img style="height:300px" src="${path}">
        </div>
        `;
    }else if (destino == 'otros') {
        img_codeInsert = path;
        audio_codeInsert = path;
        video_codeInsert = path;
        rar_codeInsert = path;
    }


    if (tipo == 'sari') {
        return {"html_view": img_html_view, "code_inner": img_codeInsert};
    }else if (tipo == 'sara') {
        return {"html_view": audio_html_view, "code_inner": audio_codeInsert};
    }else if (tipo == 'sarv') {
        return {"html_view": video_html_view, "code_inner": video_codeInsert};
    }else if (tipo == 'sarda') {
        return {"html_view": rar_html_view, "code_inner": rar_codeInsert};
    }
}

function NuevosEventos() {
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