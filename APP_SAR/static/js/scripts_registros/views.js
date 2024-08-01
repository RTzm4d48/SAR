import { show_dile } from '/static/js/views.js';

export function renderisarTabla(data) {
    document.getElementById('contRegister').innerHTML = "";
    document.getElementById('contRegister').innerHTML = `
    <table id="table_register">
            <tr>
                <th>Name File</th>
                <th>Code</th>
                <th>Code Destino</th>
                <th>Extensión</th>
                <th>Tipo</th>
                <th>Destino</th>
            </tr>
            ${html_table_register(data)}
        </table>
    `;
    NuevosEventos_tabla();
}

function html_table_register(data) {
    let html = ``;
    for (let i = 0; i < data.length; i++) {
        html += `
            <tr class="registros_select">
                <td>${data[i].name_file}</td>
                <td>${data[i].code}</td>
                <td>${data[i].code_destino}</td>
                <td>${data[i].extension}</td>
                <td>${data[i].tipo}</td>
                <td>${data[i].destino}</td>
            </tr>
        `;
    }
    return html;
}

function NuevosEventos_tabla() {
    function setupListeners() {
        const row_register = document.querySelectorAll('.registros_select');

        row_register.forEach(function(button) {
            button.addEventListener('click', function(e) {
                let name_file = e.target.parentElement.children[0].textContent;
                let code = e.target.parentElement.children[1].textContent;
                let code_destino = e.target.parentElement.children[2].textContent;
                let extension = e.target.parentElement.children[3].textContent;
                let tipo = e.target.parentElement.children[4].textContent;
                let destino = e.target.parentElement.children[5].textContent;

                show_dile(name_file, code, code_destino, extension, tipo, destino);
                });
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupListeners);
    } else {
        setupListeners();
    }
}