import { useEffect, useState } from 'react'
import { SocketContext } from '../hooks/useSocket'
import getSocketConnection from '../socket/getSocketConnection'

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const client = getSocketConnection()
    setSocket(client)
  }, [])

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
