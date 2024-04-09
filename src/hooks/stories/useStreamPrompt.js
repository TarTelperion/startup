import { useRef } from 'react'
import { API } from '../../config'

export const useStreamPrompt = (onComplete) => {
  const valueRef = useRef('')
  const inputRef = useRef()

  const start = async (genre) => {
    console.log('starting stream', genre)
    console.log('inputRef', inputRef.current)
    if (!inputRef.current) {
      console.warn('Input ref not set')
      return
    }

    valueRef.current = ''
    valueRef.current = 'Loading...'

    try {
      console.log('try', { ...Object.keys(inputRef.current) })
      inputRef.current.value = valueRef.current

      const response = await fetch(`${API.url}/generate-prompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          genre: genre || '',
        }),
      })

      const streamToRef = async (body) => {
        const reader = body?.pipeThrough(new TextDecoderStream()).getReader()

        valueRef.current = ''
        inputRef.current.value = valueRef.current
        while (reader) {
          let stream = await reader.read()
          if (stream.done) break

          const chunks = stream.value
            .replaceAll(/^data: /gm, '')
            .split('\n')
            .filter((c) => Boolean(c.length) && c !== '[DONE]')
            .map((c) => {
              console.log('c', c)
              return c ? JSON.parse(c) : null
            })
            .filter((c) => c)

          if (chunks) {
            for (let chunk of chunks) {
              const content = chunk.choices[0].delta.content
              if (!content) continue

              valueRef.current += content
              inputRef.current.value = valueRef.current
            }
          }
        }
      }

      await streamToRef(response.body)
      if (onComplete) onComplete(valueRef.current)
    } catch (err) {
      console.log(err)
      valueRef.current = "I'm sorry, there was an error."
      if (inputRef.current) {
        inputRef.current.value = valueRef.current
      }
    } finally {
      valueRef.current = ''
    }
  }

  return [{ ref: inputRef }, start]
}
