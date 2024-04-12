import { mutate } from 'swr'
import { put } from '../../fetch'

export const useLeaveStory = () => {
  const leave = async (story_id) => {
    const response = await put(`/stories/leave/${story_id}`)
    await mutate('/stories/global')

    return response
  }

  return { leave }
}
