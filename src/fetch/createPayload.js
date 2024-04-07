export const createPayload = (method, body) => {
  const payload = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return body ? { ...payload, body: JSON.stringify(body) } : payload
}
