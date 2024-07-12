let numeroMaximo = 50;

function exibirTextoTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoTela('h1', 'Jogo do Número Secreto');
    exibirTextoTela('p', 'Escolha um número entre 1 e ' + numeroMaximo);
}

exibirMensagemInicial();

let listaNumerosSorteados = [];

let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;


function verificarChute() {
    tentativas++;
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativas == 1 ? ' tentativa' : ' tentativas';

    if (chute == numeroSecreto) {
        exibirTextoTela('h1', 'Acertou');
        exibirTextoTela('p', 'Você descobriu o número secreto com ' + tentativas + palavraTentativa + '!');
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (numeroSecreto > chute) {
        exibirTextoTela('p', 'O número secreto é maior que ' + chute);
        limparCampo();
    } else {
        exibirTextoTela('p', 'O número secreto é menor que ' + chute);
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
  
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeElementosLista = listaNumerosSorteados.length;

    if(quantidadeElementosLista == numeroMaximo){
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    exibirMensagemInicial();
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 0;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
