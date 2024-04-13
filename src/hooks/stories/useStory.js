import { enqueueSnackbar } from 'notistack'
import useSWR, { mutate as globalMutate } from 'swr'
import { del, get, put } from '../../fetch'
import { useUser } from '../useUser'

const fetcher = async (url) => get(url)

export const useStory = ({ storyId }, options) => {
  const { user } = useUser()
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    storyId ? `/stories?id=${storyId}` : null,
    fetcher,
    { ...options, shouldRetryOnError: false }
  )

  let story = data
  if (story) {
    story.isOwner = user?._id === story.owner
    story.isJoined = !story.isOwner && story.joined.includes(user?._id)
  }

  const update = async ({ content }) => {
    const response = await put(`/stories/update/${storyId}`, {
      content,
    })
    mutate()
    enqueueSnackbar('Story updated!', { variant: 'success' })
    return response
  }

  const skip = async () => {
    const response = await put(`/stories/skip/${storyId}`)
    mutate()
    enqueueSnackbar('Story skipped!', { variant: 'success' })
    return response
  }

  const join = async (storyId) => {
    const response = await put('/stories/join', { id: storyId })
    await globalMutate('/stories/global')
    await mutate()
    enqueueSnackbar('Story joined!', { variant: 'success' })
    return response
  }

  const leave = async (storyId) => {
    const response = await put(`/stories/leave/${storyId}`)
    await globalMutate('/stories/global')
    await mutate()
    enqueueSnackbar('You left the story!', { variant: 'success' })
    return response
  }

  const remove = async (storyId) => {
    const response = await del('/stories', { id: storyId })
    await globalMutate('/stories/global')
    await mutate()
    enqueueSnackbar('Story deleted!', { variant: 'success' })
    return response
  }

  return {
    story: data,
    isFetching: isValidating,
    isLoading: (!error && !data) || isLoading,
    isError: error,
    update,
    skip,
    join,
    leave,
    remove,
  }
}
