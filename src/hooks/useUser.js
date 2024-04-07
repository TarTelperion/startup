import useSWR from 'swr'
import { get } from '../fetch/get'

const fetcher = async (url) => get(url)

export const useUser = () => {
  const { data, error, isLoading, isValidating } = useSWR('/auth', fetcher, {
    shouldRetryOnError: false,
  })

  return {
    user: data,
    isFetching: isValidating,
    isLoading: (!error && !data) || isLoading,
    isError: error,
  }
}
