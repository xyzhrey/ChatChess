let localStream = null

async function startVoiceChat() {

    try {

        localStream = await navigator.mediaDevices.getUserMedia({
            audio: true
        })

        console.log("Voice chat enabled")

    }
    catch (error) {
        console.error(error)
    }
}

const voiceButton = document.getElementById("voice-btn")

voiceButton.addEventListener("click", () => {
    startVoiceChat()
})
