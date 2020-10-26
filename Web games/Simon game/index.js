let podePressionar = true
let level = 0
let arrayJogador = []
let arrayComputador = []
let cores = ['blue', 'red', 'yellow', 'green']

$(document).keydown(function() {
    if(podePressionar) {
        podePressionar = false
        $('h1').text('Level ' + level)
        proxLevel()
    }
})

$('.btn').click(function() {
    let corBotaoEscolhido = $(this).attr('id')
    arrayJogador.push(corBotaoEscolhido)

    tocarSom(corBotaoEscolhido)
    animacao(corBotaoEscolhido)

    verificarResultado(arrayJogador.length - 1)
})

function tocarSom(cor) {
    let som = new Audio(`./sounds/${cor}.mp3`)
    som.play()
}

function animacao(cor) {
    $('#'+ cor).addClass('pressed')

    setInterval(function() {
        $('#' + cor).removeClass('pressed')
    }, 100)
}

function verificarResultado(posicaoAtual) {
    if(arrayJogador[posicaoAtual] === arrayComputador[posicaoAtual]) {
        if(arrayJogador.length === arrayComputador.length) {
            setTimeout(function() {
                proxLevel()
            }, 1000)
        }
    } else {
        tocarSom('wrong')
        $('h1').text('Game Over: You finished level ' + level)
        $('body').addClass('game-over')

        setTimeout(function() {
            $('body').removeClass('game-over')
        }, 1000)

        reiniciar()
    }
}

function reiniciar() {
    level = 0
    arrayComputador = []
    podePressionar = true
}

function proxLevel() {
    arrayJogador = []
    level++
    $('h1').text('Level ' + level)

    let aleatorio = Math.floor(Math.random() * 4)
    let corAleatoria = cores[aleatorio]
    
    arrayComputador.push(corAleatoria)

    $('#' + corAleatoria).fadeIn(100).fadeOut(100).fadeIn(100)
    tocarSom(corAleatoria)

}