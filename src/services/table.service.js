import { httpService } from './http.service.js'

const BASE_URL = `table/`
const STORAGE_KEY_TABLE = 'table'

export const tableService = {
  joinTable,
  getById,
  getTableFromStorage,
  getTables,
  clearTables,
  updateTable,
  removeTable,
  putTableInStorage,
  deleteTableFromStorage,
}

async function getTables() {
  return httpService.get(BASE_URL)
}

async function clearTables() {
  return httpService.delete(BASE_URL + 'delete-tables')
}

async function joinTable(user) {
  try {
    const table = await httpService.post(BASE_URL + 'join-table', user)
    if (table) putTableInStorage(table)
    return table
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function updateTable(table) {
  if (table._id) {
    return httpService.put(BASE_URL + table._id, table)
  }
}
async function removeTable(tableId) {
  return httpService.delete(BASE_URL + tableId)
}

async function getById(tableId) {
  try {
    const table = await httpService.get(BASE_URL + tableId)
    if (!table) throw new Error()
    return table
  } catch (err) {
    throw err
  }
}

function getTableFromStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_TABLE)) || null
}

function putTableInStorage(table) {
  localStorage.setItem(STORAGE_KEY_TABLE, JSON.stringify(table))
}

function deleteTableFromStorage() {
  localStorage.removeItem(STORAGE_KEY_TABLE)
}
