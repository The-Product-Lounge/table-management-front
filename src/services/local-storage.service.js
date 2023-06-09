export const storageService = {
  getFromStorage,
  putInStorage,
  removeFromStorage,
};

function getFromStorage(storageKey) {
  return JSON.parse(localStorage.getItem(storageKey)) || null;
}

function putInStorage(storageKey, entity) {
  localStorage.setItem(storageKey, JSON.stringify(entity));
}

function removeFromStorage(storageKey) {
  localStorage.removeItem(storageKey);
}
