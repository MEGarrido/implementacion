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

const equipos = [
    { img: 'imagenes/9z-team.png', nombre: '9Z TEAM', desc: 'Equipo <span class= "resaltado-verde">argentino</span>. Con garra,  estilo de juego agresivo y la capacidad de sorprender a los grandes.', pais: '' },
    { img: 'imagenes/exolos-team.png', nombre: 'EXOLOS TEAM', desc: 'Equipo <span class="resaltado-verde">mexicano</span>. Tipo de juego competitivo apasionado por el juego táctico y el trabajo en equipo.' },
    { img: 'imagenes/kru-team.png', nombre: 'KRÜ TEAM', desc: 'Equipo <span class="resaltado-verde">argentino</span>. Proveniente de la organización fundada por Agüero y Messi. Referente internacional de la región.'},
    { img: 'imagenes/leviatan-team.png', nombre: 'LEVIATAN TEAM', desc: 'Equipo <span class="resaltado-verde">argentino</span>. El dragón que domina el VCT Américas. Buscamos el liderazgo regional en cada competencia global.', pais: '' },
    { img: 'imagenes/reta-team.png', nombre: 'RETA TEAM', desc: 'Equipo <span class="resaltado-verde">mexicano</span>. Busca ser el referente del norte de la región, destacando por su agresividad y talento joven.', pais: '' },
    { img: 'imagenes/allknights-team.png', nombre: 'ALLKNIGHTS', desc: 'Equipo <span class="resaltado-verde">argentino</span>. Un competidor sólido y táctico que siempre busca un lugar en las ligas principales.', pais: '' },
];

let indiceActual = 1;

function renderCarrusel() {
    const track = document.querySelector('.carrusel-track');
    const dots = document.querySelectorAll('.dot');
    const total = equipos.length;

    const prev = (indiceActual - 1 + total) % total;
    const next = (indiceActual + 1) % total;

   track.innerHTML = `
    <div class="tarjeta-equipo lateral" onclick="irA(${prev})">
        <img src="${equipos[prev].img}" alt="${equipos[prev].nombre}">
        <div class="tarjeta-nombre">${equipos[prev].nombre}</div>
    </div>
    <div class="tarjeta-equipo central">
        <img src="${equipos[indiceActual].img}" alt="${equipos[indiceActual].nombre}">
        <div class="tarjeta-nombre activo">${equipos[indiceActual].nombre}</div>
        <div class="tarjeta-desc"><p>${equipos[indiceActual].desc}</p></div>
    </div>
    <div class="tarjeta-equipo lateral" onclick="irA(${next})">
        <img src="${equipos[next].img}" alt="${equipos[next].nombre}">
        <div class="tarjeta-nombre">${equipos[next].nombre}</div>
    </div>
`;

    dots.forEach((dot, i) => {
        dot.classList.toggle('activo', i === indiceActual);
        dot.onclick = () => irA(i);
    });
}

function irA(i) {
    indiceActual = i;
    renderCarrusel();
}

document.querySelector('.carrusel-flecha.izquierda').addEventListener('click', () => {
    indiceActual = (indiceActual - 1 + equipos.length) % equipos.length;
    renderCarrusel();
});

document.querySelector('.carrusel-flecha.derecha').addEventListener('click', () => {
    indiceActual = (indiceActual + 1) % equipos.length;
    renderCarrusel();
});

renderCarrusel();

const track = document.querySelector('.carrusel-track');
let startX = 0;

track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            indiceActual = (indiceActual + 1) % equipos.length;
        } else {
            indiceActual = (indiceActual - 1 + equipos.length) % equipos.length;
        }
        renderCarrusel();
    }
});
