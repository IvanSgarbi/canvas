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
        this.direcaoX = 0;
        this.direcaoY = 0;
    }
    mover() {
        this.acelerarX(this.direcaoX);
        this.acelerarY(this.direcaoY);
        if (!(this.velX == 0)) {
            this.posX += this.velX;
        }
        if (!(this.velY == 0)) {
            this.posY += this.velY;
        }
    }
    acelerarX(direcao) {
        if (direcao != 0) {
            log("Valor da direção q chega na função de acelerar o X:" + direcao);
        }

        if (direcao > 0) {
            if (this.velX <= 3) {
                this.velX += 0.2;
            }
        } else if (direcao < 0) {
            if (this.velX >= -3) {
                this.velX -= 0.2;
            }
        } else {
            this.pararX();
        }
    }

    acelerarY(direcao) {
        if (direcao > 0) {
            if (this.velY <= 3) {
                this.velY += 0.2;
            }
        } else if (direcao < 0) {
            if (this.velY >= -3) {
                this.velY -= 0.2;
            }
        } else {
            this.pararY();
        }
    }
    pararY() {
        this.velY = 0;
    }
    pararX() {
        this.velX = 0;
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
        objetos[0].direcaoY = -1;
    } else if (x == controles.baixo) {
        log("baixo");
        objetos[0].direcaoY = 1;
    }
    if (x == controles.esquerda) {
        log("esquerda");
        objetos[0].direcaoX = -1;
    } else if (x == controles.direita) {
        log("direita");
        objetos[0].direcaoX = 1;
    }
}

document.onkeyup = function (event) {
    event.preventDefault();
    var x = event.keyCode;
    log("Tecla: " + event.keyCode + " e " + x);
    if (x == controles.cima) {
        log("solta cima");
        objetos[0].direcaoY = 0;

    } else if (x == controles.baixo) {
        log("solta baixo");
        objetos[0].direcaoY = 0;
    }
    if (x == controles.esquerda) {
        log("solta esquerda");
        objetos[0].direcaoX = 0;

    } else if (x == controles.direita) {
        log("solta direita");
        objetos[0].direcaoX = 0;

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