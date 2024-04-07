import useSWR from 'swr'
import { get } from '../fetch/get'

export const useUser = () => {
  const { data, error } = useSWR('/auth', async (url) => {
    try {
      const result = await get(url)
      console.log('result', result)
    } catch (e) {
      console.log('error', e)
    }
    return result
  })

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}
