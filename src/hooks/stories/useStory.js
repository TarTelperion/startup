import useSWR from 'swr'
import { get, put } from '../../fetch'

const fetcher = async (url) => get(url)

export const useStory = (id) => {
  const { data, error, isLoading, isValidating } = useSWR(
    `/stories?id=${id}`,
    fetcher,
    { shouldRetryOnError: false }
  )

  const update = async (payload, id) => {
    const response = await put(`/stories/update?id=${id}`, payload)
    return response
  }

  return {
    story: data,
    isFetching: isValidating,
    isLoading: (!error && !data) || isLoading,
    isError: error,
    update,
  }
}
