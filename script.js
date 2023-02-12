const $botonIniciar = document.querySelector('#boton-iniciar');
const $verde = document.querySelector('#color-verde');
const $rojo = document.querySelector('#color-rojo');
const $amarillo = document.querySelector('#color-amarillo');
const $azul = document.querySelector('#color-azul');
const $nivel = document.querySelector('#nivel');
const colores = [$verde, $rojo, $amarillo, $azul];


$botonIniciar.addEventListener('click', () => {
    secuencia()
});

let secuenciaHumano = [];
let secuenciaMaquina = [];
let nivel = 0;
let secuenciaHumanoCompleta = true;

const secuencia = function (){
    const $numeroAleatorio = Math.floor(Math.random() * (colores.length));

    secuenciaMaquina.push($numeroAleatorio);
    nivel++;
    $nivel.innerHTML = `Nivel: ${nivel}`;

    console.log(secuenciaMaquina);
    mostrarSecuencia();
    copiarSecuencia()
    compararSecuencia()
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

