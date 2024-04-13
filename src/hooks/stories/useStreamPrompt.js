import { useCallback, useMemo, useRef, useState } from 'react'
import { API } from '../../config'

export const useStreamPrompt = (onComplete) => {
  const [complete, setComplete] = useState(false)
  const [started, setStarted] = useState(false)
  const [error, setError] = useState(false)

  const valueRef = useRef('')
  const inputRef = useRef()

  const updateValue = useCallback((value, options = {}) => {
    const { updateInput = true } = options
    valueRef.current = value

    if (updateInput && inputRef.current) {
      inputRef.current.value = value
    }
  }, [])

  const start = useCallback(
    async ({ genre, title }) => {
      setStarted(true)
      updateValue('')

      if (!inputRef.current) {
        console.warn('InputRef not set')
        return
      }

      try {
        const response = await fetch(`${API.url}/generate-prompt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ genre: genre || '', title }),
        })

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let loop = true

        while (loop) {
          const { done, value } = await reader.read()
          if (done) {
            loop = false
            break
          }

          const decodedChunk = decoder.decode(value, { stream: true })

          updateValue(valueRef.current + decodedChunk)
        }

        setStarted(false)
        setComplete(true)
        setError(false)
      } catch (err) {
        console.error(err)
        setError(false)
      } finally {
        onComplete && onComplete(valueRef.current)
        updateValue('', { updateInput: false })
        setComplete(true)
        setStarted(false)
      }
    },
    [
      inputRef,
      valueRef,
      setStarted,
      setComplete,
      setError,
      onComplete,
      updateValue,
    ]
  )

  const result = useMemo(() => {
    return {
      start,
      isStarted: started,
      isComplete: complete,
      isError: error,
      currentValue: valueRef.current,
    }
  }, [start, started, complete, error])

  return [{ ref: inputRef }, result]
}
