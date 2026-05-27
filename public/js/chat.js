function sendMessage() {

    const input =
        document.getElementById(
            "chat-input"
        )

    const message =
        input.value.trim()

    if (!message) {
        return
    }

    socket.emit(
        "chat-message",
        message
    )

    input.value = ""
}

function addMessage(sender, message) {

    const messagesDiv =
        document.getElementById(
            "chat-messages"
        )

    const messageElement =
        document.createElement("div")

    messageElement.classList.add(
        "chat-message"
    )

    messageElement.innerText =
        `${sender}: ${message}`

    messagesDiv.appendChild(
        messageElement
    )

    messagesDiv.scrollTop =
        messagesDiv.scrollHeight
}

socket.on(
    "chat-message",
    (data) => {

        addMessage(
            data.sender,
            data.message
        )
    }
)

document
    .getElementById(
        "send-btn"
    )
    .addEventListener(
        "click",
        sendMessage
    )

document
    .getElementById(
        "chat-input"
    )
    .addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter"
            ) {

                sendMessage()
            }
        }
    )
