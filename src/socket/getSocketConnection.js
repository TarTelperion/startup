import { io } from 'socket.io-client'

let client

const getSocketConnection = () => {
  if (client) {
    return client
  }

  client = io()
  client.emit('handshake', 'connection established')

  return client
}

export default getSocketConnection
