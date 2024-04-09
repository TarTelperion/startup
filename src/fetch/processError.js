export const processError = async (response, reject) => {
  switch (response.status) {
    case 401:
      reject({
        status: response.status,
        message: 'User is not authenticated',
        code: 401,
      })
      return
    case 403:
      reject({
        status: response.status,
        message: 'User is not authorized',
      })
      return
    case 404:
      reject({
        status: response.status,
        message: 'Resource was not found',
      })
      return
    default: {
      const error = await response.text()
      let errorMessage

      try {
        errorMessage = getErrorMessage(JSON.parse(error)) || error
      } catch {
        errorMessage = getErrorMessage(error)
      }

      if (response.status === 500 && errorMessage === 'jwt expired') {
        reject({
          status: 401,
          message: 'User is not authorized',
        })
      }

      if (Array.isArray(errorMessage)) {
        errorMessage = errorMessage.join(', ')
      }
      reject({
        status: response.status,
        message: errorMessage,
      })
    }
  }
}

const getErrorMessage = (error) => {
  if (error.error) return error.error
  if (error.errors) return error.errors
  if (error.message) return error.message

  return ''
}
