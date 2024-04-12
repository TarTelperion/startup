let client

const getSocketConnection = async () => {
  if (client) {
    return client
  }

  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss'
  client = new WebSocket(`${protocol}://${window.location.host}/ws`)

  client.onopen = () => {
    console.log('socket connection opened!')
  }

  return client
}

export default getSocketConnection
