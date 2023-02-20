export const userService = {
  getLoggedInUser,
  setLoggedInUser
}

const STORAGE_KEY_LOGGEDIN = 'loggedInUser'

function getLoggedInUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN)) || null
}

function setLoggedInUser(user) {
  if (user) sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
}
