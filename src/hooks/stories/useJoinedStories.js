import { useGlobalStories } from './useGlobalStories'

export const useJoinedStories = (userId) => {
  const result = useGlobalStories(userId)
  return {
    ...result,
    stories: result.stories.filter((story) => story.isJoined),
  }
}
