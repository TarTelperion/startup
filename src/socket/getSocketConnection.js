import { io } from 'socket.io-client'

let client

const getSocketConnection = () => {
  if (client) {
    return client
  }

  client = io('http://localhost:4000')
  client.emit('handshake', 'connection established')

  return client
}

export default getSocketConnection
