import { post } from '../fetch/post'

export const useLogin = () => {
  const login = async (payload) => {
    const response = await post('/auth/login', payload)
    console.log('response', response)

    return response
  }

  return { login }
}
