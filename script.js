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

const iniciarJuego = function() {
    juegoActivo = true;
    secuenciaHumano = [];
    secuenciaMaquina = [];
    nivel = 1;
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
    actualizarTurno('Turno de la maquina');
    secuenciaHumano = [];
    bloquearBotones();
    actualizarNivel();

    const numeroAleatorio = Math.floor(Math.random() * (colores.length));
    secuenciaMaquina.push(numeroAleatorio);
    if(juegoActivo){
        console.log('Secuencia de la maquina: ')  
        console.log(secuenciaMaquina);
        mostrarSecuencia();
        bloquearBotones();
    }

    const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000;
    setTimeout(() => {
        actualizarTurno('Turno del jugador');
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
        color.onclick = () => { // Línea modificada
            const colorSeleccionado = colores.indexOf(color); // Línea añadida
            color.classList.add('flash');
            setTimeout(() => {
                color.classList.remove('flash');
            }, 500);
            secuenciaHumano.push(colorSeleccionado);
            console.log('Secuencia del jugador: ')
            console.log(secuenciaHumano);
            verificarSecuencia(); // Línea añadida
        };
    });
};

const verificarSecuencia = function () {
    for (let i = 0; i < secuenciaHumano.length; i++) {
        if (secuenciaHumano[i] !== secuenciaMaquina[i]) {
            bloquearBotones();
            actualizarTurno('Perdiste!');
            secuenciaHumano = [];
            secuenciaMaquina = [];
            juegoActivo = false;
            return;
        }
    }

    if (secuenciaHumano.length === secuenciaMaquina.length) {
        bloquearBotones();
        secuenciaHumano = [];
        setTimeout(secuenciaRonda, 1000);
    }
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