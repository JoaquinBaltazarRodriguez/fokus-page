const html = document.querySelector("html");
const botonCorto = document.querySelector(".app__card-button--corto");
const botonEnfoque = document.querySelector(".app__card-button--enfoque");
const botonLargo = document.querySelector(".app__card-button--largo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botones = document.querySelectorAll(".app__card-button");
const inputEnfoqueMusica = document.querySelector("#alternar-musica");
const musica = new Audio("./sonidos/luna-rise-part-one.mp3");
const botonTemporizador = document.querySelector("#start-pause");
const tiempoFinalizado = new Audio("./sonidos/beep.mp3");
const tiempoStart = new Audio("./sonidos/play.wav");
const tiempoPausado = new Audio("./sonidos/pause.mp3");
const textoIniciarPausar = document.querySelector("#start-pause span");
const botonPlay = document.querySelector(".app__card-primary-butto-icon")
const tiempoEnPantalla = document.querySelector("#timer")

let tiempoTranscurridoEnSegundos = 1500; //5 minutos
let idIntervalo = null;
let temporizadorPausado = false;

musica.loop = true;

inputEnfoqueMusica.addEventListener("change", function() {
    if(musica.paused){
        musica.play();
    }
    else{
        musica.pause();
    }
})

botonCorto.addEventListener("click", function(){
    tiempoTranscurridoEnSegundos = 300;
    cambiarContexto("descanso-corto");
    botonCorto.classList.add("active");
})

botonEnfoque.addEventListener("click", function(){
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto("enfoque");
    botonEnfoque.classList.add("active");
})

botonLargo.addEventListener("click", function(){
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto("descanso-largo");
    botonLargo.classList.add("active");
})

function cambiarContexto(contexto) {
    mostrarTiempo();
    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", `./imagenes/${contexto}.png`);

    botones.forEach(function(contexto){
        contexto.classList.remove("active");
    }) 

    switch(contexto) {
        case "enfoque":
            titulo.innerHTML = `
            Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>
            `;
        break

        case "descanso-corto":
            titulo.innerHTML = `
            ¿Qué tal tomar un respiro?
            <strong class="app__title-strong"> ¡Haz una pausa corta!</strong>
            `;
        break

        case "descanso-largo":
            titulo.innerHTML = `
            Hora de volver a la superficie a la superficie
            <strong class="app__title-strong">Haz una pausa larga.</strong>
            `;
    }
}

const cuentaRegresiva = function(){
    if(tiempoTranscurridoEnSegundos <= 0){
        tiempoFinalizado.play();
        reiniciar();
        return;
    }
    textoIniciarPausar.textContent = "Pausar";
    tiempoTranscurridoEnSegundos -= 1
    mostrarTiempo();
}

botonTemporizador.addEventListener("click", function(){
    if(temporizadorPausado){
        textoIniciarPausar.textContent = "Comenzar";
        tiempoPausado.play();
    }
    else{
        tiempoStart.play();
    }
    iniciarPausar();
    botonIniciarPausar(botonPlay);
})


function iniciarPausar(){
    if(idIntervalo){
        reiniciar();
        temporizadorPausado = false;
        return;
    }
    idIntervalo = setInterval(cuentaRegresiva,1000);
    temporizadorPausado = true;
}

function reiniciar(){
    clearInterval(idIntervalo);
    idIntervalo = null;
}

function botonIniciarPausar(botonContexto){
    if(temporizadorPausado === false){
        botonContexto.setAttribute("src", "/imagenes/play_arrow.png");
    }
    else{
        botonContexto.setAttribute("src", "/imagenes/pause.png");
    }
}

function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString("es-MX", {minute: "2-digit", second: "2-digit"});
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}

mostrarTiempo();