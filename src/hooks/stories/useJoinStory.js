import { put } from '../../fetch'

export const useJoinStory = () => {
  const join = async (story_id) => {
    const payload = {
      id: story_id,
    }

    const response = await put('/stories/join', payload)
    return response
  }

  return { join }
}
