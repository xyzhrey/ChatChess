let localStream = null

let peerConnection = null

const configuration = {

    iceServers: [

        {
            urls:
            "stun:stun.l.google.com:19302"
        }
    ]
}

async function initializeVoice() {

    if (localStream) {
        return
    }

    localStream =
        await navigator
            .mediaDevices
            .getUserMedia({

                audio: true
            })

    console.log(
        "Microphone enabled"
    )

    createPeerConnection()

    localStream
        .getTracks()
        .forEach(track => {

            peerConnection.addTrack(
                track,
                localStream
            )
        })
}

function createPeerConnection() {

    peerConnection =
        new RTCPeerConnection(
            configuration
        )

    peerConnection.onicecandidate =
        (event) => {

            if (event.candidate) {

                socket.emit(
                    "ice-candidate",
                    event.candidate
                )
            }
        }

    peerConnection.ontrack =
        (event) => {

            console.log(
                "Received remote audio"
            )

            const remoteAudio =
                document.getElementById(
                    "remote-audio"
                )

            remoteAudio.srcObject =
                event.streams[0]

            remoteAudio.play()
        }
}

async function startVoiceChat() {

    if (playerColor !== "white") {

        alert(
            "White initiates voice chat"
        )

        return
    }

    await initializeVoice()

    socket.emit(
        "voice-request"
    )
}

socket.on(
    "voice-request",
    async () => {

        const accepted =
            confirm(
                "Accept voice chat?"
            )

        if (!accepted) {
            return
        }

        await initializeVoice()

        socket.emit(
            "voice-accepted"
        )
    }
)

socket.on(
    "voice-accepted",
    async () => {

        const offer =
            await peerConnection
                .createOffer()

        await peerConnection
            .setLocalDescription(
                offer
            )

        socket.emit(
            "voice-offer",
            offer
        )
    }
)

socket.on(
    "voice-offer",
    async (offer) => {

        await peerConnection
            .setRemoteDescription(
                offer
            )

        const answer =
            await peerConnection
                .createAnswer()

        await peerConnection
            .setLocalDescription(
                answer
            )

        socket.emit(
            "voice-answer",
            answer
        )
    }
)

socket.on(
    "voice-answer",
    async (answer) => {

        await peerConnection
            .setRemoteDescription(
                answer
            )
    }
)

socket.on(
    "ice-candidate",
    async (candidate) => {

        try {

            await peerConnection
                .addIceCandidate(
                    candidate
                )
        }

        catch (error) {

            console.error(error)
        }
    }
)

const voiceButton =
    document.getElementById(
        "voice-btn"
    )

voiceButton.addEventListener(
    "click",
    startVoiceChat
)
