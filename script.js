const $botonIniciar = document.querySelector('#boton-iniciar');
const $verde = document.querySelector('#color-verde');
const $rojo = document.querySelector('#color-rojo');
const $amarillo = document.querySelector('#color-amarillo');
const $azul = document.querySelector('#color-azul');
const $nivel = document.querySelector('#nivel');
const colores = [$verde, $rojo, $amarillo, $azul];


const iniciarJuego = function() {
    nivel = 1;
    secuenciaRonda();
    secuenciaJugador();
    interval = setInterval(compararSecuencia, 1000 * (secuenciaMaquina.length + 1) + 500);
};

let secuenciaHumano = [];
let secuenciaMaquina = [];
let nivel;
let interval;
$botonIniciar.classList.remove('oculto')

const actualizarNivel = function () {
    $nivel.innerHTML = `Nivel: ${nivel}`;
    nivel++;
};

const actualizarTurno = function (turno) {
    document.querySelector('#turno').innerHTML = turno;
};

const secuenciaRonda = function (){
    actualizarTurno('Turno de la maquina');
    bloquearBotones();
    actualizarNivel();

    const numeroAleatorio = Math.floor(Math.random() * (colores.length));
    secuenciaMaquina.push(numeroAleatorio);
    const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000;

    console.log(secuenciaMaquina);
    mostrarSecuencia();

    setTimeout(() => {
        actualizarTurno('Turno del jugador');
        desbloquearBotones();
    }, RETRASO_TURNO_JUGADOR);

    secuenciaHumano = [];
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
        color.addEventListener('click', (event) => {
            const colorSeleccionado = colores.indexOf(event.target);
            color.classList.add('flash');
            setTimeout(() => {
                color.classList.remove('flash');
            }, 500);
            secuenciaHumano.push(colorSeleccionado);
        });
    })
};

const compararSecuencia = function (){
    for (let i = 0; i < secuenciaHumano.length; i++) {
        if (secuenciaHumano[i] !== secuenciaMaquina[i]) {
            alert("Perdiste!");
            secuenciaHumano = [];
            secuenciaMaquina = [];
            nivel = 1;
            $nivel.classList.add('oculto');
            $botonIniciar.classList.remove('oculto');
            return;
        }
     }
    
    if (secuenciaHumano.length === secuenciaMaquina.length) {
        secuenciaHumano = [];
        setTimeout(() => {
            secuenciaRonda();
        }, 500);
    }
};

const bloquearBotones = function () {
    $botonIniciar.classList.add('oculto');
    $nivel.classList.remove('oculto');

    colores.forEach((color) => {
        color.onclick = function () {
            console.log('estas bloqueado');
        };
    });
};

const desbloquearBotones = function () {
};


$botonIniciar.addEventListener('click', iniciarJuego);