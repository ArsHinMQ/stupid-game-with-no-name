'use strict'

let splashesUsed = []

const gameLoseAnimation = () => {
    document.querySelector('#gameLoseBoard').classList.add('show')
    const interval = setInterval(() => {
        if (splashesUsed.length === 3) {
            clearInterval(interval)
            return
        }
        getBlood()
    }, 500)
}

const gameWinAnimation = () => {
    document.querySelector('#gameWinBoard').classList.add('show')
}

function getBlood() {
    let randomNumber = Math.floor(Math.random() * 3);

    while (splashesUsed.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * 3);
    }

    let chosenNumber = randomNumber;

    if (chosenNumber === 0) {
        Blood1();
    } else if (chosenNumber === 1) {
        Blood2();
    } else if (chosenNumber === 2) {
        Blood3();
    }

    splashesUsed.push(chosenNumber);
}


//GETTING THE SPLASH OF BLOOD 1
function Blood1() {
    document.getElementById("splash-1-fade").beginElement()
    document.getElementById("splash-1a-drip").beginElement()
    document.getElementById("splash-1b-drip").beginElement()
}


//GETTING THE SPLASH OF BLOOD 2
function Blood2() {
    document.getElementById("splash-2-fade").beginElement()
    document.getElementById("splash-2-drip").beginElement()
}

//GETTING THE SPLASH OF BLOOD 3
function Blood3() {
    document.getElementById("splash-3-fade").beginElement()
    document.getElementById("splash-3-drip").beginElement()
}