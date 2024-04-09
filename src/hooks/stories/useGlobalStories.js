import useSWR from 'swr'
import { get } from '../../fetch'

const fetcher = (url) => get(url)

export const useGlobalStories = () => {
  const { data, isLoading, isValidating, error } = useSWR(
    '/stories/global',
    fetcher
  )

  return {
    globalStories: data || [],
    isLoading: !isLoading && !data,
    isFetching: isValidating,
    isError: error,
  }
}
