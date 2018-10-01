class Objeto {
    constructor(largura, altura, imagem, posX, posY) {
        var imagemFinal = document.createElement("img");
        imagemFinal.width = 50;
        imagemFinal.height = 50;
        imagemFinal.src = imagem;
        this.largura = largura;
        this.altura = altura;
        this.imagem = imagemFinal;
        this.posX = posX;
        this.posY = posY;
        this.velX = 0;
        this.velY = 0;
    }
    mover() {
        this.posX += this.velX;
        this.posY += this.velY;
    }
}

function log(mensagem) {
    if (logs) {
        console.log(mensagem);
    }

}

function desenhar(imagem, posX, posY) {
    var canvas = document.getElementById("jogo");
    var area = canvas.getContext("2d");
    area.drawImage(imagem, posX, posY);
}

function limpar(){
    var canvas = document.getElementById("jogo");
    var area = canvas.getContext("2d");
    area.clearRect(0,0,canvas.width,canvas.height);
}

function objetosCarregados() {
    var cont;
    var carregados = true;
    for (cont in objetos) {
        if (!objetos[cont].imagem.complete) {
            carregados = false;
            break;
        }
    }
    return carregados;
}

function comecarAnimacao(objetos) {
    var tempo;
    var cont;
    tempo = setInterval(function(){
        limpar();
        for (cont in objetos) {
            desenhar(objetos[cont].imagem, objetos[cont].posX, objetos[cont].posY);
            objetos[cont].mover();
        }      
    },5);
    
}

var objetos = [];
var controles = {
    cima:38,
    baixo:40,
    esquerda:37,
    direita:39
};
var timer;
var cont;
var logs = true;
var canvas = document.getElementById("jogo");
objetos.push(new Objeto(50, 50, "arquivos/quadrado_preto.png", 100, 100));
objetos.push(new Objeto(50, 50, "arquivos/asterisco.png", 160, 160));
objetos.push(new Objeto(50, 50, "arquivos/asterisco_vermelho.png", 220, 220));


timer = setInterval(function () {
    log("Teste se os objetos estão carregados");
    if (objetosCarregados()) {
        log("Todos os objetos carregados, tentando printar");        
        clearInterval(timer);
        comecarAnimacao(objetos);
    }
}, 100);
document.onkeypress = function(event){
    var x  = event.keyCode;
}
document.getElementById("keyCima").onkeyup = function(event) {
    
    event.preventDefault();
}