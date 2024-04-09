export const createWebsocket = async (
  protocol,
  host,
  send_alert = (alert) => console.log(alert)
) => {
  const socket = new WebSocket(`${protocol}://${host}/ws`)
  socket.onopen = () => {
    console.log('websocket created')
  }
  socket.onmessage = async (event) => {
    update_content()
    console.log(event.data)
    const msg = JSON.parse(event.data)
    if (msg.destination) {
      if (msg.destination == user._id) {
        send_alert(msg.user, msg.type, msg.title)
      } else {
        return
      }
    } else {
      send_alert(msg.user, msg.type, msg.title)
    }
  }
  return {
    socket: socket,
    broadcast: (message) => {
      socket.send(message)
    },
  }
}
