import { del } from '../../fetch'

export const useDeleteStory = () => {
  const remove = async (storyId) => {
    const payload = {
      id: storyId,
    }

    const response = await del('/stories', payload)
    return response
  }

  return { remove }
}
