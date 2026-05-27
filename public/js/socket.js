const socket = io()

let playerColor = "white"

socket.on("connect", () => {

    console.log(
        "Connected to server"
    )
})

socket.on(
    "color-assigned",
    (color) => {

        playerColor = color

        console.log(
            `Assigned ${color}`
        )

        if (color === "black") {

            board.orientation(
                "black"
            )

            document.getElementById(
                "top-player"
            ).innerText = "White"

            document.getElementById(
                "bottom-player"
            ).innerText = "Black"
        }
    }
)

socket.on(
    "room-full",
    () => {

        alert("Room full")
    }
)
