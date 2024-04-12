import { createContext, useContext } from 'react'

export const SocketContext = createContext({
  socket: null,
  setSocket: () => undefined,
})

export const useSocket = () => {
  const { socket } = useContext(SocketContext)
  return socket
}
