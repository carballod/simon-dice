const $botonIniciar = document.querySelector('#boton-iniciar');
const $verde = document.querySelector('#color-verde');
const $rojo = document.querySelector('#color-rojo');
const $amarillo = document.querySelector('#color-amarillo');
const $azul = document.querySelector('#color-azul');
const $nivel = document.querySelector('#nivel');
const colores = [$verde, $rojo, $amarillo, $azul];


const iniciarJuego = function() {
    juegoActivo = true;
    nivel = 1;
    $nivel.classList.remove('oculto');
    $botonIniciar.classList.add('oculto');
    secuenciaRonda();
    secuenciaJugador();
    interval = setInterval(compararSecuencia, 500 * (secuenciaMaquina.length + 1) + 500);
};

let secuenciaHumano = [];
let secuenciaMaquina = [];
let nivel = 1;
let interval;
let juegoActivo = false;
$botonIniciar.classList.remove('oculto')

const secuenciaRonda = function (){
    const numeroAleatorio = Math.floor(Math.random() * (colores.length));
    secuenciaMaquina.push(numeroAleatorio);
    $nivel.innerHTML = `Nivel: ${nivel}`;
    nivel++;

    if(juegoActivo){
        console.log(secuenciaMaquina);
        mostrarSecuencia();
    }
};

const mostrarSecuencia = function (){
    for (let i = 0; i < secuenciaMaquina.length; i++){
        const color = colores[secuenciaMaquina[i]];
        setTimeout(() => {
            color.classList.add('flash');
            setTimeout(() => {
                color.classList.remove('flash');
            }, 500);
        }, 1200 * (i + 1));
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
            nivel = 0;
            juegoActivo = false;
            $nivel.classList.add('oculto');
            $botonIniciar.classList.remove('oculto');
            clearInterval(interval);
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



$botonIniciar.addEventListener('click', iniciarJuego);