'use strict'

const characters = document.querySelectorAll('.character')
const boardgame = document.querySelector('.game-board')
const boat = document.querySelector('#boat')
const lake = document.querySelector('#lake')
const moveBoatBtn = document.getElementById('moveBoatBtn')
const restartBtns = document.querySelectorAll('.restart-btn')
const left = document.querySelector('.left')
const right = document.querySelector('.right')
let selectedCharacter
let selectedCharacterInitCord = {}
let gameFinished = false
let boatMoves = 0



window.addEventListener('load', () => {
    for (const ch of characters) {
        selectedCharacterInitCord[ch.getAttribute('id')] = [ch.getBoundingClientRect().left, ch.getBoundingClientRect().top + 8]

        ch.addEventListener('mousedown', (event) => {
            if (gameFinished) {
                return
            }
            if (selectedCharacter) {
                return
            }
            const img = ch.querySelector('img')
            const pickedImgSrc = img.getAttribute('src').split('.')[0] + '-picked.png'
            img.setAttribute('src', pickedImgSrc)
            ch.style.left = event.pageX + 'px';
            ch.style.top = event.pageY + 'px';
            boardgame.prepend(ch)
            selectedCharacter = ch
        })
    }

    for (const restartBtn of restartBtns) {
        restartBtn.addEventListener('click', () => {
            gameFinished = false
            document.querySelector('#gameLoseBoard').classList.remove('show')
            document.querySelector('#gameWinBoard').classList.remove('show')
            for (const ch of characters) {
                left.prepend(ch)
                ch.style = ''
            }
            boat.setAttribute('data-place', 'left')
            boat.style = ''
        })
    }
})

boardgame.addEventListener('mouseup', () => {
    if (gameFinished) {
        return
    }
    if (selectedCharacter) {
        const id = selectedCharacter.getAttribute('id')
        const boatPlace = boat.getAttribute('data-place')
        selectedCharacter.setAttribute('data-place', boatPlace)
        const container = document.querySelector(`.${boatPlace}`)
        container.prepend(selectedCharacter)
        selectedCharacter.style.left = selectedCharacterInitCord[id][0] + 'px'
        selectedCharacter.style.top = selectedCharacterInitCord[id][1] + 'px'


        const ch = selectedCharacter
        const img = ch.querySelector('img')
        const normalImgSrc = img.getAttribute('src').split('-picked.png')[0] + '.png'

        img.setAttribute('src', normalImgSrc)

        if (boat.childElementCount === 1) {
            moveBoatBtn.setAttribute('disabled', true)
        }

        selectedCharacter = null
    }
    checkGameStatus()
})

boardgame.addEventListener('mousemove', (event) => {
    if (gameFinished) {
        return
    }
    if (selectedCharacter) {
        if (selectedCharacter.getAttribute('data-place') !== 'boat') {
            selectedCharacter.style.left = event.pageX + 'px'
            selectedCharacter.style.top = event.pageY + 'px'
        } else {
            selectedCharacter.style.left = event.pageX + 'px'
            selectedCharacter.style.top = event.pageY + 'px'
        }
    }

})

boat.addEventListener('mouseup', () => {
    if (gameFinished) {
        return
    }
    if (selectedCharacter) {
        if (selectedCharacter.getAttribute('data-place') !== boat.getAttribute('data-place')) {
            return
        }
        if (boat.childElementCount == 1) {
            selectedCharacter.style.left = 0
        } else if (boat.childElementCount == 2) {
            if (parseInt(boat.querySelector('.character').style.left) === 100) {
                selectedCharacter.style.left = '0'
            } else {
                selectedCharacter.style.left = '100px'
            }
        } else {
            return
        }
        selectedCharacter.style.top = '100px'
        selectedCharacter.setAttribute('data-place', 'boat')
        selectedCharacter.style.transform = ''
        boat.prepend(selectedCharacter)
        const img = selectedCharacter.querySelector('img')
        const normalImgSrc = img.getAttribute('src').split('-picked.png')[0] + '.png'
        img.setAttribute('src', normalImgSrc)
        selectedCharacter = null
        moveBoatBtn.removeAttribute('disabled')
    }
})

moveBoatBtn.addEventListener('click', () => {
    if (gameFinished) {
        return
    }
    if (boat.getAttribute('data-place') === 'left') {
        boat.setAttribute('data-place', 'right')
    } else {
        boat.setAttribute('data-place', 'left')
    }

    boat.classList.add('moving')

    let speed = Math.random() + 1 * 3

    let interval = setInterval(() => {
        const goingTo = boat.getAttribute('data-place')
        const left = parseInt(boat.style.left ? boat.style.left : '0')

        if (goingTo === 'left') {
            if (left <= 0) {
                boat.style.transform = ''
                clearInterval(interval)
                boat.classList.remove('moving')
                return
            }
            boat.style.left = left - speed + 'px'
        } else {
            if (left >= lake.getBoundingClientRect().width - boat.getBoundingClientRect().width) {
                boat.style.transform = 'scale(-1, 1)'
                clearInterval(interval)
                boat.classList.remove('moving')
                return
            }
            boat.style.left = left + speed + 'px'
        }

        boat.scrollIntoView({ inline: 'center' })

    }, 10)
    checkGameStatus()
})

const checkGameStatus = () => {
    let gameLose = false
    let gameWin = false
    const boatPlace = boat.getAttribute('data-place')
    if (left.querySelectorAll('.cannibal').length > left.querySelectorAll('.person').length && left.querySelectorAll('.person').length !== 0) {
        if (boatPlace === 'right') {
            gameLose = true
        }
    } else if (right.querySelectorAll('.cannibal').length > right.querySelectorAll('.person').length && right.querySelectorAll('.person').length !== 0) {
        if (boatPlace === 'left') {
            gameLose = true
        }
    }

    if (right.querySelectorAll('.character').length === 6) {
        gameWin = true
    }

    if (gameLose) {
        gameLoseAnimation()
        gameFinished = true
    }

    if (gameWin) {
        gameWinAnimation()
        gameFinished = true
    }
}

