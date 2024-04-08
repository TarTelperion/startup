import { del } from '../../fetch/del'

export const useLogout = () => {
  const logout = async () => {
    const response = await del('/auth/logout')
    console.log('response', response)
    return response
  }

  return { logout }
}
