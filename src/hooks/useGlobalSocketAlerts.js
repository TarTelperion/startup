import { enqueueSnackbar } from 'notistack'
import { useSocketMessage } from './useSocketMessage'

export const useGlobalSocketAlerts = (userId) => {
  useSocketMessage((payload, from) => {
    if (userId === payload.story.owner) return

    enqueueSnackbar(`New story by ${from.name}: ${payload.story.title}`, {
      variant: 'info',
    })
  }, 'story-create')

  useSocketMessage((payload, from) => {
    const lastUpdate =
      payload.story.additions[payload.story.additions.length - 1] ?? {}
    const lastUpdatedBy = lastUpdate.authorId

    if (userId === lastUpdatedBy) return

    const isRelevant = payload.story.joined.includes(userId)
    if (!isRelevant) return

    enqueueSnackbar(
      `New story update by ${from.name}: ${payload.story.title}`,
      { variant: 'info' }
    )
  }, 'story-edit')

  useSocketMessage((payload, from) => {
    const target = payload.target.id
    if (userId !== target) return

    enqueueSnackbar(
      `${from.name} is asking you to write: ${payload.story.title}`,
      { variant: 'info' }
    )
  }, 'story-pester')
}
