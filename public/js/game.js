const game = new Chess()

function updateStatus() {

    const status =
        document.getElementById("status")

    if (game.in_checkmate()) {

        status.innerText =
            "Checkmate"
    }

    else if (game.in_draw()) {

        status.innerText =
            "Draw"
    }

    else {

        const currentTurn =
            game.turn() === 'w'
                ? "White"
                : "Black"

        status.innerText =
            `${currentTurn} to move`

        if (game.in_check()) {

            status.innerText +=
                " - Check"
        }
    }
}
function checkGameOver() {

    if (game.in_checkmate()) {

        const winner =
            game.turn() === "w"
                ? "Black"
                : "White"

        alert(
            `${winner} wins by checkmate`
        )
    }

    else if (game.in_draw()) {

        alert("Game drawn")
    }
}
function updateMoveList() {

    const movesDiv =
        document.getElementById("moves")

    movesDiv.innerHTML = ""

    for (
        let i = 0;
        i < moveHistory.length;
        i += 2
    ) {

        const moveElement =
            document.createElement("div")

        const whiteMove =
            moveHistory[i]

        const blackMove =
            moveHistory[i + 1] || ""

        moveElement.innerText =
            `${(i / 2) + 1}. ${whiteMove} ${blackMove}`

        movesDiv.appendChild(
            moveElement
        )
    }
}
