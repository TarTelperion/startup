const {WebSocketServer} = require('ws')
const uuid = require('uuid')

function websocket(server) {
    const wss = new WebSocketServer({ noServer: true })

    server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
          wss.emit('connection', ws, request);
        });
      });


let connections = []

wss.on('connection', (ws) => {
    const connection = {id : uuid.v4(), live : true, ws : ws}
    
    console.log(connection.id)
    connections.push(connection)
    

    ws.on('message', async function transmit(data) {
        const msg = String.fromCharCode(...data)
        connections.forEach((user) => {
            if (user.id != connection.id) {
                console.log(msg)
                user.ws.send(msg)
            }
        })
    })

    ws.on('close', () => {
        const pos = connections.findIndex((o, i) => o.id === connection.id)

        if (pos >= 0) {
            connections.splice(pos, 1)
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
}
module.exports = { websocket }
