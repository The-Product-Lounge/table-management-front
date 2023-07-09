import { storageService } from "./local-storage.service";

export const userService = {
  getUserFromStorage,
  setUserInStorage,
  removeUserFromStorage,
};

const STORAGE_KEY_LOGGEDIN = "loggedInUser";

function getUserFromStorage() {
  return storageService.getFromStorage(STORAGE_KEY_LOGGEDIN);
}

function setUserInStorage(user) {
  if (user) storageService.putInStorage(STORAGE_KEY_LOGGEDIN, user);
}

function removeUserFromStorage() {
  storageService.removeFromStorage(STORAGE_KEY_LOGGEDIN);
}
