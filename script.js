const $botonIniciar = document.querySelector('#boton-iniciar');
const $verde = document.querySelector('#color-verde');
const $rojo = document.querySelector('#color-rojo');
const $amarillo = document.querySelector('#color-amarillo');
const $azul = document.querySelector('#color-azul');
const $nivel = document.querySelector('#nivel');
const colores = [$verde, $rojo, $amarillo, $azul];

let secuenciaHumano = [];
let secuenciaMaquina = [];
let nivel = 0;
let juegoActivo = false;
$botonIniciar.classList.remove('oculto');

const iniciarJuego = function() {
    juegoActivo = true;
    secuenciaHumano = [];
    secuenciaMaquina = [];
    nivel = 1;
    $nivel.classList.remove('oculto');
    $botonIniciar.classList.add('oculto');
    secuenciaRonda();
    secuenciaJugador();
};

const actualizarNivel = function () {
    $nivel.innerHTML = `Nivel: ${nivel}`;
    nivel++;
};

const actualizarTurno = function (turno) {
    document.querySelector('#turno').innerHTML = turno;
};

const secuenciaRonda = function (){
    actualizarTurno('Memoriza la secuencia');
    secuenciaHumano = [];
    bloquearBotones();
    actualizarNivel();

    const numeroAleatorio = Math.floor(Math.random() * (colores.length));
    secuenciaMaquina.push(numeroAleatorio);
    if(juegoActivo){
        mostrarSecuencia();
        bloquearBotones();
    }

    const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000;
    setTimeout(() => {
        actualizarTurno('Es tu turno');
        desbloquearBotones();
    }, RETRASO_TURNO_JUGADOR);
};

const mostrarSecuencia = function (){
    for (let i = 0; i < secuenciaMaquina.length; i++){
        const color = colores[secuenciaMaquina[i]];
        const RETRASO_SECUENCIA = 1000 * (i + 1);
        setTimeout(() => {
            color.classList.add('flash');
            setTimeout(() => {
                color.classList.remove('flash');
            }, 500);
        }, RETRASO_SECUENCIA);
    }
};

const secuenciaJugador = function (){
    colores.forEach((color) => {
        color.onclick = () => {
            const colorSeleccionado = colores.indexOf(color);
            color.classList.add('flash');
            setTimeout(() => {
                color.classList.remove('flash');
            }, 500);
            secuenciaHumano.push(colorSeleccionado);
            compararSecuencias(); 
        };
    });
};

const compararSecuencias = function () {
    for (let i = 0; i < secuenciaHumano.length; i++) {
        if (secuenciaHumano[i] !== secuenciaMaquina[i]) {
            bloquearBotones();
            actualizarTurno('¡Perdiste!');
            perder();
            return;
        }
    }

    if (secuenciaHumano.length === secuenciaMaquina.length) {
        bloquearBotones();
        secuenciaHumano = [];
        setTimeout(secuenciaRonda, 1000);
    }
};

const perder = function () {
    secuenciaHumano = [];
    secuenciaMaquina = [];
    juegoActivo = false;
    $nivel.classList.add('oculto');
    $botonIniciar.classList.remove('oculto');
    $botonIniciar.innerText = 'Volver a jugar';
};

const bloquearBotones = function () {
    const cuadrados = document.querySelectorAll('.cuadrado');
    cuadrados.forEach((cuadrado) => {
        cuadrado.onclick = () => {};
    });
};

const desbloquearBotones = function () {
    const cuadrados = document.querySelectorAll('.cuadrado');
    cuadrados.forEach((cuadrado) => {
        cuadrado.onclick = () => {
            secuenciaJugador(cuadrado);
        }
    });
    secuenciaJugador();
};

$botonIniciar.addEventListener('click', iniciarJuego);