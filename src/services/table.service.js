import { httpService } from './http.service.js'
import { storageService } from './local-storage.service.js'

const BASE_URL = `table/`
const STORAGE_KEY_TABLE = 'tableId'

export const tableService = {
  joinTable,
  clearTables,
  updateTable,
  removeTable,
  getTableIdFromStorage,
  setTableIdInStorage,
  removeTableIdFromStorage
}

async function clearTables() {
  return httpService.delete(BASE_URL + 'delete-tables')
}

async function joinTable(user) {
  try {
    console.log('h1');
    return await httpService.post(BASE_URL + 'join-table', user)
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function updateTable(table) {
  return httpService.put(BASE_URL + table._id, table)
}

async function removeTable(id) {
  console.log(id);
  return httpService.delete(BASE_URL + id)
}

function getTableIdFromStorage() {
  return storageService.getFromStorage(STORAGE_KEY_TABLE)
}

function setTableIdInStorage(tableId) {
  if (tableId) storageService.putInStorage(STORAGE_KEY_TABLE, tableId)
}

function removeTableIdFromStorage() {
  storageService.removeFromStorage(STORAGE_KEY_TABLE)
}

// (async () => {
//   console.log('h1');
//   const promises = []
//   let number = 1
//   while (number < 50) {
//     promises.push(joinTable({

//       "firstName": "Yasmin",
//       "lastName": "Gudha",
//       "portfolioStage": "Brainstorming",
//       "imgUrl": `https://api.dicebear.com/5.x/pixel-art/svg?seed=${number}`

//     }))
//     number++
//   }

//   Promise.all(promises).then(promises => console.log(promises))
// })()
