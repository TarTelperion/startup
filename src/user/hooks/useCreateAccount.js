import { post } from '../../fetch/post'

export const useCreateAccount = () => {
  const create = async (payload) => {
    const response = await post('/auth/create', payload)
    console.log('response', response)

    return response
  }

  return { create }
}
