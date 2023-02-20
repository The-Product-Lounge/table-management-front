import { userService } from '../../services/user.service'

const initialState = {
  user: userService.getLoggedInUser(),
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      state = { ...state, user: action.user }
      break

    default:
      return state
  }

  // For debug:
  window.userState = state
  return state
}
