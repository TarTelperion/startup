import { mutate } from 'swr'
import { del } from '../../fetch'

export const useDeleteStory = () => {
  const remove = async (storyId) => {
    const payload = {
      id: storyId,
    }

    const response = await del('/stories', payload)
    await mutate('/stories/global')

    return response
  }

  return { remove }
}
