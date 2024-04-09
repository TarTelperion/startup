let urlMap = new Map()

const setPromise = (url, promise) => {
  urlMap.set(url, promise)
}

export const clearPromise = (url) => {
  urlMap.delete(url)
}

export const fetchOnce = (url, callback) => {
  let promise = urlMap.get(url)

  if (promise) {
    return promise
  }

  promise = callback()

  setPromise(url, promise)

  return promise
}
