const { Chess } = require("chess.js")

const games = {}

function createGame(roomId) {

    games[roomId] = new Chess()
}

function getGame(roomId) {

    return games[roomId]
}

module.exports = {

    createGame,

    getGame
}
