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
        this.acelerarX = 0;
        this.acelerarY = 0;
    }
    mover() {
        acelerarX(this.acelerarX);
        acelerarY(this.acelerarY);
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

function limpar() {
    var canvas = document.getElementById("jogo");
    var area = canvas.getContext("2d");
    area.clearRect(0, 0, canvas.width, canvas.height);
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
    tempo = setInterval(function () {
        limpar();
        for (cont in objetos) {
            desenhar(objetos[cont].imagem, objetos[cont].posX, objetos[cont].posY);
            objetos[cont].mover();
        }
    }, 5);
    log(tempo);
}
function acelerarX(direcao) {
    if (direcao > 0) {
        if (objetos[0].velX <= 3) {
            objetos[0].velX += 0.2;
        }
    } else if (direcao < 0) {
        if (objetos[0].velX >= -3) {
            objetos[0].velX -= 0.2;
        }
    } else {
        pararX();
    }
}

function acelerarY(direcao) {
    if (direcao > 0) {
        if (objetos[0].velY <= 3) {
            objetos[0].velY += 0.2;
        }
    } else if (direcao < 0) {
        if (objetos[0].velY >= -3) {
            objetos[0].velY -= 0.2;
        }
    } else {
        pararY();
    }
}
function pararY() {
    objetos[0].velY = 0;
}
function pararX() {
    objetos[0].velX = 0;
}

function attControles() {
    document.getElementById("cima").innerText = controles.cima;
    document.getElementById("baixo").innerText = controles.baixo;
    document.getElementById("esquerda").innerText = controles.esquerda;
    document.getElementById("direita").innerText = controles.direita;
}









var objetos = [];
var controles = {
    cima: 38,
    baixo: 40,
    esquerda: 37,
    direita: 39
}
var timer;
var cont;
var logs = true;
var canvas = document.getElementById("jogo");
attControles();
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












document.onkeydown = function (event) {
    event.preventDefault();
    var x = event.keyCode;
    log("Tecla: " + event.keyCode + " e " + x);
    if (x == controles.cima) {
        log("cima");
        objetos[0].acelerarY = -1;
    } else if (x == controles.baixo) {
        log("baixo");
        objetos[0].acelerarY = 1;
    }
    if (x == controles.esquerda) {
        log("esquerda");
        objetos[0].acelerarX = -1;
    } else if (x == controles.direita) {
        log("direita");
        objetos[0].acelerarX = 1;
    }
}

document.onkeyup = function (event) {
    event.preventDefault();
    var x = event.keyCode;
    log("Tecla: " + event.keyCode + " e " + x);
    if (x == controles.cima) {
        log("cima");
        if (objetos[0].velY < 0) {
            objetos[0].acelerarY = 0;
        }
    } else if (x == controles.baixo) {
        log("baixo");
        if (objetos[0].velY > 0) {
            objetos[0].acelerarY = 0;
        }
    }
    if (x == controles.esquerda) {
        log("esquerda");
        if (objetos[0].velX < 0) {
            objetos[0].acelerarX = 0;
        }
    } else if (x == controles.direita) {
        log("direita");
        if (objetos[0].velX > 0) {
            objetos[0].acelerarX = 0;
        }
    }
}

document.getElementById("keyCima").onkeyup = function (event) {
    event.preventDefault();
    controles.cima = event.keyCode;
    this.value = event.key;
    attControles();
    document.getElementById("keyBaixo").focus();
}

document.getElementById("keyCima").onkeydown = function (event) {
    event.preventDefault();
    this.value = "";
}

document.getElementById("keyBaixo").onkeyup = function (event) {
    event.preventDefault();
    controles.baixo = event.keyCode;
    this.value = event.key;
    attControles();
    document.getElementById("keyEsq").focus();
}

document.getElementById("keyBaixo").onkeydown = function (event) {
    event.preventDefault();
    this.value = "";
}

document.getElementById("keyEsq").onkeyup = function (event) {
    event.preventDefault();
    controles.esquerda = event.keyCode;
    this.value = event.key;
    attControles();
    document.getElementById("keyDir").focus();
}

document.getElementById("keyEsq").onkeydown = function (event) {
    event.preventDefault();
    this.value = "";
}

document.getElementById("keyDir").onkeyup = function (event) {
    event.preventDefault();
    controles.direita = event.keyCode;
    this.value = event.key;
    attControles();
    this.blur();
}

document.getElementById("keyDir").onkeydown = function (event) {
    event.preventDefault();
    this.value = "";
}