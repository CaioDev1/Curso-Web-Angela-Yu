function decide() {
    let random_img1 = Math.floor(Math.random() * 6) + 1 // ESSE MÉTODO VAI CRIAR UM NÚMERO ALEATÓRIO ENTRE 0 E 5.9999... (COMO É .FLOOR, SERÁ 0 E 5) E DEPOIS ADICIONAR MAIS 1, E FICARÁ UM NÚMERO ENTRE 1 E 6
    let random_img2 = Math.floor(Math.random() * 6) + 1

    document.querySelector('.img1').src = `./images/dice${random_img1}.png`

    document.querySelector('.img2').src = `./images/dice${random_img2}.png`

    let title = document.querySelector('h1')

    if (random_img1 > random_img2) {
        title.textContent = 'PLAYER 1 WON'
    } else if (random_img2 > random_img1) {
        title.textContent = 'PLAYER 2 WON'
    } else {
        title.textContent = 'DRAW'
    }

}