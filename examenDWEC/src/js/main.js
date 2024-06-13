//VERSION BUENA

//Variables globales (etiquetas y demás)
const btnPedirCarta = document.getElementById("botonPedirCarta");
const btnEmpezar = document.getElementById("start");
const etqJugando = document.getElementById("jugando");
const etqResultado = document.getElementById("resultado");
const btnCerrar = document.getElementById("botonCerrarSesion");
const btnConsultar = document.getElementById("botonConsultar");
const etqUsuario = document.getElementById("usuario");
const etqPasswd = document.getElementById("passwd");
const etqSaludo = document.getElementById("saludo");


//variables
let numeros        = []; //90
let carton         = []; //24
let numero         = 0; //numero en juego
let cantidad       = 0; //cantidad de bolas sacadas
let bolasAcertadas = [];
let aciertos       = 0;

let jugadores;

btnEmpezar.setAttribute("disabled", true);
btnPedirCarta.setAttribute("disabled", true);


btnPedirCarta.addEventListener('click', ()=>{
    generarNumeros();
    pedirCarton();
    
})

btnEmpezar.addEventListener('click', ()=>{
    empezar();
})

btnConsultar.addEventListener('click', ()=>{
    consultarUsuario();
})

btnCerrar.addEventListener('click', ()=>{
    cerrarSesion();
})


jugador = JSON.parse(localStorage.getItem('jugador'));
if (jugador){
    login();
}

let tempEnJuego = JSON.parse(localStorage.getItem("enJuego"));
if (tempEnJuego){
    enJuego = tempEnJuego;
    aciertos = enJuego.aciertos;
    cantidad = enJuego.cantidad;
    bolasAcertadas = enJuego.bolasAcertadas;
    carton = enJuego.carton;
    numeros = enJuego.numeros;

    btnPedirCarta.setAttribute("disabled",true);
    pintarCarton();
    empezar();
}

