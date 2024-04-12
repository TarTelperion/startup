import { io } from 'socket.io-client'
let client

const getSocketConnection = () => {
  if (client) {
    return client
  }
  client = io('ws://localhost:4000')
  client.on('connect', () => {
    console.log('client side connection')
  })
  return client
}

export default getSocketConnection
