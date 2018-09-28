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
var objetos = [];
var timer;
var cont;
var logs = true;
objetos.push(new Objeto(50, 50, "arquivos/quadrado_preto.png", 100, 100));
objetos.push(new Objeto(50, 50, "arquivos/asterisco.png", 150, 150));
objetos.push(new Objeto(50, 50, "arquivos/asterisco_vermelho.png", 200, 200));


timer = setInterval(function () {
    log("Teste se os objetos estão carregados");
    if (objetosCarregados()) {
        log("Todos os objetos carregados, tentando printar");
        clearInterval(timer);
        for (cont in objetos) {
            desenhar(objetos[cont].imagem, objetos[cont].posX, objetos[cont].posY);
        }

    }
}, 50);