import { put } from '../../fetch'

export const useLeaveStory = () => {
  const leave = async (story_id) => {
    const response = await put(`/stories/join/${story_id}`)
    return response
  }

  return { leave }
}
