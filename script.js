//Trabalhar com canvas
//https://www.w3schools.com/graphics/game_intro.asp
//Comandos
let UP=38 // botão cima 
let DOWN=40 //botão baixo
let RIGHT=39 //botão a direita
let LEFT=37  //botão a esquerda
let ATIRAR=13 //enter
let ESC=27 //Parar o loop
var continuar=true;
var tamanho_barra_status=30;
var playerbonequinho;
var areaJogo; 
var idBolas = [];
var globalID;
var width= 500;
var height= 350;
//
var c = document.getElementById("canvas");

window.onload=function(){
  
   game_start();
}
//
document.querySelector('body').addEventListener('keydown', function(event) {
  //Mostrar o codigo do botao apertado
  //console.log(event.keyCode);
  window.requestAnimationFrame(()=>processar_comando(event))
});
//
function processar_comando(event){
    //Usar funcao de acordo com o codigo
    if(event.keyCode==ATIRAR){
        criar_bola();
    }
    if(event.keyCode==UP || event.keyCode==DOWN
    || event.keyCode==LEFT || event.keyCode==RIGHT){
        mover_boneco(event);
    }
    if(event.keyCode==ESC){
      console.log("Parando");
      continuar=false;
      cancelAnimationFrame(globalID);
    } 
}
//
function game_start(){
  //Inicializar variaveis   
    playerbonequinho = document.getElementById("personagem");
    areaJogo = document.getElementById("area_jogo");
    area_jogo.style.width = width+"px";
    area_jogo.style.height=height+"px";
    console.log("area_jogo: "+area_jogo.style.width+"x"+area_jogo.style.height)
    playerbonequinho.style.top="30px"
    playerbonequinho.style.left="0px"   
    globalID =   window.requestAnimationFrame(game_loop);
    console.log(globalID);
}
var time=null;
//
function game_loop(){
  mover_bolas();
  callGameLoop();
}
function callGameLoop(){
    globalID=window.requestAnimationFrame(game_loop);
}
function criar_bola (){
  var x = playerbonequinho.style.left;
  var y = playerbonequinho.style.top;
  //criar uma bola na posição do jogador
  var bola = document.createElement('div');
  bola.className += ' bola';
  bola.style.left=x;
  bola.style.top=y;
  areaJogo.appendChild(bola);
}
var alturabs=50;//altura da barra de status

function destruir_bola(bola) {
//bola chegar na borda da tela será tirada do array
//achar a bola e remover a bola 
  var  bola = document.getElementById("b"+i);
  bola.remove()
}
function mover_bolas(){
  var timeNow =Date.now();
  if(!time)time=timeNow;
  //console.log(timeNow-time);
  if(timeNow-time<1)return;
  else time=timeNow;
  var  bolas = document.getElementsByClassName("bola");
  //Regras
  //Não pode ser desenhado fora da área de gameplay
  //Regra de clip no css
  //Não pode ser desenhado na barra de status
  //regra clip no css e limitação no javascript
  var max_width=width;
  var max_height =height;
  var passo=5;
  //console.log(bolas.length)
  for(i=0;i<bolas.length;i++){
    var bola = bolas[i];
    var ox=parseInt(bola.style.left);
    var oy =parseInt(bola.style.top);
    //console.log((ox+passo)+"px")
    if(ox+passo>=max_width){//Saiu da tela
        console.log("Fim da tela");
        //bola.style.display="none";
        bola.remove()
    }
    else{
      bola.style.transform = "translateX("+(passo)+"px)"
      bola.style.left=(ox+passo)+"px";
      
    }
  }
}



function mover_boneco(event){
  var playerbonequinho = document.getElementById("personagem")
  if (event.keyCode==UP){
     var atual= parseInt(playerbonequinho.style.top,10)
     if(atual>30+5){
      playerbonequinho.style.top=(atual-5)+"px"
     }
  }
  if (event.keyCode==DOWN){
    var atual= parseInt(playerbonequinho.style.top,10)
    if(atual<340-45){
      playerbonequinho.style.top=(atual+5)+"px"
    }
    
  }
    if (event.keyCode==RIGHT){
    var atual= parseInt(playerbonequinho.style.left,10)
     if(atual<500-35){
     playerbonequinho.style.left=(atual+5)+"px"}
  }
    if (event.keyCode==LEFT){
    var atual= parseInt(playerbonequinho.style.left,10)
     if(atual>=5){
     playerbonequinho.style.left=(atual-5)+"px"}
  }
}
