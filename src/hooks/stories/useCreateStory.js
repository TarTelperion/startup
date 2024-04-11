import { post } from '../../fetch'
import { useUser } from '../useUser'

export const useCreateStory = () => {
  const { user } = useUser()

  const create = async ({ title, genre, prompt }) => {
    const payload = {
      title: title,
      genre: genre,
      prompt: prompt,
      owner: user._id,
      joined: [user._id],
    }

    const response = await post('/stories/add', payload)
    return response
  }
  return { create }
}
