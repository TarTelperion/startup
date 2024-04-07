import fetch from 'isomorphic-fetch'
import { API } from '../config'
import { createPayload } from './createPayload'
import { fetchOnce, clearPromise } from './fetchOnce'

export const get = async (url) => {
  return fetchOnce(url, () => {
    const payload = getPayload('GET')

    const promise = new Promise((resolve, reject) => {
      fetch(combine(API.url, url), payload)
        .then(response => {
          if (response.ok) {
            clearPromise(url)
            const result = 
            return response.json()
          }
          throw new Error(response.statusText)
        })
    })
  })
}
