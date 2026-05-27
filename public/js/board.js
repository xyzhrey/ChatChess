let selectedSquare = null

let moveHistory = []

const board = Chessboard("board", {

    position: "start",

    draggable: true,

    pieceTheme:
        'assets/pieces/{piece}.svg',

    onDrop: onDrop,

    onSnapEnd: () => {

        board.position(game.fen())
    }
})

function sendMove(source, target) {

    socket.emit("move", {

        from: source,

        to: target,

        promotion: "q"
    })
}

function onDrop(source, target) {

    if (target === "offboard") {

        return "snapback"
    }

    sendMove(source, target)
}

function handleSquareSelection(square) {

    if (!selectedSquare) {

        selectedSquare = square

        highlightSquare(square)

        return
    }

    removeHighlights()

    sendMove(
        selectedSquare,
        square
    )

    selectedSquare = null
}

$("#board").on(
    "click",
    ".square-55d63",
    function () {

        const square =
            $(this).attr(
                "data-square"
            )

        handleSquareSelection(
            square
        )
    }
)

$("#board").on(
    "touchstart",
    ".square-55d63",
    function (event) {

        event.preventDefault()

        const square =
            $(this).attr(
                "data-square"
            )

        handleSquareSelection(
            square
        )
    }
)

function highlightSquare(square) {

    removeHighlights()

    $(
        `[data-square="${square}"]`
    ).css(
        "background",
        "#7fa650"
    )
}

function removeHighlights() {

    $(".square-55d63").css(
        "background",
        ""
    )
}

socket.on("move", (data) => {

    game.load(data.fen)

    moveHistory = data.history

    board.position(data.fen)

    updateMoveList()

    updateStatus()

    checkGameOver()
})

socket.on(
    "invalid-move",
    () => {

        board.position(game.fen())

        removeHighlights()

        selectedSquare = null
    }
)

socket.on(
    "not-your-turn",
    () => {

        alert("Not your turn")

        board.position(game.fen())

        removeHighlights()

        selectedSquare = null
    }
)
