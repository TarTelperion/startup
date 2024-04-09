export const createPayload = (method, body, headers = {}) => {
  const payload = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  return body ? { ...payload, body: JSON.stringify(body) } : payload
}
