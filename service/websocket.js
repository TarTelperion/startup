const { WebSocketServer } = require('ws')
const uuid = require('uuid')

function websocket(httpServer) {
  const wss = new WebSocketServer({ noServer: true })

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request)
    })
  })

  let connections = []

  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), live: true, ws: ws }
    console.log('connected', connection.id)
    connections.push(connection)

    console.log('live connections', connections)
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
        connect.live = false
        connect.ws.ping()
      })
    }, 5000)
  })
}

module.exports = { websocket }
