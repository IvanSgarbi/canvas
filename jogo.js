var objeto = function(largura,altura,imagem){
    var imagemFinal = new Image(largura,altura);
    imagemFinal.src = imagem;
    return{
        largura: largura,
        altura: altura,
        imagem: imagemFinal
    }
}