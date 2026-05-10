document.fonts.ready.then(() => {
    posicionarAsteriscos();
});

function posicionarAsteriscos() {
    const campos = document.querySelectorAll('.campo-formulario');
    campos.forEach(campo => {
        const input = campo.querySelector('input');
        const asterisco = campo.querySelector('.asterisco');
        if (!input || !asterisco) return;

        const medidor = document.createElement('span');
        medidor.textContent = input.placeholder;
        medidor.style.cssText = `
            position: absolute;
            top: -9999px;
            left: -9999px;
            white-space: nowrap;
            font-family: "Orbitron Bold", sans-serif;
            font-size: 30px;
            font-weight: bold;
            letter-spacing: 1px;
            box-sizing: content-box;
            padding: 0;
            margin: 0;
            border: none;
            visibility: hidden;
        `;
        document.body.appendChild(medidor);
        const ancho = medidor.getBoundingClientRect().width;
        document.body.removeChild(medidor);
        asterisco.style.left = (ancho + 6) + 'px';
    });
}

window.addEventListener('resize', posicionarAsteriscos);

// Ocultar * al escribir
document.querySelectorAll('.campo-formulario input').forEach(input => {
    const asterisco = input.parentElement.querySelector('.asterisco');
    if (!asterisco) return;
    input.addEventListener('input', () => {
        asterisco.style.opacity = input.value ? '0' : '0.5';
    });
});

// Funciones para abrir y cerrar modales
function abrirModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = 'flex';

    modal.onclick = function(e) {
        if (e.target === modal) {
            cerrarModal(id);
        }
    };
}

function cerrarModal(id) {
    document.getElementById(id).style.display = 'none';
    if (id === 'modal-exito') {
        document.getElementById('registro-form').reset();
    }
}

// Submit
document.getElementById('registro-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const documento = document.getElementById('documento').value.trim();

    const docNumero = parseInt(documento.replace(/\./g, '').replace(/,/g, ''));
    const camposVacios = !nombre || !email || !documento;
    const docInvalido = !isNaN(docNumero) && docNumero >= 55000000;

    if (camposVacios || docInvalido) {
        abrirModal('modal-negativo');
        return;
    }

    document.getElementById('modal-gracias').textContent = '¡GRACIAS ' + nombre.toUpperCase() + '!';
abrirModal('modal-exito');
});