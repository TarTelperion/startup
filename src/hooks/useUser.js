import useSWR from 'swr'
import { get } from '../fetch/get'

export const useUser = () => {
  const { data, error } = useSWR('/api/auth', async (url) => {
    return get(url)
  })

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}
