export const storageService = {
    getFromStorage,
    PutInStorage,
    removeFromStorage,
}

function getFromStorage(storageKey) {
    return JSON.parse(localStorage.getItem(storageKey)) || null
}

function PutInStorage(storageKey, entity) {
    localStorage.setItem(storageKey, JSON.stringify(entity))
}

function removeFromStorage(storageKey) {
    localStorage.removeItem(storageKey)
}