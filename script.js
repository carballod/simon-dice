const $botonIniciar = document.querySelector('#boton-iniciar');
const $verde = document.querySelector('#color-verde');
const $rojo = document.querySelector('#color-rojo');
const $amarillo = document.querySelector('#color-amarillo');
const $azul = document.querySelector('#color-azul');
const $nivel = document.querySelector('#nivel');


$botonIniciar.addEventListener('click', () => {
    console.log(Secuencia());
});

const Colores = [$verde, $rojo, $amarillo, $azul];

let secuenciaHumano = [];
let secuenciaMaquina = [];
let nivel = 0;

const numeroAleatorio = function (){
    const $numeroAleatorio = Math.floor(Math.random() * (Colores.length));
    return $numeroAleatorio;
};

const Secuencia = function (){
    secuenciaMaquina.push(numeroAleatorio());
    return secuenciaMaquina;
};








