import { clearPromise } from './fetchOnce'
import { processError } from './processError'

const getResponse = (response) => {
  return response.status === 204 ? Promise.resolve('') : response.json()
}

export const processResponse = async (resolve, reject, response, url) => {
  if (response.ok) {
    clearPromise(url)
    const resolvedResponse = await getResponse(response)
    resolve(resolvedResponse)
  } else {
    await processError(response, reject)
    clearPromise(url)
  }
}
