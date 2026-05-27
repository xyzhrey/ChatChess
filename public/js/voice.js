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

function createPeerConnection() {

    if (peerConnection) {
        return
    }

    peerConnection =
        new RTCPeerConnection(
            configuration
        )

    peerConnection.onicecandidate =
        (event) => {

            if (event.candidate) {

                console.log(
                    "sending ice candidate"
                )

                socket.emit(
                    "ice-candidate",
                    event.candidate
                )
            }
        }

    peerConnection.ontrack =
        async (event) => {

            console.log(
                "received remote audio"
            )

            const remoteAudio =
                document.getElementById(
                    "remote-audio"
                )

            remoteAudio.srcObject =
                event.streams[0]

            try {

                await remoteAudio.play()
            }

            catch (error) {

                console.error(error)
            }
        }
}

async function initializeVoice() {

    if (localStream) {
        return
    }

    try {

        localStream =
            await navigator
                .mediaDevices
                .getUserMedia({

                    audio: true
                })

        console.log(
            "microphone enabled"
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

    catch (error) {

        console.error(error)

        alert(
            "Microphone permission denied"
        )
    }
}

async function startVoiceChat() {

    console.log(
        "voice button clicked"
    )

    if (playerColor !== "white") {

        alert(
            "White initiates voice"
        )

        return
    }

    await initializeVoice()

    console.log(
        "sending voice request"
    )

    socket.emit(
        "voice-request"
    )
}

socket.on(
    "voice-request",
    () => {

        console.log(
            "received voice request"
        )

        document.getElementById(
            "voice-popup"
        ).style.display = "block"
    }
)

socket.on(
    "voice-accepted",
    async () => {

        console.log(
            "voice accepted"
        )

        const offer =
            await peerConnection
                .createOffer()

        await peerConnection
            .setLocalDescription(
                offer
            )

        console.log(
            "sending offer"
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

        console.log(
            "received offer"
        )

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

        console.log(
            "sending answer"
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

        console.log(
            "received answer"
        )

        await peerConnection
            .setRemoteDescription(
                answer
            )
    }
)

socket.on(
    "ice-candidate",
    async (candidate) => {

        console.log(
            "received candidate"
        )

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

window.addEventListener(
    "DOMContentLoaded",
    () => {

        const acceptButton =
            document.getElementById(
                "accept-voice"
            )

        const voiceButton =
            document.getElementById(
                "voice-btn"
            )

        if (!acceptButton) {

            console.error(
                "accept-voice button missing"
            )

            return
        }

        if (!voiceButton) {

            console.error(
                "voice-btn missing"
            )

            return
        }

        acceptButton.addEventListener(
            "click",
            async () => {

                console.log(
                    "voice accepted locally"
                )

                document.getElementById(
                    "voice-popup"
                ).style.display = "none"

                await initializeVoice()

                socket.emit(
                    "voice-accepted"
                )
            }
        )

        voiceButton.addEventListener(
            "click",
            startVoiceChat
        )

        console.log(
            "voice listeners attached"
        )
    }
)
