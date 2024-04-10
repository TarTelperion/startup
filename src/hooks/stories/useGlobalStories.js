import useSWR from 'swr'
import { get } from '../../fetch'

export const useGlobalStories = (userId) => {
  const { data, isLoading, isValidating, error } = useSWR(
    '/stories/global',
    async (url) => {
      const stories = await get(url)
      return stories.map((story) => {
        story.isOwner = userId === story.owner
        story.isJoined = story.joined.includes(userId)
        return story
      })
    }
  )

  return {
    stories: data ?? [],
    isLoading: !isLoading && !data,
    isFetching: isValidating,
    isError: error,
  }
}
