//inicializando variaveis globais
var time = 0;
let intervalo = 0, timePausado = 0, descanso = 0, isDescanso = false;

//função que modificar o tempo no visor
function atualizaRelogio(){
    var horas = 0,minutos = 0 , segundos = 0;
        if(time < 0){
            pausaContagem();
            document.getElementById("iniciar").style.display = "inline";
            document.getElementById("pausar").style.display = "none";
            document.getElementById("continuar").style.display = "none";
            document.getElementById("zerar").style.display = "none";
            time = 0;
            document.getElementById("exibir").innerHTML = " ";
            document.getElementById("tempo").removeAttribute("disabled");
            //if(!isDescanso){
            if(!isDescanso && confirm("Deseja fazer uma pausa?")){
                inicializaDescanso();
                document.getElementById("iniciar").style.display = "none"
                document.getElementById("pular").style.display = "inline";
            }
            else{
                document.getElementById("pular").style.display = "none";
                if(window.confirm("Iniciar novo ciclo?"))
                    inicializaContagem();
                else{
                    window.alert("Parabéns! Você completou um ciclo de estudos!");
                    document.getElementById("descanso").removeAttribute("disabled");
                    document.getElementById("exibir").innerHTML = "00:00:00";
                }
            }
        }
        else{
            //Realiza a extração das horas remanecentes
            horas = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            //Realiza a extração dos minutos remanecentes
            minutos = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)) ; 
            //Realiza a extração dos segundos remanecentes
            segundos = Math.floor((time % (1000 * 60)) / 1000);   
            if(horas < 10) 
                horas = "0"+horas;
            if(minutos < 10)
                minutos = "0"+minutos;
            if(segundos < 10)
                segundos = "0"+segundos;
            document.getElementById("exibir").innerHTML = horas+":"+minutos +":"+segundos; 
            time -= 1000;
        }
}

//chamada da função iniciar o relógio
function inicializaContagem(){
    if(timePausado > 0)
        time = timePausado;
    else
        time = 60000 * document.getElementById("tempo").value;
        descanso = 60000 * document.getElementById("descanso").value;
    //atualiza o valor do cronometro a cada segundo
    intervalo = setInterval(atualizaRelogio, 1000);
    //trocaVisibilidade();
    document.getElementById("iniciar").style.display = "none";
    document.getElementById("pausar").style.display = "inline";
    document.getElementById("continuar").style.display = "none";
    document.getElementById("zerar").style.display = "inline";
    document.getElementById("tempo").disabled = "disabled";
    document.getElementById("descanso").disabled = "disabled";
}

//função para pausar relógio
function pausaContagem(){
    clearInterval(intervalo);
    //trocaVisibilidade();
    document.getElementById("pausar").style.display = "none";
    document.getElementById("continuar").style.display = "inline";
    document.getElementById("zerar").style.display = "inline";
    timePausado = time;
}

//função para zerar/interro contagem
function zeraContagem(){
    //Precisa notificar o usuário se ele realmente quer zerar o tempo
    //Talvez pausar o tempo assim que o usuário for notificado
    //Retomando a contagem caso o usuário escolha "não pausar"
    time = -1;
    atualizaRelogio();
}

function inicializaDescanso(){
    time = descanso;
    isDescanso = true;
    intervalo = setInterval(atualizaRelogio, 1000);
}

//função desativada, mas gerenciará visibilidade dos botões do pomodoro
function trocaVisibilidadeBotao(){
    if(document.getElementById("iniciar").onclick){
        document.getElementById("iniciar").style.display = "none";
        document.getElementById("pausar").style.display = "inline";
    }
    else if(document.getElementById("pausar").onclick){
        document.getElementById("pausar").style.display = "none";
        document.getElementById("continuar").style.display = "inline";
    }
}

function exibirConfiguracao(){
    document.getElementById("configurar").style.display = "block";
    document.getElementById("main").style.display = "none";
    document.getElementById("showMain").style.display = "block";
    document.getElementById("showConfig").style.display = "none";
}

function exibirPrincipal(){
    document.getElementById("main").style.display = "block";
    document.getElementById("configurar").style.display = "none";
    document.getElementById("showMain").style.display = "none";
    document.getElementById("showConfig").style.display = "block";
}

//Explicações do código
//bases de conta para encontrar horas, minutos e segundos
    // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) ;
    //var seconds = Math.floor((distance % (1000 * 60)) / 1000);
//tempo em milisegundos -> 1 segundo = 1000 milisegundos
//Divisão por mil para aparecer a quantidade de segundos que soman horas, minutos e segundos