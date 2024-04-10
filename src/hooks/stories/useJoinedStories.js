import useSWR from 'swr'
import { get } from '../../fetch'

export const useJoinedStories = (userId) => {
  const { data, isLoading, isValidating, error } = useSWR(
    '/user/stories',
    async (url) => {
      const stories = await get(url)
      return stories.map((story) => {
        story.isCurrentUser =
          userId === story.owner || story.joined.includes(userId)
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
