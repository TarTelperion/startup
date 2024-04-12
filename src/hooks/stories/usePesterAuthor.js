import { post } from '../../fetch'

export const usePesterAuthor = () => {
  const pester = async (storyId) => {
    const response = await post(`/stories/pester/${storyId}`)

    return response
  }
  return { pester }
}
