for(let i = 0; i < document.querySelectorAll('.drum').length; i++) {
    document.querySelectorAll('.drum')[i].addEventListener('click', function() {
        // UM LOOP QUE CRIA CONFIGURAÇÕES PARA OS BOTOES
        makeSound(this.innerHTML)
        makeAnimation(this.innerHTML)
    })
}

document.addEventListener('keydown', function(event) { //event = tecla pressionada
    makeSound(event.key)
    makeAnimation(event.key)
})

function makeSound(key) {
    switch (key) {
        case 'w':
            const crash = new Audio('./sounds/crash.mp3')
            crash.play()
            break
        case 'a':
            const kickbass = new Audio('./sounds/kick-bass.mp3')
            kickbass.play()
            break
        case 's':
            const snare = new Audio('./sounds/snare.mp3')
            snare.play()
            break
        case 'd':
            const tom4 = new Audio('./sounds/tom-4.mp3')
            tom4.play()
            break
        case 'j':
            const tom1 = new Audio('./sounds/tom-1.mp3')
            tom1.play()
            break
        case 'k':
            const tom3 = new Audio('./sounds/tom-3.mp3')
            tom3.play()
            break
        case 'l':
            const tom2 = new Audio('./sounds/tom-2.mp3')
            tom2.play()
            break
        default:
            console.log(key)
    }
}

function makeAnimation(currentKey) {
    let activeButton = document.querySelector(`.${currentKey}`)
    activeButton.classList.add('pressed')

    setInterval(function() {
        activeButton.classList.remove('pressed')
    }, 100)
}


function Bellboy(name, age, isworking, lenguages) {
    this.name = name
    this.age = age
    this.isWorking = isworking
    this.lenguages = lenguages
}

let bellboy1 = new Bellboy('Caio', 17, false, ['portuguese', 'english'])