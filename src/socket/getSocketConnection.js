import { io } from 'socket.io-client'
let client

const getSocketConnection = async () => {
  if (client) {
    return client
  }
  client = io('ws://localhost:4000')
  client.emit('handshake', 'connection established')
  return client
}

export default getSocketConnection
