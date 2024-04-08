import fetch from 'isomorphic-fetch'
import { API } from '../config'
import { createPayload } from './createPayload'
import { fetchOnce, clearPromise } from './fetchOnce'
import { processResponse } from './processResponse'
import { combine } from './combine'

export const get = async (url, options = {}) => {
  const { hostname, headers = {} } = options

  return fetchOnce(url, () => {
    const payload = createPayload('GET', null, headers)

    const promise = new Promise((resolve, reject) => {
      return fetch(combine(hostname ?? API.url, url), payload)
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
