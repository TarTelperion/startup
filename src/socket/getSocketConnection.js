let client

const getSocketConnection = async () => {
  if (client) {
    return client
  } else {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss'
    client = new WebSocket(`${protocol}://${window.location.host}/ws`)
    client.onopen = () => {
      console.log('connected')
    }
    return client
  }
}

export default getSocketConnection
