// ANCHOR : EL RADIO BUTTONS DE ELECCION
function chanelTipeFile(event) {
    if (event.target.checked) {
        window.MiOpcion = event.target.value;
        const dominio = 'https://cedema777m4d.sytes.net:8090';
        //const dominio = 'http://localhost:7000';
        if (event.target.value == "registros") {
            window.location.href = dominio+'/registros/';
        } else {
            window.location.href = dominio+'/subir/';
        }
    }
}

let nombre = document.getElementsByName('tipe_file');
for (const n of nombre) {
    n.addEventListener('change', chanelTipeFile);
}
