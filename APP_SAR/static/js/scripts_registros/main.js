import { ventanaView } from './views.js';
import { ObtainDataTablet } from './ApiService.js';


document.getElementById('seleccion_tipo').addEventListener('change', function(){
    var tipo = document.getElementById('seleccion_tipo').value;
    console.log(tipo);
    ObtainDataTablet(tipo);
});

document.addEventListener('DOMContentLoaded', function() {
    const buttons_R = document.querySelectorAll('.registros_select');

    buttons_R.forEach(function(button) {
        button.addEventListener('click', function(e) {
            let name_file = e.target.parentElement.children[0].textContent;
            let code = e.target.parentElement.children[1].textContent;
            let code_destino = e.target.parentElement.children[2].textContent;
            let extension = e.target.parentElement.children[3].textContent;
            let tipo = e.target.parentElement.children[4].textContent;

            show_dile(name_file, code, code_destino, extension, tipo);
            });
    });
});

function show_dile(name_file, code, code_destino, extension, tipo) {
    document.getElementById('cont_ventana_view').innerHTML = ventanaView(name_file, tipo);
    NuevosEventos();
}


function NuevosEventos() {
    function setupListeners() {
        document.getElementById('btn_copy_close_view').addEventListener('click', function(e) {
            let insert_code = document.getElementById('text_insercion_cedema_view').value.trim();
            window.navigator.clipboard.writeText(insert_code);
            window.location.href = 'http://localhost:7000/registros/';
        });
        
        document.getElementById('btn_close_view').addEventListener('click', function(e) {
            window.location.href = 'http://localhost:7000/registros/';
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupListeners);
    } else {
        setupListeners();
    }
}

