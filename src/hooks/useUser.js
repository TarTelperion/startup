import useSWR from 'swr'
import { del, get, post } from '../fetch'

const fetcher = async (url) => get(url)

export const useUser = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    '/auth',
    fetcher,
    { shouldRetryOnError: false }
  )

  const logout = async () => {
    await del('/auth/logout')
    await mutate(null, false)
  }

  const login = async (payload) => {
    const response = await post('/auth/login', payload)
    await mutate(response)
  }

  return {
    user: data,
    isLoggedIn: !!data,
    isFetching: isValidating,
    isLoading: (!error && !data) || isLoading,
    isError: error,
    logout,
    login,
  }
}
