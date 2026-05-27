const {

    createRoom,

    roomExists,

    addPlayerToRoom,

    getRoom

} = require("../rooms/roomManager")

const {

    createGame,

    getGame

} = require("../game/gameManager")

function registerGameSocket(io, socket) {

    console.log(
        `Socket connected: ${socket.id}`
    )

    socket.on("join-room", (roomId) => {

        try {

            if (!roomExists(roomId)) {

                createRoom(roomId)

                createGame(roomId)
            }

            const room =
                getRoom(roomId)

            if (
                Object.keys(room.players)
                    .length >= 2
            ) {

                socket.emit(
                    "room-full"
                )

                return
            }

            socket.join(roomId)

            const playerCount =
                Object.keys(room.players)
                    .length

            const color =
                playerCount === 0
                    ? "white"
                    : "black"

            addPlayerToRoom(
                roomId,
                socket.id,
                color
            )

            console.log(
                `${socket.id} joined ${roomId}`
            )

            socket.emit(
                "color-assigned",
                color
            )

            io.to(roomId).emit(
                "player-count",
                Object.keys(
                    room.players
                ).length
            )

            socket.on("move", (move) => {

                try {

                    const game =
                        getGame(roomId)

                    const playerColor =
                        room.players[
                            socket.id
                        ]

                    const currentTurn =
                        game.turn() === "w"
                            ? "white"
                            : "black"

                    if (
                        playerColor !==
                        currentTurn
                    ) {

                        socket.emit(
                            "not-your-turn"
                        )

                        return
                    }

                    if (
                        !move ||
                        !move.from ||
                        !move.to
                    ) {

                        socket.emit(
                            "invalid-move"
                        )

                        return
                    }

                    const validSquares = [

                        "a1","a2","a3","a4","a5","a6","a7","a8",

                        "b1","b2","b3","b4","b5","b6","b7","b8",

                        "c1","c2","c3","c4","c5","c6","c7","c8",

                        "d1","d2","d3","d4","d5","d6","d7","d8",

                        "e1","e2","e3","e4","e5","e6","e7","e8",

                        "f1","f2","f3","f4","f5","f6","f7","f8",

                        "g1","g2","g3","g4","g5","g6","g7","g8",

                        "h1","h2","h3","h4","h5","h6","h7","h8"
                    ]

                    if (
                        !validSquares.includes(
                            move.from
                        ) ||

                        !validSquares.includes(
                            move.to
                        )
                    ) {

                        socket.emit(
                            "invalid-move"
                        )

                        return
                    }

                    const result =
                        game.move(move)

                    if (result === null) {

                        socket.emit(
                            "invalid-move"
                        )

                        return
                    }

                    io.to(roomId).emit(
                        "move",
                        {
                            move,
                            fen: game.fen(),
                            history:
                                game.history()
                        }
                    )
                }

                catch (error) {

                    console.error(error)

                    socket.emit(
                        "invalid-move"
                    )
                }
            })

            socket.on(
                "voice-request",
                () => {

                    socket.to(roomId).emit(
                        "voice-request"
                    )
                }
            )

            socket.on(
                "voice-accepted",
                () => {

                    socket.to(roomId).emit(
                        "voice-accepted"
                    )
                }
            )

            socket.on(
                "voice-offer",
                (offer) => {

                    socket.to(roomId).emit(
                        "voice-offer",
                        offer
                    )
                }
            )

            socket.on(
                "voice-answer",
                (answer) => {

                    socket.to(roomId).emit(
                        "voice-answer",
                        answer
                    )
                }
            )

            socket.on(
                "ice-candidate",
                (candidate) => {

                    socket.to(roomId).emit(
                        "ice-candidate",
                        candidate
                    )
                }
            )
            socket.on(
    "chat-message",
    (message) => {

        const room =
            getRoom(roomId)

        const sender =
            room.players[
                socket.id
            ]

        io.to(roomId).emit(
            "chat-message",
            {
                sender,
                message
            }
        )
    }
)
        }

        catch (error) {

            console.error(error)
        }
    })

    socket.on("disconnect", () => {

        console.log(
            `Disconnected: ${socket.id}`
        )
    })
}

module.exports =
    registerGameSocket
