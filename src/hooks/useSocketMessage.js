import { useCallback, useEffect } from 'react'
import { useSocket } from './useSocket'

export const useSocketMessage = (handler, actionName) => {
  const socket = useSocket()

  const subscription = useCallback(
    (payload) => {
      handler(payload)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [actionName]
  )

  useEffect(() => {
    if (socket) {
      console.log('subscribing to:', actionName)
      socket.on(actionName, subscription)
      return () => {
        console.log('unsubscribing from:', actionName)
        socket.off(actionName, subscription)
      }
    }
  }, [subscription, socket, actionName])
}
