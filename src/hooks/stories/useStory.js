import useSWR from 'swr'
import { get, put } from '../../fetch'

const fetcher = async (url) => get(url)

export const useStory = ({ storyId }) => {
  const { data, error, isLoading, isValidating } = useSWR(
    `/stories?id=${storyId}`,
    fetcher,
    { shouldRetryOnError: false }
  )

  const update = async ({ content }) => {
    const response = await put(`/stories/update/${storyId}`, {
      content,
    })
    return response
  }

  const skip = async () => {
    const response = await put(`/stories/skip/${storyId}`)
    return response
  }

  return {
    story: data,
    isFetching: isValidating,
    isLoading: (!error && !data) || isLoading,
    isError: error,
    update,
    skip,
  }
}
