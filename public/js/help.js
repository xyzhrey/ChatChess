window.addEventListener(
    "DOMContentLoaded",
    () => {

        const helpBtn =
            document.getElementById(
                "help-btn"
            )

        const helpModal =
            document.getElementById(
                "help-modal"
            )

        const closeHelp =
            document.getElementById(
                "close-help"
            )

        helpBtn.addEventListener(
            "click",
            () => {

                helpModal.style.display =
                    "block"
            }
        )

        closeHelp.addEventListener(
            "click",
            () => {

                helpModal.style.display =
                    "none"
            }
        )
    }
)
