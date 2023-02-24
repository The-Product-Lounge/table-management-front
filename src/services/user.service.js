export const userService = {
  getUserFromStorage,
  setUserInStorage,
  removeUserFromStorage
}

const STORAGE_KEY_LOGGEDIN = 'loggedInUser'

function getUserFromStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN)) || null
}

function setUserInStorage(user) {
  if (user) localStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
}

function removeUserFromStorage() {
  localStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

