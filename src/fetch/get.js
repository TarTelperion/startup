import fetch from 'isomorphic-fetch'
import { API } from '../config'
import { createPayload } from './createPayload'
import { fetchOnce, clearPromise } from './fetchOnce'
import { processResponse } from './processResponse'
import { combine } from './combine'

export const get = async (url) => {
  return fetchOnce(url, () => {
    const payload = createPayload('GET')

    const promise = new Promise((resolve, reject) => {
      return fetch(combine(API.url, url), payload)
        .then((response) => {
          processResponse(resolve, reject, response, url)
        })
        .catch(() => {
          clearPromise(url)
          reject({ status: -1, message: 'Network error' })
        })
    })

    return promise
  })
}
