let whiteTime = 300
let blackTime = 300

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60)

    const remainingSeconds =
        seconds % 60

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

function updateTimers() {

    document.getElementById(
        "white-timer"
    ).innerText = formatTime(whiteTime)

    document.getElementById(
        "black-timer"
    ).innerText = formatTime(blackTime)
}

setInterval(() => {

    if (game.game_over()) {
        return
    }

    if (game.turn() === 'w') {
        whiteTime--
    }
    else {
        blackTime--
    }

    updateTimers()

}, 1000)
