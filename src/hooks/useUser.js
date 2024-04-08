import useSWR from 'swr'
import { get } from '../fetch/get'
import { del } from '../fetch/del'

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

  return {
    user: data,
    isFetching: isValidating,
    isLoading: (!error && !data) || isLoading,
    isError: error,
    logout,
  }
}
