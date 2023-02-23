import { userService } from '../../services/user.service'

export function setUser(user) {
  return async (dispatch) => {
    try {
      userService.setUserInStorage(user)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log(`Cannot signup`, err)
      throw err
    }
  }
}

export function logoutUser() {
  return async (dispatch) => {
    try {
      userService.removeUserFromStorage()
      dispatch({ type: 'SET_USER', user: null })
    } catch (err) {
      console.log(`Cannot signup`, err)
      throw err
    }
  }
}
