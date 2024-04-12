let client

const createWebsocket = () => {
  let port = window.location.port
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss'

  if (!client) {
    client = new WebSocket(
      `${protocol}://${window.location.hostname}:${port}/ws`
    )
    client.onopen = (e) => {
      console.log('connected to ws')
      client.send('checking backend')
    }
    return client
  } else {
    return client
  }
}

export default createWebsocket
