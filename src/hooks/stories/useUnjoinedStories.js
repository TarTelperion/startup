import { useGlobalStories } from './useGlobalStories'

export const useUnjoinedStories = (userId) => {
  const result = useGlobalStories(userId)
  return {
    ...result,
    stories: result.stories.filter(
      (story) => !story.isJoined && !story.isOwner
    ),
  }
}
