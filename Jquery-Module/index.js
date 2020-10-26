//quando uma tag é selecionada no JQuery, ela seleciona TODOS os elementos, tipo QuerySelectioAll

$('h1').css('color', 'blue')

$('h1').addClass('gol ribamar')

$('h1').removeClass('ribamar')

$('h1').hasClass('gol') // no console vai retornar um boolean se tem a classe ou não

$('button').text('Dale')

$('h1').html('<p> Garaio </p>')

$('a').attr('href') // no console o atributo

$('a').attr('href', 'https://www.ribamar.com.br') // muda o atributo



$('button').click(function() {
    $('h1').css('color', 'yellow')
})

$('input').keydown(function(event) {
    console.log(event.key)
})

$(document).keydown(function(event) {
    $('h1').text(event.key)
})

$('h1').on('mouseover', function() { // A function "on" aceita vários tipos de EventListeners: Click, mouseover, mouseout etc...
    $('h1').css('color', 'green')
})



$('h1').before('<p> Bom dia zap </p>') // <div>
                                       //   <p> Bom dia zap </p>
                                       //   <h1> blablabla </h1>
                                       // </div> 

$('h1').after('<p> Bom dia zap </p>') // <div>
                                      //   <h1> blablabla </h1> 
                                      //   <p> Bom dia zap </p>
                                      // </div> 

$('h1').prepend('<p> Bom dia zap </p>') // <div>
                                        //   <h1> <p> Bom dia zap </p> blablabla </h1> 
                                        // </div> 

$('h1').append('<p> Bom dia zap </p>') // <div>
                                       //   <h1>  blablabla <p> Bom dia zap </p> </h1> 
                                       // </div> 

                
$('button').remove()



//ANIMATIONS (SÃO MUITAS)

$('h1').click(function() {
    $('h1').hide()
})

$('h1').click(function() {
    $('h1').show()
})

$('h1').click(function() {
    $('h1').fadeOut()
})

$('h1').click(function() {
    $('h1').fadeIn()
})

$('h1').click(function() {
    $('h1').toggle()
})

$('h1').click(function() {
    $('h1').slideUp()
})

$('h1').click(function() {
    $('h1').slideDown()
})

$('h1').click(function() {
    $('h1').animate({opacity: 0.5}) // SÓ FUNCIONA COM ATRIBUTOS Q RECEBAM NUMEROS
})

$('h1').click(function() {
    $('h1').slideUp().slideDown().fadeOut()
})

