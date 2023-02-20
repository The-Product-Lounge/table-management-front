import { userService } from '../../services/user.service'

export function setUser(user) {
  return async (dispatch) => {
    try {
      userService.setLoggedInUser(user)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log(`Cannot signup`, err)
      throw err
    }
  }
}
