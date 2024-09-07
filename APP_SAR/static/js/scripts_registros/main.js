import { ObtainDataTablet } from './ApiService.js';

document.getElementById('seleccion_tipo').addEventListener('change', function(){
    var tipo = document.getElementById('seleccion_tipo').value;
    console.log(tipo);
    ObtainDataTablet(tipo);
});