import { useGlobalStories } from './useGlobalStories'

export const useMyStories = (userId) => {
  const result = useGlobalStories(userId)
  console.log('stories', result)
  return {
    ...result,
    stories: result.stories.filter((story) => story.isOwner || story.isJoined),
  }
}
