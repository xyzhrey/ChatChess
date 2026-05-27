updateStatus()
updateTimers()

const joinButton =
    document.getElementById(
        "join-room-btn"
    )

joinButton.addEventListener(
    "click",
    () => {

        const roomId =
            document.getElementById(
                "room-input"
            ).value

        if (!roomId) {

            showNotification(
                "Enter room ID"
            )

            return
        }

        socket.emit(
            "join-room",
            roomId
        )

        showNotification(
            `Joined room ${roomId}`
        )
    }
)

console.log("Frontend loaded")
