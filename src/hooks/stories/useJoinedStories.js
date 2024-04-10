import useSWR from 'swr'
import { get } from '../../fetch'

const fetcher = (url) => get(url)

export const useJoinedStories = () => {
  const { data, isLoading, isValidating, error } = useSWR(
    '/user/stories',
    fetcher
  )
  console.log('stat', data)

  return {
    stories: data || [],
    isLoading: !isLoading && !data,
    isFetching: isValidating,
    isError: error,
  }
}
