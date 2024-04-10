import { useGlobalStories } from './useGlobalStories'

export const useOwnedStories = (userId) => {
  const result = useGlobalStories(userId)
  return {
    ...result,
    stories: result.stories.filter((story) => story.isOwner),
  }
}
