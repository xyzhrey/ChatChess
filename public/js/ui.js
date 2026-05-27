function showNotification(message) {

    const notification =
        document.createElement("div")

    notification.classList.add(
        "notification"
    )

    notification.innerText = message

    document.body.appendChild(
        notification
    )

    setTimeout(() => {
        notification.remove()
    }, 3000)
}

function disableBoard() {

    $("#board .square-55d63").css(
        "pointer-events",
        "none"
    )
}

function enableBoard() {

    $("#board .square-55d63").css(
        "pointer-events",
        "auto"
    )
}

function clearMoves() {

    document.getElementById(
        "moves"
    ).innerHTML = ""
}
