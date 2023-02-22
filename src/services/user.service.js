export const userService = {
  getLoggedInUser,
  setLoggedInUser,
}

const STORAGE_KEY_LOGGEDIN = 'loggedInUser'

function getLoggedInUser() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN)) || null
}

function setLoggedInUser(user) {
  if (user) localStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
}
