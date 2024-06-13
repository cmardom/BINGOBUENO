function comparar(a, b) { return a - b; }


function generarNumeros(){
    numeros=[];
    for (let i = 1; i <= 90; i++){
        numeros.push(i);
    }
    numeros = _.shuffle(numeros);
    console.log(numeros);
}

function pedirCarton(){
    resetearJuego();
    generarNumeros();
    carton = numeros.slice(0,24);
    carton.sort(comparar);

    pintarCarton();

    btnEmpezar.removeAttribute("disabled");


}

function pintarCarton(){
    for(let i = 0; i <= 23; i++){
        const etqSquare = document.getElementById('square'+i);
        etqSquare.innerText = carton[i];

        if (bolasAcertadas.indexOf(carton[i])>=0){
            etqSquare.classList.add('bg-info', 'text-white');
        }

    }
}

function empezar(){
    let interval;
    numeros = _.shuffle(numeros);
    
    interval = setInterval(()=>{
        numero = numeros.pop();
      
        cantidad++;
        etqJugando.innerText = numero;
    
        let pos = carton.indexOf(numero);
    
        if (pos >= 0){
            let etqNumero = document.getElementById("square"+pos);
            etqNumero.classList.add("bg-info", "text-white");
            bolasAcertadas.push(numero);
            aciertos++;
        }

        enJuego.aciertos = aciertos;
        enJuego.bolasAcertadas = bolasAcertadas;
        enJuego.cantidad = cantidad;
        enJuego.carton = carton;
        enJuego.numeros = numeros;
        localStorage.setItem('enJuego', JSON.stringify(enJuego));
    
    
        if (aciertos >= 5){
            clearInterval(interval);
            jugador.resultado = cantidad;
            localStorage.setItem('jugador', JSON.stringify(jugador));
            etqResultado.innerText = "Se han sacado " + cantidad + " bolas : " + bolasAcertadas.join(",");
        }
    }, 200);

   

}


function consultarUsuario(){
    obtenerJugadores().then(resp=>{
        jugadores = resp;
        jugador=jugadores.find((jug) => jug.nombre === etqUsuario.value);
        if (jugador){
            if (jugador.passwd === etqPasswd.value){
                localStorage.setItem('jugador', JSON.stringify(jugador));
                login();
            }
        }
    })
}

function login(){
    btnPedirCarta.removeAttribute("disabled");
    btnCerrar.hidden = false;
    btnConsultar.hidden = true;
    etqUsuario.hidden = true;
    etqPasswd.hidden = true;
    etqSaludo.innerText = "Hola, " + jugador.nombre;
}

function cerrarSesion(){
    btnPedirCarta.setAttribute("disabled",true);
    btnEmpezar.setAttribute("disabled", true);
    btnCerrar.hidden = true;
    btnConsultar.hidden = false;
    etqUsuario.hidden = false;
    etqPasswd.hidden = false;
    etqSaludo.innerText ="";

    localStorage.clear();
    resetearJuego();
}


function resetearJuego(){
    aciertos = 0;
    cantidad=0;
    bolasAcertadas=[];

    etqJugando.innerText="";
    etqResultado.innerText="";

    localStorage.removeItem("enJuego");
    for(let i = 0; i <= 23; i++){
        const etqSquare = document.getElementById('square'+i);
        etqSquare.classList.remove("text-white", "bg-info");
        etqSquare.innerText = "";
       
    }
    
}