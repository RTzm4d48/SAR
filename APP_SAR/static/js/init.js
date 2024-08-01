// ANCHOR : EL RADIO BUTTONS DE ELECCION
function chanelTipeFile(event) {
    if (event.target.checked) {
        window.MiOpcion = event.target.value;
        if (event.target.value == "registros") {
            window.location.href = 'http://localhost:7000/registros/';
        } else {
            window.location.href = 'http://localhost:7000/subir/';
        }
    }
}

let nombre = document.getElementsByName('tipe_file');
for (const n of nombre) {
    n.addEventListener('change', chanelTipeFile);
}
