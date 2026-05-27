const express = require("express")

const http = require("http")

const { Server } = require("socket.io")

const registerGameSocket =
    require("./sockets/gameSocket")

const app = express()

const server =
    http.createServer(app)

const io = new Server(server)

app.use(express.static("public"))

app.get("/test", (req, res) => {

    res.send("working")
})
io.on("connection", (socket) => {

    registerGameSocket(
        io,
        socket
    )
})

const PORT =
    process.env.PORT || 3000

server.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `Server running on ${PORT}`
        )
    }
)

