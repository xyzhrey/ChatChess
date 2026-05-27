const rooms = {}

function createRoom(roomId) {

    rooms[roomId] = {

        players: {},

        gameState: null
    }
}

function roomExists(roomId) {

    return rooms[roomId]
}

function addPlayerToRoom(
    roomId,
    socketId,
    color
) {

    rooms[roomId]
        .players[socketId] = color
}

function getRoom(roomId) {

    return rooms[roomId]
}

module.exports = {

    rooms,

    createRoom,

    roomExists,

    addPlayerToRoom,

    getRoom
}
