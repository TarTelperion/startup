const {WebsocketServer} = require('ws')
const uuid = require('uuid')

function websocket(server) {
    const wss = new WebsocketServer({ noServer: true })

    server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            ws.emit('connection', ws, request)
        })
    })
}

let connections = []

wss.on('connection', (ws) => {
    const connection = {id : uuid.v4, live : true, ws : ws}
    connections.push(connection)

    ws.on('message', function send(story) {
        connections.forEach((user) => {
            if (user.id !== connection.id) {
                user.ws.send(story)
            }
        })
    })

    ws.on('close', () => {
        const index = connections.findIndex((o, i) => o.id === connection.id)

        if (index >= 0) {
            connections.splice(index, 1)
        }
    })

    ws.on('pong', () => {
        connection.live = true
    })

    setInterval(() => {
        connections.forEach((connect) => {
            if (!connect.live) {
                connect.ws.terminate()
            } else {
                connect.live = false
                connect.ws.ping()
            }
        })
    }, 10000)
})

module.exports = { websocket }
