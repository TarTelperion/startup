import { useCallback, useEffect } from 'react'
import { useSocket } from './useSocket'

export const useSocketMessage = (handler, actionName) => {
  const socket = useSocket()

  const subscription = useCallback(
    (payload) => {
      let result
      try {
        result = JSON.parse(payload)
      } catch (err) {
        result = { user: {}, data: {} }
      }
      handler(result.data, result.user)
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
