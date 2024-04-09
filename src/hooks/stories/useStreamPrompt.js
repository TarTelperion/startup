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
    async (genre) => {
      setStarted(true)
      updateValue('')

      if (!inputRef.current) {
        console.warn('InputRef not set')
        return
      }

      try {
        const response = await fetch(`${API.url}/generate-prompt`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ genre: genre || '' }),
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

      // try {
      //   console.log('try', { ...Object.keys(inputRef.current) })
      //   inputRef.current.value = valueRef.current

      //   const response = await fetch(`${API.url}/generate-prompt`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       genre: genre || '',
      //     }),
      //   })

      //   const streamToRef = async (body) => {
      //     const reader = body?.pipeThrough(new TextDecoderStream()).getReader()

      //     valueRef.current = ''
      //     inputRef.current.value = valueRef.current
      //     while (reader) {
      //       let stream = await reader.read()
      //       if (stream.done) break

      //       const chunks = stream.value
      //         .replaceAll(/^data: /gm, '')
      //         .split('\n')
      //         .filter((c) => Boolean(c.length) && c !== '[DONE]')
      //         .map((c) => {
      //           console.log('c', c)
      //           return c ? JSON.parse(c) : null
      //         })
      //         .filter((c) => c)

      //       if (chunks) {
      //         for (let chunk of chunks) {
      //           const content = chunk.choices[0].delta.content
      //           if (!content) continue

      //           valueRef.current += content
      //           inputRef.current.value = valueRef.current
      //         }
      //       }
      //     }
      //   }

      //   await streamToRef(response.body)
      //   if (onComplete) onComplete(valueRef.current)
      // } catch (err) {
      //   console.log(err)
      //   valueRef.current = "I'm sorry, there was an error."
      //   if (inputRef.current) {
      //     inputRef.current.value = valueRef.current
      //   }
      // } finally {
      //   valueRef.current = ''
      // }
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
