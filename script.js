const $botonIniciar = document.querySelector('#boton-iniciar');
const $verde = document.querySelector('#verde');
const $rojo = document.querySelector('#rojo');
const $amarillo = document.querySelector('#amarillo');
const $azul = document.querySelector('#azul');
const $nivel = document.querySelector('#nivel');


$botonIniciar.addEventListener('click', () => {
    console.log(numeroAleatorio());
    SecuenciaInicial();
});

const Colores = [$verde, $rojo, $amarillo, $azul];

let secuenciaHumano = [];
let secuenciaMaquina = [];
let nivel = 0;

const numeroAleatorio = function (){
    const $numeroAleatorio = Math.floor(Math.random() * (Colores.length));
    return $numeroAleatorio;
};










