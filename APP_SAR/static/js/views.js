export function ventanaView(name_file, tipo) {
    let html = `
    <div id="message_dialog_view" class="organism_cont_dialog_message">
        <div class="molecule_dialog_message">
            <div class="viewFile">
                ${codeInser_view(name_file, tipo)[`html_view`]}
            </div>
            <h3>Codigo de insersion en Cedema</h3>
            <textarea name="" id="text_insercion_cedema_view" placeholder="code">
                ${codeInser_view(name_file, tipo)[`code_inner`]}
            </textarea>
            <div style="display: flex;">
                <button id="btn_copy_close_view">Copiar y Cerrar</button>
                <button id="btn_close_view">Cerrar</button>
            </div>
        </div>
    </div>
    `;
    return html;
}

function codeInser_view(name_file, tipo) {
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
    let img_codeInsert = "<div class='cedema_img'>\n<a href='"+path+"' target='_blank'>\n<img src='"+path+"'>\n</a>\n</div>";
    let audio_codeInsert = `FaltaHacer`;
    let video_codeInsert = `FaltaHacer`;
    let rar_codeInsert = `FaltaHacer`;


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