import { isBrowser } from "../../utils/is-browser";

export const storageService = {
  getFromStorage,
  putInStorage,
  removeFromStorage,
};

function getFromStorage(storageKey) {
  if (!isBrowser()) return null;
  return JSON.parse(localStorage.getItem(storageKey)) || null;
}

function putInStorage(storageKey, entity) {
  if (isBrowser()) localStorage.setItem(storageKey, JSON.stringify(entity));
}

function removeFromStorage(storageKey) {
  if (isBrowser()) localStorage.removeItem(storageKey);
}
