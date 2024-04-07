import fetch from 'isomorphic-fetch'
import { API } from '../config'

export const get = async (url) => {
  return fetchOnce(url, () => {})
}
